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
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import POST_METHOD from "../../apimiddleware/postMethod";
import axios from 'axios';
import { baseURL } from '../../apimiddleware/url';
import { cibSublimeText } from '@coreui/icons';


const Customer = (props) => {
    
    const [c_id , setId] = useState('');
    const [name , setName] = useState('');
    const [phone , setPhone] = useState('');
    const [address , setAddress] = useState('');
    const [remarks , setRemarks] = useState('');
    const [discount , setDiscount] = useState('');
    const [balance , setBalance] = useState('');
    const [_id  , set_id] =useState('')

    console.log("props" , props);
    const submit = async()=>{
        try{
            let data = await axios.put(`${baseURL}customer/${_id}` , {
                c_id  , name ,phone , address , remarks , discount , balance 
            })
            if(data.status == 200){
                alert("Successfully Updated");
                props.history.goBack();
            }
        }catch(err){
            alert(err.response.data)
        }
    }

    const deleteUser = async()=>{
        try{
            let text = prompt("Are You sure to Delete this customer?" , "yes");
            if(text == "yes"){
                let data = await axios.delete(`${baseURL}customer/${_id}` );
                console.log("data" , data , _id);
                if(data.status == 200){
                    alert("Successfully Deleted");
                     props.history.goBack();
                }
            }
           
        }catch(err){
            alert(err.response.message)
        }
    }
    useEffect(()=>{
        if(props.location && props.location.state && props.location.state._id){
            let data = props.location.state
            setId(data.c_id);
            setName(data.name);
            setPhone(data.phone);
            setAddress(data.address);
            setRemarks(data.remarks);
            setDiscount(data.discount);
            setBalance(data.balance.toFixed(2));
            set_id(data._id)
        }
    } , [])

   

    return (
        <CContainer>
            <CCard>
                <CCardHeader>
                    <div style={{display:"flex" , justifyContent:"space-between"}}>
                    <b>Update Customer</b>
                    <CIcon onClick={()=>deleteUser()} style={{marginLeft:"10px" , cursor:"pointer"}} name="cil-trash" />
                                                        
                    </div>
                    
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="name">Customer Id</CLabel>
                                <CInput id="name" placeholder="Enter Customer Id" required value={c_id} onChange={(e) => setId(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="name">Name</CLabel>
                                <CInput id="name" placeholder="Enter Customer Name" required value={name} onChange={(e) => setName(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="ccnumber">Phone</CLabel>
                                <CInput id="ccnumber" placeholder="Contact Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="ccnumber">Address</CLabel>
                                <CInput type="string" id="ccnumber" placeholder="Customer Address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="ccnumber">Remarks</CLabel>
                                <CInput type="string" id="ccnumber" placeholder="Remarks" required value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="name">Discount</CLabel>
                                <CInput id="name" type="number" placeholder="Discount" required value={discount} onChange={(e) => setDiscount(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="name">Balance</CLabel>
                                <CInput id="name" type="number" placeholder="Balance" required value={balance} onChange={(e) => setBalance(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" style={{display:"flex" , justifyContent:"flex-end"}}>
                            <CButton onClick={()=> submit()} outline >Edit</CButton>   
                        </CCol>
                    </CRow>
                    
                </CCardBody>
            </CCard>
        </CContainer>
    )
}

export default Customer
