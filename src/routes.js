import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddProduct = React.lazy(() => import("./views/inventory/AddProduct"));
const rawmaterial = React.lazy(() => import("./views/inventory/RawMaterial"));
const finishmaterial = React.lazy(() => import("./views/inventory/FinishProduct"));
const packagingmaterial = React.lazy(() => import("./views/inventory/PackagingMaterial"));
const finalproduct = React.lazy(() => import("./views/inventory/FinalProduct"));
const form = React.lazy(()=> import("./views/inventory/Form") )
const Customer = React.lazy(()=> import("./views/customer/Customer") )
const List = React.lazy(()=> import("./views/customer/List") )
const Update = React.lazy(()=> import("./views/customer/Updatecustomer") )
const createInvoice = React.lazy(()=> import("./views/invoice/CreateInvoice"))
const invoiceList = React.lazy(()=> import("./views/invoice/Invoicelist"))
const login = React.lazy(()=> import("./views/pages/login/Login"));
const statement = React.lazy(()=> import("./views/statement/StatementList"));
const credit = React.lazy(()=> import("./views/statement/AddStatment"));
const invoicView = React.lazy(()=> import("./views/invoice/invoice"));
const sales = React.lazy(()=> import("./views/inventory/Sales"));
const debit  = React.lazy(()=> import("./views/statement/addDebit"))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/inventory/product', name: 'Add Product', component: AddProduct },
  { path: '/inventory/rawmaterial', name: 'Raw Material', component: rawmaterial },
  { path: '/inventory/finishmaterial', name: 'Finish Material', component: finishmaterial },
  { path: '/inventory/packagingmaterial', name: 'Packaging Material', component: packagingmaterial },
  { path: '/inventory/finalproduct', name: 'Final Product', component: finalproduct },
  { path: '/inventory/form/:page/:id', name: 'Form', component: form },
  { path: '/customer/add', name:'Add Customer', component: Customer },
  { path: '/customer/list', name:'Customer List', component: List },
  { path: '/customer/form', name:'Customer Edit', component: Update },
  { path: '/invoice/create', name:'Genrate Invoice', component: createInvoice },
  { path: '/invoice/list/:id', exact:true , name:'Invoice List', component: invoiceList },
  { path: '/invoice/view', exact:true , name:'Invoice View', component: invoicView },
  { path: '/inventory/sales/:id', exact:true , name:'Sales', component: sales },
  
  { path: '/invoice/list', exact:true , name:'Invoice List', component: invoiceList },
  { path: '/statement/list',exact:true , name:'Statements', component: statement },
  { path: '/statement/list/:id', name:'Statements', component: statement },
  
  { path: '/statement/create', name:'Create credit', component: credit },
  { path: '/statement/debit', name:'Create Debit', component: debit },
  
  
  
  ];

export default routes;
