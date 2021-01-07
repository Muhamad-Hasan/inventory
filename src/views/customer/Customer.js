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


const Customer = () => {
    
    const [c_id , setId] = useState('');
    const [name , setName] = useState('');
    const [phone , setPhone] = useState('');
    const [address , setAddress] = useState('');
    const [remarks , setRemarks] = useState('');
    const [discount , setDiscount] = useState(0);
    const [balance , setBalance] = useState(0);
    const [disable , setDisable] =useState(false)
    const submit = async()=>{
        setDisable(true)
        if(c_id.includes("-")){
            alert("Dash (-) is not allowed in Customer Id");
            return
        }
        try{
            let data = await axios.post(`${baseURL}customer` , {
                c_id  , name ,phone , address , remarks , discount , balance 
            })
            console.log("data" , data);
            if(data.status == 200){
                alert("Successfully Added");
                setDisable(false)
        
            }
        }catch(err){
            setDisable(false)
            console.log("err" , err.response);
            if(err.response.data){
                alert(err.response.data)    
            }else{
                alert(err.response.data.details[0].message)
        
            }
        }
    }

    return (
        <CContainer>
            <CCard xs="12" md="12" sm="12">
                <CCardHeader>
                    <center><b>Add Customer</b></center>
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
                            <CButton disabled={disable} onClick={()=> submit()} outline >Submit</CButton>   
                        </CCol>
                    </CRow>
                    
                </CCardBody>
            </CCard>
        </CContainer>
    )
}

export default Customer
