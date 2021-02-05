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
import { Link } from "react-router-dom";
import date from "date-and-time"

const List = (props) => {

    const [name, setName] = useState('');
    const [search, setSearch] = useState(0);
    const [fields] = useState(["S.no", "Customer ID", "Name", "Date", "Invoice_no", "Description","Debit", "Credit",  "Balance"]);
    const [usersData, setUser] = useState([]);
    const [id , setId] = useState();
    const [loading , setLoading] = useState(false)



    useEffect(() => {
        console.log("props", props);
        let id = false;
        if (props.match.params.id) {
            console.log("id", props.match.params.id);
            id = props.match.params.id;
            setId(id)
        }
        let query = id == false ? `${baseURL}statement` : `${baseURL}statement/${id}`;
        console.log("query", query);
        async function customer() {
            let data = await axios.get(query);
            console.log("data", data);
            if (data.status == 200) {
                let user = data.data;
                let table = []
                user.map((u, i) => {
                    let obj = {
                        "S.no": i + 1,
                        "Invoice_no": u.invoice_no,
                        "Customer ID": u.c_id.c_id,
                        "Name": u.c_id.name,
                        "Date": date.format(new Date(u.date), "DD-MM-YYYY"),
                        "Description": u.description,
                        "Credit": u.credit,
                        "Debit": u.debit,
                        "Balance": u.balance.toFixed(2),
                        data: u
                    }
                    table = [...table, obj]
                });
                setUser(table);
            }
        }
        customer();

        return (()=>{
            setLoading(false)
        })

    }, [search , loading])

    const pdf = async()=>{
        setLoading(true)
        let user_id = id ? id : null;
        setLoading(true)
        if(!id){
            user_id = prompt("Please Enter customer Id");
            console.log("user" , user_id);
            setId(user_id) 
        }
        let data =await axios.get(`${baseURL}statement/pdf/${user_id}`);
        console.log("data" , data);
        if(data){
            console.log("data" , data);
            setTimeout(() => {
                window.open(`${basePATH}statement/${data.data}`);
                setLoading(false)
            
            }, 3000);
            
        }

    }

    const deleteStatment = async(id)=>{
        try{
            let ask = prompt("Do You Want to Delete this Record" , "Yes");
            if(ask == "Yes"){
                let statement =await axios.delete(`${baseURL}statement/${id}`);
                console.log("statement" , statement);
                if(statement.status == 200){
                    setLoading(true)
                }
                
            }
        }catch(err){

        }
    }

    return (
        <CContainer >
            <CCard style={{ padding: 0, margin: 0 }}>
                <CCardHeader>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Statement</span>
                        <CCol sm="1" md="2" lg="2" >
                            <CButton block color="danger" onClick={() =>pdf() } >{loading ? "Loading ..." : "PDF"}</CButton>
                        </CCol>

                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow style={{ marginTop: "20px" }}>
                        <CDataTable
                            items={usersData}
                            fields={fields}
                            itemsPerPage={100}
                            striped
                            pagination
                            tableFilter
                            scopedSlots={{
                                "Name":
                                    (item)=>(
                                        <td onDoubleClick={()=>{
                                            deleteStatment(item.data._id)
                                        }}>
                                            {item.Name}
                                        </td>
                                        
                                    ),
                                "Description":
                                    (item) => (
                                        <td style={{ width: "20%" }}>
                                            {item.Description}
                                        </td>
                                    ),

                                "Invoice_no":
                                    (item) => (
                                        <td onClick={() => { props.history.push({ pathname: "/invoice/view", state: item.data }) }} >
                                            {item.Invoice_no}
                                        </td>
                                    ),

                                "Date":
                                    (item) => (
                                        <td style={{ width: "10%" }}>
                                            {item.Date}
                                        </td>
                                    ),

                            }}
                        />

                    </CRow>
                </CCardBody>
            </CCard>

        </CContainer>
    )
}

export default List
