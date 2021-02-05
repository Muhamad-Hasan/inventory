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
    CInputGroup,
    CInputGroupAppend,
    CListGroup,
    CListGroupItem,
    CDataTable,
    CBadge,
    CCollapse,
    CTextarea,
    CDropdown,
    CDropdownItem,
    CDropdownDivider,
    CDropdownMenu,
    CDropdownToggle
} from '@coreui/react'
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
import axios from "axios"


const CreateInvoice = (props) => {
    let date = new Date();
    const [user, setUser] = useState([]);
    const [currentDate, setDate] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState();
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [product_id, setId] = useState('');
    const [product_size, setProductSize] = useState('');
    const [product_color, setProductColor] = useState('');
    const [search, setSearch] = useState(false);
    const [selectUser, setSelect] = useState("")
    const [searchProduct, setProductSearch] = useState(false)
    const [product, setProduct] = useState([]);
    const [selectProduct, setP] = useState({})
    const [productTable, setPT] = useState([]);
    const [sq, setSQ] = useState();
    const [st, setST] = useState("");
    const [sa, setSA] = useState();
    const [invoice_name, setInvoiceName] = useState("");
    const [bilty_no, setBiltyNo] = useState("");
    const [bilty_amount, setBiltyAmount] = useState(0);
    const [transport_name, setTransportName] = useState("");
    const [transport_no, setTransportNo] = useState(["", ""]);
    const [transport_address, setTransportAddress] = useState(["", ""]);
    const [note, setNote] = useState("");
    const [return_amount, setReturnAmount] = useState()
    const [type, setType] = useState("large")
    const [region, setRegion] = useState("South");
    const [discount , setDiscount] = useState();
    const [loading , setLoading] = useState(false)


    const [fields] = useState(["product_id", "name", "product_size", "product_color","Carton size" , "quantity", "status", "show_details"])

    const select = (i , c_q) => {
        console.log("log" ,i , c_q , quantity);
        if(quantity<1){
            alert("Quantity must be greater than 1")
            return
        }
        if (!quantity) {
            alert("Empty Quantity is not allowed")
            return
        }if(quantity > c_q )
        {
            alert(`This product have only ${c_q} items in stock`);
            return
            
        }
        let all_products = []
        product.forEach(p=>{
            if(p._id == i){
                all_products =  [...all_products ,{...p ,quantity: parseFloat(quantity),discount : parseFloat(discount) ,q_type : type.toLowerCase() , region:region.toLowerCase() ,  selected: true, st, sq, sa} ]
            }else{
                all_products  = [...all_products , p] 
            }
            
        })
       


        // product[i] = { ...product[i], quantity: parseFloat(quantity),discount : parseFloat(discount) ,q_type : type.toLowerCase() , region:region.toLowerCase() ,  selected: true, st, sq, sa };
        setProduct(all_products)
        setQuantity();
        setDiscount()
        setType("large")
        setRegion("South")
        setST("")
        setSQ()
        setSA()
        console.log("p", all_products);
        
    }

    const unselect = (i) => {
        // product[i] = { ...product[i], quantity: undefined, selected: false };
        let all_products = []
        product.forEach(p=>{
            if(p._id != i){
                all_products =  [...all_products ,{...p ,quantity: undefined,selected :false } ]
            }            
        })
        
        setProduct(all_products)
        console.log("p", product);
    }

    

   
    const createInvoice = async () => {
        try {
            let products = product.filter(f => f.selected == true);
            console.log("fiklter" , products);
            let obj = {}
            if (parseInt(return_amount) > 0) {
                obj = {
                    c_id: selectUser,
                    bilty_no, bilty_amount,
                    note,
                    products: products,
                    return_amount: return_amount,
                    type: "return"

                };
            } else {
                obj = {
                    c_id: selectUser,
                    bilty_no, bilty_amount,
                    note,
                    products: products,
                    type: "normal"

                };
            }
            console.log('product', products);
            let data = await Axios.post(`${baseURL}invoice`, obj);
            console.log("dta" , data);
            alert("Successfully Created")
            props.history.push("/invoice/list")
        } catch (err) {
            // alert(err.response)
            if(err.response.status){
                alert(err.response && err.response.data)
            }
            console.log(err)
        }

    }
    console.log("table", productTable)
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

    useEffect(() => {
        async function customer() {
            let data = name ? await axios.get(`${baseURL}product?name=${name}`) : await axios.get(`${baseURL}product`);
            console.log("data", data);
            if (data.status == 200) {
                setProduct(data.data);
            }
        }
        customer();



    }, [searchProduct])

    const [details, setDetails] = useState([])

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
        setQuantity(0)
    }
    return (
        <CContainer>
            <CRow>
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardHeader>
                            <center>
                                <b >Create Invoice</b>

                            </center>
                        </CCardHeader>
                        <CCardBody>
                            <CTabs>
                                <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink>
                                            <b>Select Customer</b>
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink>
                                            <b>Add Items</b>
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink>
                                            <b>Other Details</b>
                                        </CNavLink>
                                    </CNavItem>

                                </CNav>
                                <CTabContent>
                                    <CTabPane>

                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CInputGroup>
                                                            <CInput id="appendedInputButton" size="16" placeholder="Search customer by name" value={name} onChange={e => setName(e.target.value)} type="text" />
                                                            <CInputGroupAppend>
                                                                <CButton onClick={() => setSearch(!search)} color="secondary">Search</CButton>
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
                                                                        <CListGroupItem onClick={() => setSelect(u._id)} href="#" active={active}>
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




                                    </CTabPane>
                                    <CTabPane>

                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol>
                                                        <CDataTable
                                                            items={product}
                                                            fields={fields}
                                                            // columnFilter
                                                            tableFilter
                                                            hover
                                                            sorter
                                                            scopedSlots={{

                                                                "product_size":
                                                                    (item) => (
                                                                        <td>{item.product_size ? item.product_size : "Not Found"}</td>
                                                                    ),
                                                                "product_color":
                                                                    (item) => (
                                                                        <td>{item.product_color ? item.product_color : "Not Found"}</td>
                                                                    ),
                                                                "Carton size":
                                                                (item) => (
                                                                    <td><center>{item.carton_size}</center></td>
                                                                ),
                                                                "quantity":
                                                                    (item) => (
                                                                        <td><center>{item.quantity ? item.quantity : "Not Selected"}</center></td>
                                                                    ),
                                                                'status':
                                                                    (item) => (
                                                                        <td>
                                                                            <center>
                                                                                <CBadge color={item && item.selected ? "success" : "secondary"}>
                                                                                    {item && item.selected ? "Selected" : "Pending"}
                                                                                </CBadge>
                                                                            </center>

                                                                        </td>
                                                                    ),
                                                                'show_details':
                                                                    (item, index) => {
                                                                        return (
                                                                            <td className="py-2">
                                                                                <center>
                                                                                    <CButton
                                                                                        color="primary"
                                                                                        variant="outline"
                                                                                        shape="square"
                                                                                        size="sm"
                                                                                        onClick={() => { toggleDetails(index) }}
                                                                                    >
                                                                                        {details.includes(index) ? 'Hide' : 'Show'}
                                                                                    </CButton>
                                                                                </center>
                                                                            </td>
                                                                        )
                                                                    },
                                                                'details':
                                                                    (item, index) => {
                                                                        console.log("item" , item);
                                                                        return (
                                                                            <CCollapse show={details.includes(index)}>
                                                                                <CCardBody>
                                                                                    {/* { !item.selected &&
                                                <> */}
                                                                                    <CRow>
                                                                                        <CCol xs="12">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccnumber">Quantity</CLabel>
                                                                                                <CInput disabled={item.selected} id="ccnumber" type="number" placeholder="Product Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                                                                            </CFormGroup>
                                                                                        </CCol>
                                                                                        {/* <CCol style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }} xs="2">
                                                                                            <CDropdown >
                                                                                                <CDropdownToggle color="info">
                                                                                                    {type}
                                                                                                </CDropdownToggle>
                                                                                                <CDropdownMenu>
                                                                                                    <CDropdownItem onClick={() => setType("large")}>Large</CDropdownItem>
                                                                                                    <CDropdownItem onClick={() => setType("small")}>Small</CDropdownItem>
                                                                                                </CDropdownMenu>
                                                                                            </CDropdown>
                                                                                        </CCol> */}
                                                                                    </CRow>
                                                                                    <CRow>
                                                                                        <CCol xs="12">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccnumber">Discount</CLabel>
                                                                                                <CInput disabled={item.selected} id="ccnumber" type="number" placeholder="Discount in percent" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                                                                            </CFormGroup>
                                                                                        </CCol>
                                                                                        {/* <CCol style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}  xs="2" lg="2">
                                                                                            <CDropdown >
                                                                                                <CDropdownToggle color="info">
                                                                                                    {region}
                                                                                                </CDropdownToggle>
                                                                                                <CDropdownMenu>
                                                                                                    <CDropdownItem onClick={() => setRegion("South")}>South</CDropdownItem>
                                                                                                    <CDropdownItem onClick={() => setRegion("North")}>North</CDropdownItem>
                                                                                                </CDropdownMenu>
                                                                                            </CDropdown>
                                                                                        </CCol> */}
                                                                                        
                                                                                    </CRow>
                                                                                    <CRow>
                                                                                        <CCol xs="4">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccmonth">Carton Size</CLabel>
                                                                                                <CInput type="number" disabled={item.selected} value={item.carton_size.toFixed(2)}  />

                                                                                            </CFormGroup>
                                                                                        </CCol>

                                                                                        <CCol xs="4">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccmonth">Cartons</CLabel>
                                                                                                <CInput value={item.stock.toFixed(2)} disabled={item.selected}  />
                                                                                            </CFormGroup>
                                                                                        </CCol>
                                                                                        <CCol xs="4">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccyear">Quantity</CLabel>
                                                                                                <CInput type="number" disabled={item.selected} value={(parseFloat(item.carton_size) * parseFloat(item.stock)).toFixed(2) }  />
                                                                                            </CFormGroup>
                                                                                        </CCol>
                                                                                    </CRow>
                                                                                  
                                                                                    {/* <CRow>
                                                                                        <CCol xs="4">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccmonth">Scheme Quantity</CLabel>
                                                                                                <CInput type="number" disabled={item.selected} value={sq} onChange={(e) => setSQ(e.target.value)} />

                                                                                            </CFormGroup>
                                                                                        </CCol>

                                                                                        <CCol xs="4">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccmonth">Scheme Type</CLabel>
                                                                                                <CInput value={st} disabled={item.selected} onChange={(e) => setST(e.target.value)} />
                                                                                            </CFormGroup>
                                                                                        </CCol>
                                                                                        <CCol xs="4">
                                                                                            <CFormGroup>
                                                                                                <CLabel htmlFor="ccyear">Scheme Amount</CLabel>
                                                                                                <CInput type="number" disabled={item.selected} value={sa} onChange={(e) => setSA(e.target.value)} />
                                                                                            </CFormGroup>
                                                                                        </CCol>
                                                                                    </CRow> */}
                                                                                  
                                                                                    {
                                                                                        !item.selected ?
                                                                                            <CButton onClick={() => select(item._id ,item.carton_size * item.stock )} size="sm" color="info">
                                                                                                Select
                                                                                               
                  </CButton>
                                                                                            : <CButton size="sm" onClick={() => unselect(item._id)} color="danger" className="ml-1">
                                                                                                Unselect
                </CButton>
                                                                                    }

                                                                                </CCardBody>
                                                                            </CCollapse>
                                                                        )
                                                                    }
                                                            }}
                                                        />
                                                    </CCol>

                                                </CRow>



                                            </CCardBody>
                                        </CCard>

                                    </CTabPane>
                                    <CTabPane>
                                        <CCard>
                                            <CCardHeader>

                                            </CCardHeader>
                                            <CCardBody>

                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Bilty Number</CLabel>
                                                            <CInput id="name" placeholder="Bilty Number" required value={bilty_no} onChange={(e) => setBiltyNo(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Bilty Amount</CLabel>
                                                            <CInput id="name" type="number" placeholder="Bilty Amount" required value={bilty_amount} onChange={(e) => setBiltyAmount(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Return Amount</CLabel>
                                                            <CInput id="name" type="number" placeholder="Return Amount" required value={return_amount} onChange={(e) => setReturnAmount(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                {/* <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Transport Name</CLabel>
                                                            <CInput id="name" type="text" placeholder="Transport Name" required value={transport_name} onChange={(e) => setTransportName(e.target.value)} />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>


                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Transport No</CLabel>
                                                            <CRow>
                                                                <CCol>
                                                                    <CInput id="ccmonth" placeholder="Transport Number One" value={transport_no.length > 0 ? transport_no[0] : ""} onChange={(e) => setTransportNo([e.target.value, transport_no[1]])} />

                                                                </CCol>
                                                                <CCol>
                                                                    <CInput id="ccmonth" placeholder="Transport Number Two" value={transport_no.length > 1 ? transport_no[1] : ""} onChange={(e) => setTransportNo([transport_no[0], e.target.value])} />

                                                                </CCol>
                                                            </CRow>


                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="ccmonth">Transport Address</CLabel>
                                                            <CRow>
                                                                <CCol>
                                                                    <CInput id="ccmonth" placeholder="First Transport Address" value={transport_address.length > 0 ? transport_address[0] : ""} onChange={(e) => setTransportAddress([e.target.value, transport_address[1]])} />

                                                                </CCol>
                                                                <CCol>
                                                                    <CInput id="ccmonth" placeholder="Second Transport Address" value={transport_address.length > 1 ? transport_address[1] : ""} onChange={(e) => setTransportAddress([transport_address[0], e.target.value])} />

                                                                </CCol>
                                                            </CRow>


                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow> */}
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">Note</CLabel>
                                                            <CTextarea id="name" type="text" placeholder="Comments" required value={note} onChange={(e) => setNote(e.target.value)} ></CTextarea>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>

                                                <CRow style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <CCol md="2" >
                                                        <CButton block variant="outline" color="dark" onClick={() => createInvoice()}>Create Invoice </CButton>
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

export default CreateInvoice
