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
import Axios from 'axios';
import { baseURL } from '../../apimiddleware/url';

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



const AddProduct = (props) => {
    let date = new Date();
    const [active, setActive] = useState(1);
    const [currentDate, setDate] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState();
    const [s_size, setSouthSize] = useState('');
    const [n_size, setNorthSize] = useState('');
    const [price , setPrice] = useState('');
    const [product_id , setId] = useState('');
    const [product_size , setProductSize] = useState('');
    const [product_color , setProductColor] = useState('');
    const [north_price , setNorthPrice] = useState()
    const [carton_size , setCartonSize] = useState()
    
    
    
    const addProduct = async () => {
        try{
            let obj = {
                name: name,
                description: description,
                stock: quantity,
                date: `${year}-${month}-${currentDate}`
            };
            let data = await POST_METHOD(obj, "raw/");
            console.log("data", data);
        }catch(err){
            alert("Some thing is missing")
        }
        
    }

    const addFinish = async () => {
        try{
            let obj = {
                name: name,
                description: description,
                date: `${year}-${month}-${currentDate}`
            };
            console.log("obj" , obj);
            let data = await POST_METHOD(obj, "finish");
            console.log("data", data);
        }catch(err){
            alert("Some thing is missing")
        }
        
    }

    const addPackage = async () => {
        try{
            let obj = {
                name: name,
                description: description,
                stock: quantity,
                carton_size : carton_size ,
                date: `${year}-${month}-${currentDate}`
            };
            let data = await POST_METHOD(obj, "packaging");
            console.log("data" , data);
            // if (data.status == 200){
                // alert("Product has been sucessfully Added");
               props.history.push("/inventory/packagingmaterial")
            // }

        }
        catch(err){
            alert("Some thing is missing")
        }
               
    }

    const addFinalProduct = async () => {
        try{
            let obj = {
                name: name,
                description: description,
                stock: quantity,
                carton_size: carton_size,
                // north_size : n_size,
                date: `${year}-${month}-${currentDate}`,
                product_id : product_id,
                south_price : price,
                // north_price : north_price,
                product_size : product_size,
                product_color : product_color
                
            };
            let data = await  Axios.post(`${baseURL}product` , obj);
            console.log("data" , data);
            if(data.status == 202){
                alert(data.data)
            }else if (data.status == 200){
                alert("Product has been sucessfully Added")
                props.history.push("/inventory/finalproduct")
            }else if(data.status == 201){
                alert("Product quantity has been sucessfully Updated")
                props.history.push("/inventory/finalproduct")
            }
        }catch(err){
            console.log(err)
            alert("Some thing is missing")
        }
        
    }


    return (
        <CContainer style={{padding:0 , margin:0}}>
            <CRow >
                <CCol xs="12" md="12" sm="12" lg="12" className="mb-4" >
                    <CCard >
                        <CCardHeader>
                            <center><b>Add Product</b></center>
                        </CCardHeader>
                        <CCardBody>
                            <CTabs>
                                {/* <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink>
                                        </CNavLink>
                                    </CNavItem>
                                </CNav> */}
                                <CTabContent>
                                    {/* <CTabPane>

                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Name</CLabel>
                                                            <CInput id="name" placeholder="Enter Material Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Description</CLabel>
                                                            <CInput id="ccnumber" placeholder="Material Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Quantity</CLabel>
                                                            <CInput type="number" id="ccnumber" placeholder="Material Quantity in Kg" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Date</CLabel>
                                                            <CInput id="ccmonth" value={currentDate} />

                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Month</CLabel>
                                                            <CInput id="ccmonth" value={month} />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccyear">Year</CLabel>
                                                            <CInput id="ccmonth" value={year} />
                                                        </CFormGroup>
                                                    </CCol>


                                                </CRow>
                                                <CRow style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <CCol md="2" >
                                                        <CButton block variant="outline" color="dark" onClick={() => addProduct()}>Add </CButton>
                                                    </CCol>
                                                </CRow>

                                            </CCardBody>
                                        </CCard>




                                    </CTabPane> */}
                                    {/* <CTabPane>

                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Name</CLabel>
                                                            <CInput id="name" placeholder="Enter Material Name" required value={name} onChange={(e)=>setName(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Description</CLabel>
                                                            <CInput id="ccnumber" placeholder="Material Description" value={description} onChange={(e)=>setDescription(e.target.value)}  />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>

                                                <CRow>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Date</CLabel>
                                                            <CInput id="ccmonth" value={currentDate} />

                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Month</CLabel>
                                                            <CInput id="ccmonth" value={month} />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccyear">Year</CLabel>
                                                            <CInput id="ccmonth" value={year} />
                                                        </CFormGroup>
                                                    </CCol>


                                                </CRow>
                                                <CRow style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <CCol md="2" >
                                                        <CButton block variant="outline" color="dark" onClick={() => addFinish()}>Add </CButton>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>

                                    </CTabPane> */}
                                    {/* <CTabPane>
                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Name</CLabel>
                                                            <CInput id="name" placeholder="Enter Material Name" required value={name} onChange={(e)=> setName(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Description</CLabel>
                                                            <CInput id="ccnumber" placeholder="Material Description" value={description} onChange={(e)=> setDescription(e.target.value)}  />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Carton Size</CLabel>
                                                            <CInput type="number" id="ccnumber" placeholder="Carton size in Units" required value={carton_size} onChange={(e)=> setCartonSize(e.target.value)}  />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Quantity</CLabel>
                                                            <CInput type="number" id="ccnumber" placeholder="Material Quantity in carton" required value={quantity} onChange={(e)=> setQuantity(e.target.value)}  />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Date</CLabel>
                                                            <CInput id="ccmonth" value={currentDate} />

                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Month</CLabel>
                                                            <CInput id="ccmonth" value={month} />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccyear">Year</CLabel>
                                                            <CInput id="ccmonth" value={year} />
                                                        </CFormGroup>
                                                    </CCol>


                                                </CRow>
                                                <CRow style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <CCol md="2" >
                                                        <CButton block variant="outline" color="dark" onClick={() => addPackage()}>Add </CButton>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>




                                    </CTabPane> */}
                                    <CTabPane>
                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Product Id</CLabel>
                                                            <CInput id="name" placeholder="Enter Product Id" required value={product_id} onChange={(e)=> setId(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                
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
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Carton Size</CLabel>
                                                            <CInput type ="number" id="ccnumber" placeholder="Number of Items in Carton" required  value={carton_size} onChange={(e)=> setCartonSize(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                {/* <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">North Region Carton Size</CLabel>
                                                            <CInput type ="number" id="ccnumber" placeholder="Number of Items in Carton in north region" required  value={n_size} onChange={(e)=> setNorthSize(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow> */}
                                                
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccnumber">Carton Quantity</CLabel>
                                                            <CInput type="number" id="ccnumber" placeholder="Number Of Cartons" required  value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Price</CLabel>
                                                            <CInput id="name" placeholder="Enter Price" required value={price} onChange={(e)=> setPrice(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                {/* <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">North Region Price</CLabel>
                                                            <CInput id="name" placeholder="Enter Price" required value={north_price} onChange={(e)=> setNorthPrice(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow> */}
                                                <CRow>

                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Size</CLabel>
                                                            <CInput id="name" placeholder="Enter Product Size" required value={product_size} onChange={(e)=> setProductSize(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Color</CLabel>
                                                            <CInput id="name" placeholder="Enter Product Color" required value={product_color} onChange={(e)=> setProductColor(e.target.value)}/>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                
                                                <CRow>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Date</CLabel>
                                                            <CInput id="ccmonth" value={currentDate} />

                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Month</CLabel>
                                                            <CInput id="ccmonth" value={month} />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="4">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccyear">Year</CLabel>
                                                            <CInput id="ccmonth" value={year} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <CCol md="2" >
                                                        <CButton block variant="outline" color="dark" onClick={() => addFinalProduct()}>Add </CButton>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CTabPane>
                                </CTabContent>

                            </CTabs>

                        </CCardBody>
                    </CCard>
                </CCol>


            </CRow>

        </CContainer>
    )
}

export default AddProduct
