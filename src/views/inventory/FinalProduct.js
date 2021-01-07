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
import axios from "axios";
import { baseURL } from "../../apimiddleware/url";
import { MDBBtn } from "mdbreact";
import date from 'date-and-time';

const FinalProduct = (props) => {

    const [tableData, setData] = useState([])
    const [name, setName] = useState("");
    const [search, setSearch] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let data = name ? await axios.get(`${baseURL}product?name=${name}`) : await axios.get(`${baseURL}product`);
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
                        console.log("text" , text);
                        return (

                            <CCol xs="12" sm="6" md="4" onClick={()=>window.location = `#/inventory/form/product/${text._id}`}>
                                <CCard style={{border:"1px solid black" , borderRadius:"15px" }} color="info" className="text-white">
                                    <CCardHeader>
                                        <CRow style={{display:"flex" , justifyContent:"space-between"}}>
                                            <div style={{padding:0}}>
                                                <b>{text.name}</b>

                                            </div>
                                            <div style={{display:"flex"  , justifyContent:"flex-end"}}>
                                                
                                                <span style={{ paddingLeft:"10%" }}>
                                                    {date.format(new Date(text.createdAt), 'DD/MM/YYYY')}
                                                </span>

                                            </div>

                                        </CRow>
                                    </CCardHeader>
                                    <CCardBody >
                                        <CRow>
                                            <CCol style={{ height: "40px" }}>
                                                {text.description}
                                            </CCol>

                                        </CRow>
                                        <CRow>
                                            <CCol style={{fontSize:"12px" }}>
                                                <p><i>Carton size :</i> {`${text.carton_size}`}</p>
                                                <p><i>C Quantity :</i> {`${text.stock.toFixed(2)}`}</p>
                                                <p><i>Quantity :</i> {`${(text.stock * text.carton_size).toFixed(2)}`}</p>
                                                <p><i>Size :</i> {`${text.product_size}`}</p>
                                                
                                            </CCol>
                                            <CCol style={{fontSize:"12px" }}>
                                                <p><i>P.Id :</i> {`${text.product_id}`}</p>
                                                <p><i>South Price :</i> {`${text.south_price}`}</p>
                                                <p><i>North Price :</i> {`${text.north_price}`}</p>
                                                <p><i>Color :</i> {`${text.product_color}`}</p>
                                                
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

export default FinalProduct
