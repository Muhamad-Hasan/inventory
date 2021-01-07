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
    CCardFooter,
    CButton,
    CContainer
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from "axios";
import { baseURL } from "../../apimiddleware/url";
import { MDBBtn } from "mdbreact";
import date from 'date-and-time';

const FinishProduct = (props) => {

    const [tableData, setData] = useState([])
    const [name, setName] = useState("");
    const [search, setSearch] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let data = name ? await axios.get(`${baseURL}finish?name=${name}`) : await axios.get(`${baseURL}finish`);
            console.log("data", data);
            if (data.status == 200) {
                setData(data.data);
            }
        }
        fetchData()
        return () => {
            setSearch(false)
        }
    }, [search])
    return (
        <CContainer fluid>
            <CRow>
                <CCol style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
                    <CInput type="text" style={{ borderRadius: "10px", width: "30%", height: "50px", fontSize: "20px", fontWeight: "bold", borderColor: "green" }} placeholder="Search" value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBBtn color="success" rounded size="md" style={{ marginLeft: "10px" }} onClick={() => setSearch(true)}>
                        Search
        </MDBBtn>

                </CCol>
            </CRow>
            <br />

            <CRow>
                {
                    tableData && tableData.length > 0 &&
                    tableData.map((text, index) => {
                        return (

                            <CCol xs="12" sm="6" md="4" onClick={() => window.location = `#/inventory/form/finish/${text._id}`}>
                                <CCard color="success" className="text-white">
                                    <CCardHeader>
                                        <CRow>
                                            <CCol>
                                                <b>{text.name}</b>

                                            </CCol>
                                            <CCol>
                                                <span style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    {date.format(new Date(text.date), 'DD/MM/YYYY')}
                                                </span>

                                            </CCol>

                                        </CRow>
                                    </CCardHeader>
                                    <CCardBody >
                                        <CRow>
                                            <CCol style={{ height: "80px" }}>
                                                {text.description}
                                            </CCol>

                                        </CRow>
                                        <CRow>
                                            <CCol>

                                            </CCol>


                                        </CRow>


                                    </CCardBody>

                                </CCard>
                            </CCol>


                        )
                    })
                }
            </CRow>


        </CContainer>
    )
}

export default FinishProduct
