
import React, { useState, useEffect } from 'react'
import {
    CCol,
    CRow,
    CCard,
    CCardBody,
    CCardHeader,
    CFormGroup,
    CLabel,
    CInput,
    CContainer,
    CButton,
    CDataTable ,
     CListGroup ,
     CListGroupItem,
     CDropdownItem , 
     CDropdown,
     CDropdownToggle , 
     CDropdownMenu , 


} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import POST_METHOD from "../../apimiddleware/postMethod";
import { baseURL } from '../../apimiddleware/url';
import axios from "axios"
import DatePicker from 'react-date-picker';
import date from "date-and-time"


const Sales = (props) => {
    console.log("props" , props);
    const [Product_fields] = useState(["S.NO" ,"Customer Name"  ,"Product Name" , "Date","Cartons" , "Quantity" , "Total"  ]);
    const [c_id  , setCId] = useState();
    const [p_id  , setPId] = useState(props.match.params.id);
    const [user , setUser] = useState([])
    const [selectUser  , setSelect] = useState();
    const [search ,setSearch] = useState()
    const [name , setName] = useState()
    const [sale , setSale] = useState([]);
    const [amount , setAmount] = useState();
    const [from , setFrom] = useState(date.addDays(new Date() , -15));
    const [to ,setTo] = useState(new Date());
    const [total_quantity , setTotalQuantity] = useState()
    
    
    useEffect(()=>{

        async function fetchData(){
            let obj = {
                p_id  , 
                from , to
            }
            if(selectUser){
                obj["c_id"] = selectUser
            }
            console.log("c_Id" , obj , );
            let sale = await axios.post(`${baseURL}product/sale` ,obj)
            console.log("data" , sale);
            if(sale.status == 200){
                let sales = sale.data
                let arr = [] 
                let am = 0
                let tq = 0;
                sales.map((text , index)=>{
                    let obj  = {
                        "S.NO" : index+1,
                        "Customer Name" : text.c_id.name,
                        "Product Name" : text.p_id.name,
                        "Quantity" : text.quantity.toFixed(2),
                        "Total" : text.amount.toFixed(2),
                        "Cartons":text.ctns.toFixed(2),
                        "Date" : new Date(text.createdAt).toLocaleDateString()
                    }
                    am = am + text.amount;
                    tq = parseFloat(tq) + parseFloat(text.quantity).toFixed(2)
                    arr = [ ...arr  , obj ]
                })
                console.log("arr" , arr);
                setAmount(am)
                setSale(arr);
                console.log("tq" , tq);
                setTotalQuantity(tq)
            
        }
    }
        fetchData()
        
    }, [selectUser , from  , to])

    useEffect(() => {
        async function customer() {
            let data = name ? await axios.get(`${baseURL}customer?name=${name}`) : await axios.get(`${baseURL}customer`);
            console.log("data", data);
            if (data.status == 200) {

                setUser(data.data);
            }
        }
        customer();



    }, [search])
    console.log("ammount" , amount);
   
    return (
        <CContainer lg="12">
                  
            <CRow>
            <CCard  style={{width:"100%"}}lg="12">
                                            <CCardHeader>
                                                <center><b>Sales</b></center>   
                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow style={{display:"flex" }}> 
                                                    <div style={{display:"flex" , flexDirection:"row" , margin : "auto"}}>
                                                    <CInput placeholder="customer name" style={{width:"100%"}} value={name} onChange={(e)=>setName(e.target.value) } />
                                                    <CButton onClick={()=> setSearch(!search)}> Search</CButton>
                                                    <CButton onClick={()=>setSelect("")}> Clear</CButton>
                                                
                                                    </div>
                                                </CRow>
                                                {
                                                    
                                                  <CRow>
                                                    <CCol xs="12" style={{ marginTop: "30px" , height:"300px" , overflow:"scroll" }}>
                                                        <CListGroup>
                                                            {
                                                                user && user.length > 0 &&
                                                                user.map((u, i) => {
                                                                    let active = selectUser == u._id ? true : false;
                                                                    console.log("active", active);
                                                                    return (
                                                                        <CListGroupItem onClick={() => setSelect(u._id)} href="#" active={active}>
                                                                            <CRow onClick={() => setSelect(u._id)}>
                                                                                <CCol>
                                                                                    {u.c_id}
                                                                                </CCol>
                                                                                <CCol>
                                                                                    {u.name}
                                                                                </CCol>

                                                                            </CRow>
                                                                        </CListGroupItem>
                                                                    )
                                                                })
                                                            }


                                                        </CListGroup>
                                                    </CCol>
                                                </CRow>
                                                }
                                           
                                                {/* {
                                                    page == "product" && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Name</CLabel>
                                                            <CInput id="name" placeholder="Enter Material Name" required value={name} onChange={(e)=> setName(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                    
                                                } */}
                                                <CRow>
            <CCol style={{display :"flex" ,flexDirection:"row" , justifyContent:"space-around"}}>
              <div style={{textAlign:"center"}}>
                  <h3>From</h3>
                  <DatePicker
                  
                  format="dd/MM/yyyy"
                  onChange={setFrom}
                  value={from}
                />
              </div>
              <div >
                  <h3 style={{textAlign:"center"}}>To</h3>
                  <DatePicker
                  
                  format="dd/MM/yyyy"
                  onChange={setTo}
                  value={to}
                />
              </div>
           
              
              
            </CCol>

          </CRow>
          
                                               
                                            
                                                <CRow style={{width:"100%" , marginTop :"20px"}} >
                                               
                                                        {/* <CCol style={{ textAlign:"flex-end"}}> */}
{/*                                                             
                                                        <CCol style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}  xs="2">
                                                                                            <CDropdown >
                                                                                                <CDropdownToggle color="info">
                                                                                                    {time_period}
                                                                                                </CDropdownToggle>
                                                                                                <CDropdownMenu>
                                                                                                    <CDropdownItem onClick={() => setPeriod("this_month")}>This Month</CDropdownItem>
                                                                                                    <CDropdownItem onClick={() => setPeriod("North")}>North</CDropdownItem>
                                                                                                </CDropdownMenu>
                                                                                            </CDropdown>
                                                                                        </CCol> */}
                                                        {/* </CCol> */}
                                                   <CDataTable
                                                        items={sale}
                                                        fields={ Product_fields}
                                                        striping
                                                        />
                                                   
                                                </CRow>
                                                <CRow>
                                                    <CCol style={{display:"flex" , justifyContent:"flex-end"}}>
                                                    <div  style={{fontSize:"16px"}}>
                                                        Total Amount: {amount && amount.toFixed(2)}
                                                        <br/>
                                                        Total Quantity: {total_quantity }
                                                        <br/>
                                                        
                                                    </div>
                                                    </CCol>
                                                    
                                                </CRow>
                                                
                                            </CCardBody>
                                        </CCard>
            </CRow>

        </CContainer>
    )
}

export default Sales
