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
import { Link } from "react-router-dom"

const List = (props) => {

    const [name, setName] = useState('');
    const [search, setSearch] = useState(0);
    const [fields] = useState(["S.No", "invoice_no", "Customer Id", "Name", "Invoice"]);
    const [invoiceData, setData] = useState([]);

    useEffect(() => {
        console.log("props" , props);
        let id = false;
        if(props.match.params.id){
            console.log("id" , props.match.params.id);
            id = props.match.params.id
        }
        let query = id == false ? `${baseURL}invoice` : `${baseURL}invoice/${id}`;
        console.log("query" , query); 
        
        async function customer() {
            let data = await axios.get(query);
            console.log("data", data);
            if (data.status == 200) {
                let user = data.data;
                let table = []
                user.map((u, i) => {
                    let obj = {
                        "S.No": 1 + i,
                        "invoice_no": u.invoice_no,
                        "Customer Id": u.c_id.c_id,
                        "Name": u.c_id.name,
                        "Invoice": u.invoice_no,
                        data:u

                    }
                    table = [...table, obj]
                });
                setData(table);
            }
        }
        customer();



    }, [search])

    return (
        <CContainer fluid>
           <CRow>
               <CCol xs="12" md="12" sm="12" lg="12" style={{margin:0 , padding:0}}>

                
            <CCard >
                <CCardHeader>
                    <center><b>Invoices</b></center>
                </CCardHeader>
                <CCardBody>
                    {/* <CRow >
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
            </CRow> */}
                    <CRow style={{ marginTop: "20px" }}>
                        <CDataTable
                            items={invoiceData}
                            fields={fields}
                            itemsPerPage={25}
                            pagination
                            tableFilter
                            hover
                            sorter
                            scopedSlots={{

                                "Invoice":
                                    (item) => (
                                        <td >
                                            <CCol  >
                                                <CButton block color="danger" onClick={()=> props.history.push({pathname:"/invoice/view" ,state:item.data})} >view</CButton>
                                            </CCol>
                                        </td>
                                    ),
                            }}
                        />

                    </CRow>
                </CCardBody>
            </CCard>
            </CCol>
               </CRow>

        </CContainer>
    )
}

export default List
