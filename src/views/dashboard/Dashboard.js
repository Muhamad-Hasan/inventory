import React, { lazy, useState , useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout , 
  CDataTable , 
  } from '@coreui/react'
import DatePicker from 'react-date-picker';
import date from "date-and-time"
import axios from "axios";
import {baseURL} from "../../apimiddleware/url"
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown'))

const Dashboard = (props) => {

  const [from, setFrom] = useState(new Date(date.addDays(new Date() , -7)));
  const [to, setTo] = useState(new Date());
  const fields = ["S.No" , "Customer Name" , "Invoice No" , "Date" ,"Total Amount"  ];
  const [usersData , setData] = useState([])
  const [total , setTotal] = useState()
  const [count , setCount] = useState()
  

  useEffect(()=>{
    async function fetch(){
      let data = await axios.get(`${baseURL}invoice/all/count`);
      if(data.status == 200){
        setCount(data.data)
      }
      
    }
    fetch()
  } , [])

  useEffect(()=>{
      async function fetachData(){
        let data =await axios.post(`${baseURL}invoice/dates` , {
          from : from , 
          to : to
        })
        
        if(data.status== 200){
          let final_data = data.data;
          console.log("data" , data);
          let real_data = []
          let total = 0
          final_data.map((text , index)=>{
              real_data = [...real_data , {
                "S.No" : index+1 ,
                "Customer Name" : text.c_id.name,
                "Invoice No" :text.invoice_no , 
                "Date" : text.createdAt,
                "Total Amount":text.total_amount,
                data : text
              }]
              total = total + text.total_amount
          })
          setData(real_data)
          setTotal(total)

        
        }else{
          console.log("data" , data);
        }
        
      }
      fetachData()
  } , [to , from , setFrom])
  return (
    <>
      <WidgetsDropdown count={count} />
      <CCard>
        <CCardBody>
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
          <CRow style={{marginTop:"50px"}}>
          <CDataTable
              items={usersData}
              fields={fields}
              striped
              scopedSlots = {{
                "Invoice No":
                (item) => (
                    <td style={{cursor:"pointer"}} onClick={()=> props.history.push({pathname:"/invoice/view" ,state:item.data})}>
                        {item["Invoice No"]}  
                      
                    </td>
                ),
                "Date":
                (item) => (
                    <td >
                        {date.format(new Date(item["Date"]) ,"DD/MM/YYYY hh:mm A" )}  
                      
                    </td>
                ),
                "Total Amount":
                (item) => (
                    <td >
                        {item && item["Total Amount"].toFixed(2)}  
                      
                    </td>
                ),
              

              }}
            />
          </CRow>
          <CRow>
            <CCol  style={{textAlign:"right"}}>
            <p style={{fontSize:"20px" , fontWeight:"bold" ,position:"relative" , right:"100px"}}>Total Sale : {total && total.toFixed(2)} </p>
          

            </CCol>
           
          </CRow>
        </CCardBody>
      </CCard>

    </>
  )
}

export default Dashboard
