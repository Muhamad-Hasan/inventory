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
// import {
//     CButton,
//     CCard,
//     CCardBody,
//     CCardFooter,
//     CCardHeader,
//     CCol,
//     CCollapse,
//     CDropdownItem,
//     CDropdownMenu,
//     CDropdownToggle,
//     CFade,
//     CForm,
//     CFormGroup,
//     CFormText,
//     CValidFeedback,
//     CInvalidFeedback,
//     CTextarea,
//     CInput,
//     CInputFile,
//     CInputCheckbox,
//     CInputRadio,
//     CInputGroup,
//     CInputGroupAppend,
//     CInputGroupPrepend,
//     CDropdown,
//     CInputGroupText,
//     CLabel,
//     CSelect,
//     CRow
//   } from '@coreui/react'

const PackagingMaterial = () => {

    const [tableData, setData] = useState([])
    const [name, setName] = useState("");
    const [search, setSearch] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let data = name ? await axios.get(`${baseURL}packaging?name=${name}`) : await axios.get(`${baseURL}packaging`);
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

                            <CCol xs="12" sm="6" md="4" onClick={()=>window.location = `#/inventory/form/packaging/${text._id}`}>
                                <CCard color="success" className="text-white">
                                    <CCardHeader>
                                        <CRow>
                                            <CCol style={{ padding:0}}>
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
                                            <CCol style={{ height: "40px" }}>
                                                {text.description}
                                            </CCol>

                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <p><i>C Quantity :</i> {`${text.stock}`}</p>
                                                <p><i>Used :</i> {`${text.used}`}</p>

                                            </CCol>
                                            <CCol>
                                                <p><i>Carton Size :</i> {`${text.carton_size}`}</p>
                                                <p><i>Quantity :</i> {`${text.stock * text.carton_size}`}</p>

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

export default PackagingMaterial
