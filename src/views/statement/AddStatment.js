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
    CListGroupItem,
    CInputGroup,
    CInputGroupAppend,
    CListGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import POST_METHOD from "../../apimiddleware/postMethod";
import axios from 'axios';
import { baseURL } from '../../apimiddleware/url';


const Statement = (props) => {

    const [c_id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [remarks, setRemarks] = useState('');
    const [discount, setDiscount] = useState('');
    const [balance, setBalance] = useState('');
    const [selectUser, setSelect] = useState("")
    const [user, setUser] = useState([])
    const [currentDate, setDate] = useState();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [search, setSearch] = useState('');
    const [description, setDescription] = useState('');
    const [credit, setCredit] = useState('');


    const submit = async () => {
        try {
            let data = await axios.post(`${baseURL}statement`, {
                c_id: selectUser,
                description: description,
                credit: parseInt(credit),
                date: new Date(year , month , currentDate)
            })
            if (data.status == 200) {
                alert("Successfully Added");
                props.history.goBack();

            }
        } catch (err) {
            alert(err.response.data)
        }
    }

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

    return (
        <CContainer>
            <CCard style={{ height: "400px" }}>
                <CCardHeader>
                    <center><b>Select User</b></center>
                </CCardHeader>
                <CCardBody style={{ overflow: "scroll" }}>
                    <CRow>
                        <CCol xs="12">
                            <CInputGroup>
                                <CInput id="appendedInputButton" size="16" placeholder="Search customer by name" value={name} onChange={e => setName(e.target.value)} type="text" />
                                <CInputGroupAppend>
                                    <CButton onClick={() => setSearch(true)} color="secondary">Search</CButton>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" style={{ marginTop: "30px " }}>
                            <CListGroup>
                                {
                                    user && user.length > 0 &&
                                    user.map((u, i) => {
                                        let active = selectUser == u._id ? true : false;
                                        console.log("active", active);
                                        return (
                                            <CListGroupItem href="#" active={active}>
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

                </CCardBody>
            </CCard>

            <CCard xs="12" md="12" sm="12">
                <CCardHeader>
                    <center><b>Add Credit</b></center>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="name">Description</CLabel>
                                <CInput id="name" placeholder="Enter Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="name">Credit</CLabel>
                                <CInput id="name" placeholder="Enter Credit" required value={credit} onChange={(e) => setCredit(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="4">
                            <CFormGroup>
                                <CLabel htmlFor="ccmonth">Date</CLabel>
                                <CInput id="ccmonth" value={currentDate} onChange={(e) => setDate(e.target.value)} />

                            </CFormGroup>
                        </CCol>

                        <CCol xs="4">
                            <CFormGroup>
                                <CLabel htmlFor="ccmonth">Month</CLabel>
                                <CInput id="ccmonth" value={month} onChange={(e) => setMonth(e.target.value)} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="4">
                            <CFormGroup>
                                <CLabel htmlFor="ccyear">Year</CLabel>
                                <CInput id="ccmonth" value={year} onChange={(e) => setYear(e.target.value)} />
                            </CFormGroup>
                        </CCol>


                    </CRow>
                    <CRow>
                        <CCol xs="12" style={{ display: "flex", justifyContent: "flex-end" }}>
                            <CButton onClick={() => submit()} outline >Submit</CButton>
                        </CCol>
                    </CRow>

                </CCardBody>
            </CCard>
        </CContainer>
    )
}

export default Statement
