import React, { useState, useEffect } from 'react'
import {
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CCardHeader,
    CFormGroup,
    CLabel,
    CInput,
    CSelect,
    CContainer,
    CButton,
    CDataTable
    
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import POST_METHOD from "../../apimiddleware/postMethod";
import axios from 'axios';
import { baseURL , basePATH } from '../../apimiddleware/url';
import { cibSublimeText } from '@coreui/icons';
import {Link} from "react-router-dom"

const List = (props) => {
    
    const [name , setName] = useState('');
    const [search , setSearch] = useState(0);
    const [fields ] = useState(["Id" , "Name" , "Contact" , "Address" , "Remarks" , "Discount" , "Balance" , "Action" , "Statement"]);
    const [usersData , setUser ] = useState([]);
    
    useEffect(()=>{
        async function customer(){
            let data =name? await axios.get(`${baseURL}customer?name=${name}`) :await axios.get(`${baseURL}customer`);
            console.log("data" , data);
            if(data.status == 200){
                let user = data.data;
                let table = []
                user.map(u=>{
                    let obj = {
                        "id" : u._id,
                        "Id": u.c_id,
                        "Name" : u.name,
                        "Contact" :u.phone,
                        "Address" :u.address,
                        "Remarks" : u.remarks,
                        "Discount":u.discount,
                        "Balance":u.balance , 
                        data : u
                    }
                    table = [...table , obj]
                });
                setUser(table);            
            }
        }
        customer();
        
        
        
    } , [search])

    return (
        <CContainer >
               <CCard style={{ padding:0 ,margin:0}}>
            <CCardHeader>
                <center><b>Customers</b></center>
            </CCardHeader>
            <CCardBody>
            <CRow >
                <CCol style={{display:"flex" ,justifyContent:"center" }}>
                    <CRow style={{display:"flex" , justifyContent:"center" }}>
                        <CCol style={{padding:0}}>
                        <CInput  value={name} placeholder="Search" onChange={(e)=>setName(e.target.value)}/> 
                        
                        </CCol>
                        <CCol style={{ padding:0}}>
                        <CButton onClick={()=> setSearch(search + 1)}>Search</CButton>
                
                        </CCol>
                    </CRow>
                    </CCol>
            </CRow>
            <CRow style={{marginTop:"20px"}}>
                <CDataTable
                items={usersData}
                fields={fields}
                itemsPerPage={10}
                striped
                pagination
                scopedSlots={{
                    "Name":
                        (item) => (
                            <td style={{cursor:"pointer"}} onClick={()=> props.history.push({pathname : "/customer/form" , state:item.data})}>
                                {item.Name}
                            </td>
                        ),
                        "Balance":
                        (item) => (
                            <td>
                                {item.Balance.toFixed(2)}
                            </td>
                        ),
                        "Statement":
                        (item) => (
                            <td style={{width:"2%"}} >
                                <CButton block color="info" onClick={()=> props.history.push("/statement/list/"+item.id)}>Statement</CButton>
                            </td>
                        ),

                    "Action":
                    (item) => (
                        <td style={{width:"2%"}} >
                            <CButton block color="danger" onClick={()=> props.history.push("/invoice/list/"+item.id)}>Invoices</CButton>
                        </td>
                    ),
                }}
                />
            
            </CRow>    
            </CCardBody>
          </CCard>
       
        </CContainer>
    )
}

export default List
