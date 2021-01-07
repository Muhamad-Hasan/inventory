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
import { baseURL, basePATH } from '../../apimiddleware/url';
import { cibSublimeText } from '@coreui/icons';
import { Link } from "react-router-dom"
import date from "date-and-time"

const View = (props) => {

    const [data, setData] = useState([]);
    const [loading  , setLoading] = useState(false);


    useEffect(() => {
        console.log("props", props);

        if (props.location.state) {
            setData(props.location.state);

        }




    }, [])

    const downloadpdf = async(id)=>{
        let data = await axios.get(`${baseURL}invoice/pdf/${id}`);
        setLoading(true)
        console.log("data" , data);
        if(data.status == 200){
            setTimeout(() => {
                setLoading(false)
            
                window.open(`${basePATH}pdf/${data.data}`)
            
            }, 3000);
            
        }
    }
    console.log("invoice", data);

    return (
        <CContainer fluid>
            <CRow>
                <CCol xs="12" md="12" sm="12" lg="12" style={{ margin: 0, padding: 0 }}>


                    <CCard >
                        <CCardHeader>
                           <CRow>
                               <CCol style={{textAlign:"right" , fontWeight:"bold"}}>
                                   Invoice
                               </CCol>
                               <CCol>
                                <CRow style={{dispaly:"flex" , alignItems:"right" ,justifyContent:"flex-end"  }}>

                                    <CButton style={{width:"30%"}} block color="danger" onClick={()=> downloadpdf(data._id)} >{loading?"Loading ..." : "PDF" }</CButton>
                                    
                                </CRow>
                                            
                               </CCol>
                           </CRow>
                           
                        </CCardHeader>

                        <CCardBody>
                        
                            <CRow >
                                <CCol style={{ fontSize: "50px", textAlign: "center" }}>
                                    ICS
                        </CCol>

                            </CRow>
                            <hr />
                            <CRow>
                                <CCol style={{ textAlign: "center", alignItems: "center" }}>
                                    <span>{data && data.c_id && data.c_id.name} </span><br />
                                    <span>{data && data.c_id && data.c_id.address} </span><br />
                                    <span>Mobile No :{data && data.c_id && data.c_id.phone} </span><br />

                                </CCol>
                            </CRow>
                            <CRow >
                                <CCol style={{ textAlign: "flex-start", alignItems: "center" }}>
                                    Invoice No :{data.invoice_no}
                                </CCol>
                                <CCol style={{ display: "flex", justifyContent: "flex-end",  alignItems: "center" }}>
                                    <CRow style={{ flexDirection: "column" }}>
                                        <CCol>
                                            Created Date : {date.format(new Date(data.date), "DD-MM-YYYY hh:mm A")}
                                        </CCol>
                                        <CCol>
                                            Due Date : {date.format(date.addDays(new Date(data.date), 30), "DD-MM-YYYY")}
                                        </CCol>

                                    </CRow>
                                </CCol>

                            </CRow>
                            <CRow style={{ marginTop: "30px" , left:"30px"   }}>
                                <table style={{ width: "100%" }}>
                                    <tr style={{backgroundColor:"lightgrey",  height:"40px" }}>
                                        <th >S.No</th>
                                        <th>Qty</th>
                                        <th>Detail</th>
                                        <th>Product</th>
                                        <th>TP</th>
                                        <th>Scheme</th>
                                        <th>Net TP</th>
                                        <th>% Disc</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                    {
                                        data.products && data.products.length > 0 && data.products.map((text, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{text.quantity}</td>
                                                    <td>{(text.quantity/text.carton_size).toFixed(2) +" X "+text.carton_size }</td>
                                                    <td>{text.name}</td>
                                                    <td>{text.tp}</td>
                                                    <td>{text.scheme}</td>
                                                    <td>{text.net_tp.toFixed(2)}</td>
                                                    <td>{text.disc} %</td>
                                                    <td>{text.price.toFixed(2)}</td>
                                                    <td>{text.amount.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }


                                </table>
                            </CRow>
                            <CRow style={{ marginTop: "100px" }}>
                                <CCol style={{ textAlign: "flex-start",alignItems: "center" }}>
                                <CRow style={{ flexDirection: "column" }}>
                                        <CCol>
                                            Bilty No : {data.bilty_no}
                             </CCol>
                                        <CCol>
                                        No of Cartons : {data.ctn_no}
                             </CCol>
                             <CCol>
                                        Total Ledger Balance : {data.balance && data.balance.toFixed(2)}
                             </CCol>
                             <CCol>
                                       Note : {data.note}
                             </CCol>

                                    </CRow>
                                 </CCol>
                                <CCol style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <CRow style={{ flexDirection: "column" }}>
                                        <CCol>
                                            Total Amount : {data.total_amount && data.total_amount.toFixed(2)}
                             </CCol>
                                        <CCol>
                                        Bilty Amount : {data.bilty_amount && data.bilty_amount.toFixed(2)}
                             </CCol>
                             {
                                data.return_amount && data.return_amount > 0 ?
                                <CCol>
                                    Return Amount : {data.return_amount}
                                </CCol>:
                                null
                      
                             }
                             <CCol>
                                        Grand Total : {data.grand_total && data.grand_total.toFixed(2)}
                             </CCol>

                                    </CRow>
                                </CCol>

                            </CRow>
                       
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </CContainer>
    )
}

export default View
