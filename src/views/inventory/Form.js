
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
    CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import POST_METHOD from "../../apimiddleware/postMethod";
import { baseURL } from '../../apimiddleware/url';
import axios from "axios"

const Form = (props) => {
    const [date  , setDate] = useState();
    const [month  , setMonth] = useState();
    const [year  , setYear] = useState();
    const [name , setName] = useState('');
    const [quantity , setQuantity] = useState();
    const [description , setDescription] = useState('');
    const [size  , setSize] = useState()
    const [s_size , setSouthSize] = useState('');
    const [n_size , setNorthSize] = useState('');
    
    const [fields] = useState(["S.NO" ,"Date"  , "Quantity" , "Action"]);
    const [Product_fields] = useState(["S.NO" ,"Date"  ,"Cartons", "Quantity"  , "Delete" ]);
    
    const [usersData , setData] = useState([]);
    const [all , setAll] = useState([]);
    const [use , setUse] = useState('');
    const [load , reload] = useState(false);
    const [page , setPage] = useState(props.match.params.page);;
    const [id , setId] = useState('');
    const [_id , set_id] = useState('');
    const [price , setPrice] = useState('');
    const [north_price , setNorthPrice] = useState('');
    const [total , setTotal] = useState('');
    const [product_size , setPS] = useState('');
    const [product_color , setPC] = useState('');
    
        
    const deleteProduct =async()=>{
        try{
            console.log("start" , all._id);
        let data = page == "raw" ? await axios.delete(`${baseURL}raw/${all._id}`) : page == "packaging" ? await axios.delete(`${baseURL}packaging/${all._id}`) :
        page == "finish" ? await axios.delete(`${baseURL}finish/${all._id}`) : await axios.delete(`${baseURL}product/${all._id}`)
        console.log("data" , data);
        if(data.status == 200){
            alert("Succesfully Deleted");
                props.history.goBack()
            
            
        }
        }catch(err){
            console.log("err" , err);
        }
        
    }

    const updateProduct =async()=>{
        let obj ={
            name  , 
            quantity , 
            description , 
            size , 
            price , 
            total , 
            product_size , 
            product_color
        }
        try{
            console.log("start" , all._id);
        let data = page == "raw" ? await axios.put(`${baseURL}raw/${all._id}` , obj) : page == "packaging" ? await axios.put(`${baseURL}packaging/${all._id}` , obj) :
        page == "finish" ? await axios.put(`${baseURL}finish/${all._id}` , obj) : await axios.put(`${baseURL}product/${all._id}` , obj)
        console.log("data" , data);
        if(data.status == 200){
            alert("Succesfully Updated");
            // window.location ="#/inventory/rawmaterial"
        }
        }catch(err){
            console.log("err" , err);
        }
        
    }


    const useProduct = async()=> {
        try{
            console.log("start");
            let obj  = {
                product_id : all._id,
                used : use
            }
            let data = page == "raw" ? await axios.post(`${baseURL}raw/use` , obj) : page == "packaging" ? await axios.post(`${baseURL}packaging/use` , obj) :
        page == "finish" ? await axios.post(`${baseURL}finish/use` , obj) : await axios.post(`${baseURL}product/use` , obj)
        
        if(axios.status = 200){
            alert("Successfully Update this product");
            setUse('');
            reload(true)
        }
        }catch(err){
            if(err.response.status == 400){
                setUse('');
                alert("Not have Enough Amount");
               
            }
            
        }
        
    }
    
    useEffect(()=>{

        async function fetchData(){
            let data =  page =="raw" ? await axios.get(`${baseURL}raw/${props.match.params.id}`):  page =="packaging" ?await axios.get(`${baseURL}packaging/${props.match.params.id}`) :
            page =="finish" ? await axios.get(`${baseURL}finish/${props.match.params.id}`) :await axios.get(`${baseURL}product/${props.match.params.id}`) ;
            console.log("data" , data);
            if(data.status == 200){
                setName(data.data.name);
                setAll(data.data);
                setDescription(data.data.description);
                setQuantity(data.data.stock);
                set_id(data.data._id);
                data.data.product_id && setId(data.data.product_id);
                data.data.south_price && setPrice(data.data.south_price);
                data.data.north_price && setNorthPrice(data.data.north_price);
                data.data.carton_size && setSouthSize(data.data.carton_size);
                data.data.north_size && setNorthSize(data.data.north_size);
                data.data.carton_size && setTotal(data.data.carton_size * data.data.stock);
                data.data.product_color && setPC(data.data.product_color);
                data.data.product_size && setPS(data.data.product_size);
                
                let history = data.data.history;
                let final_history = []
                history.map((m , i)=>{
                    if(page != "product" ){
                        final_history = [...final_history , {
                            "S.NO" :i+1 < 10 ? `0${i+1}` : i+1,
                            "Date" : `${new Date(m.date).getDate()}/${new Date(m.date).getMonth()+1}/${new Date(m.date).getFullYear()}`,
                            "Quantity":m.quantity ?m.quantity.toFixed(2) : "NO" ,
                            "Action":m.action 
                        }]
                    }else{
                        final_history = [...final_history , {
                            "S.NO" :i+1 < 10 ? `0${i+1}` : i+1,
                            "Date" : `${new Date(m.date).getDate()}/${new Date(m.date).getMonth()+1}/${new Date(m.date).getFullYear()}`,
                            "Quantity": `${m.quantity} x ${data.data.carton_size} = ${m.quantity * data.data.carton_size}`,
                            "Cartons" : m.quantity,
                            "id" : m._id 
                        }]
                    }
                    
                }) 
                setData(final_history)                
            }
        }
        fetchData()
        return ()=>{
            reload(false)
        }
    }, [load])

    const deleteProducts = async(q_id)=>{
        try{
            let data =await axios.delete(`${baseURL}product/${_id}/${q_id}`);
            if(data.status == 200){
                alert("Deleted Successfully")
                reload(true)
            }
            if(data.status == 201){
                alert("Cannot Delete this Entry")
                reload(true)
            }
            console.log("data" , data);
        }catch(err){
            alert(err)
        }
    }
    
    const showName = ()=>{
        let name = ""
        if(page == "raw"){
            name = "Raw Material" 
        }else if(page == "finish"){
            name  = "Finish Material"
        }else if(page == "packaging"){
            name  = "Packaging Material"
        }else{
            name  = "Final Product"
        }
        return name
    }
   console.log("quantity" , quantity);
    return (
        <CContainer lg="12">
                   <CRow>
                       {    page != "finish" && 
                           <CCard style={{width:"100%"}}>
                           <CCardHeader><center><b>{showName()}</b></center></CCardHeader>    
                                               <CCardBody>
                                                   <CRow>
                                                       <CCol >
                                                           <center>
                                                               <CInput style={{width:"50%"}}  placeholder={page == "product" ? "Add More Quantity" :"Enter Use Quantity" }  required value={use} onChange={(e)=> setUse(e.target.value)}/>
                                                       
                                                           </center>
                                                                               
                                                       </CCol>
                                                       
                                                   </CRow>
                                                   <CRow>
                                                       <CCol style={{marginTop:"20px"}}>
                                                           <center>
                                                           <CButton onClick={useProduct} style={{width:"7%"}} block variant="outline" color="dark" >{page == "product" ? "Add" : "Use"}</CButton>
                                                           </center>      
                                                       </CCol>
                                                       
                                                   </CRow>
                                                   
                                               </CCardBody>
                                           </CCard>
                       
                       }
                    
                  </CRow>
            <CRow>
            <CCard  style={{width:"100%"}}lg="12">
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol>
                                                    Edit Form
                                                
                                                        </CCol>    
                                                        <CCol style={{display:"flex" , justifyContent:"flex-end"}}>
                                                       
                                                        <CIcon onClick={()=>deleteProduct()} style={{marginLeft:"10px" , cursor:"pointer"}} name="cil-trash" />
                                                        <CIcon onClick={()=>{props.history.push("/inventory/sales/"+_id)}} style={{marginLeft:"10px" , cursor:"pointer"}} name="cil-list" />
                                                        
                                                        </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCardBody>
                                                {
                                                    id && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Product Id</CLabel>
                                                            <CInput id="name" placeholder="Enter product Id" required value={id} onChange={(e)=> setId(e.target.value)}/>
                                                        </CFormGroup>
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
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Name</CLabel>
                                                            <CInput id="name" placeholder="Enter Material Name" required value={name} onChange={(e)=> setName(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Description</CLabel>
                                                            <CInput id="ccnumber" placeholder="Material Description"  value={description} onChange={(e)=> setDescription(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                {   page =="product" && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">South Region Carton Size</CLabel>
                                                            <CInput type ="number" id="ccnumber" placeholder="Number of Items in Carton" required  value={s_size} onChange={(e)=> setSouthSize(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                }
                                                {   page =="product" && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">North Region Carton Size</CLabel>
                                                            <CInput type ="number" id="ccnumber" placeholder="Number of Items in Carton" required  value={n_size} onChange={(e)=> setNorthSize(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                }
                                                {
                                                    quantity &&  
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Carton Quantity</CLabel>
                                                            <CInput type="number" id="ccnumber" placeholder="Number Of Cartons" required  value={quantity && quantity.toFixed(2)} onChange={(e)=> setQuantity(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                         
                                                
                                                }
                                                {/* {
                                                    quantity && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Carton Quantity</CLabel>
                                                            <CInput type="number" id="ccnumber" placeholder="Number Of Cartons" required  value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                         
                                                
                                                } */}
                                                 {
                                                    page == "product" && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">South Price</CLabel>
                                                            <CInput id="name" placeholder="Enter Product Price" required value={price} onChange={(e)=> setPrice(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                    
                                                }
                                                 {
                                                    page == "product" && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">North Price</CLabel>
                                                            <CInput id="name" placeholder="Enter Product Price" required value={north_price} onChange={(e)=> setNorthPrice(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                    
                                                }
                                                 {
                                                    total && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Item Quantity</CLabel>
                                                            <CInput id="name" placeholder="Item Quantity" required value={total && total.toFixed(2)} onChange={(e)=> setTotal(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                    
                                                }
                                                 {
                                                    product_color && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Product Color</CLabel>
                                                            <CInput id="name" placeholder="Item Color" required value={product_color} onChange={(e)=> setPC(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                    
                                                } 
                                                {
                                                    product_size && 
                                                    <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Product Size</CLabel>
                                                            <CInput id="name" placeholder="Item Size" required value={product_size} onChange={(e)=> setPS(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                    
                                                }
                                                <CRow style={{width:"100%"}} >
                                               
                                                        <CCol style={{ textAlign:"center"}}>
                                                            <b >History</b>
                                                           
                                                        </CCol>
                                                   <CDataTable
                                                        items={usersData}
                                                        fields={page != "product" ? fields : Product_fields}
                                                        scopedSlots={{

                                                            "Delete":
                                                                (item) => (
                                                                    <td >
                                                                        <CCol sm="4" md="12" lg="12" >
                                                                            <CButton block color="danger" onClick={()=> deleteProducts(item.id)} >Delete</CButton>
                                                                        </CCol>
                                                                    </td>
                                                                ),
                                                        }}
                                                        />
                                                   
                                                </CRow>
                                                
                                            </CCardBody>
                                        </CCard>
            </CRow>

        </CContainer>
    )
}

export default Form
