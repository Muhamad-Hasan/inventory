(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[10],{617:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return c}));var n="http://localhost:8000/api/",c="https://maclay.herokuapp.com/"},622:function(e,t,a){"use strict";var n=a(618),c=a.n(n),r=a(619),l=a(617),u=function(){var e=Object(r.a)(c.a.mark((function e(t,a,n){var r,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t,l.b+"".concat(a),"yes"),e.prev=1,e.next=4,fetch(l.b+"".concat(a),{method:"POST",headers:{"Content-Type":"application/json",authorization:"Bearer ".concat(n)},body:JSON.stringify(t)});case 4:if(r=e.sent,console.log("respone",r),200!=r.status){e.next=14;break}return e.next=9,r.json();case 9:return u=e.sent,alert("Successfully Added"),e.abrupt("return",u);case 14:if(401!=r.status){e.next=21;break}return e.next=17,r.json();case 17:u=e.sent,console.log("respone",u),e.next=42;break;case 21:if(404!=r.status){e.next=28;break}return e.next=24,r.json();case 24:u=e.sent,console.log("respone",u),e.next=42;break;case 28:if(400!=r.status){e.next=36;break}return e.next=31,r.json();case 31:u=e.sent,console.log("400",u),alert(u.details[0].message),e.next=42;break;case 36:if(202!=r.status){e.next=42;break}return e.next=39,r.json();case 39:u=e.sent,console.log("400",u),alert("Already Exists");case 42:e.next=48;break;case 44:e.prev=44,e.t0=e.catch(1),console.log("err",e.t0),alert(e.t0);case 48:case"end":return e.stop()}}),e,null,[[1,44]])})));return function(t,a,n){return e.apply(this,arguments)}}();t.a=u},627:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(629);var c=a(628);function r(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},757:function(e,t,a){"use strict";a.r(t);var n=a(618),c=a.n(n),r=a(619),l=a(154),u=a(627),o=a(623),s=a(1),i=a.n(s),m=a(620),b=(a(622),a(624)),d=a.n(b),E=a(617);t.default=function(e){var t=new Date,a=Object(s.useState)([]),n=Object(o.a)(a,2),b=n[0],p=n[1],f=Object(s.useState)(t.getDate()),j=Object(o.a)(f,2),O=(j[0],j[1],Object(s.useState)(t.getMonth()+1)),h=Object(o.a)(O,2),y=(h[0],h[1],Object(s.useState)(t.getFullYear())),x=Object(o.a)(y,2),v=(x[0],x[1],Object(s.useState)("")),S=Object(o.a)(v,2),g=S[0],k=S[1],C=Object(s.useState)(""),_=Object(o.a)(C,2),F=(_[0],_[1],Object(s.useState)()),w=Object(o.a)(F,2),z=w[0],q=w[1],K=Object(s.useState)(""),A=Object(o.a)(K,2),I=(A[0],A[1],Object(s.useState)("")),N=Object(o.a)(I,2),T=(N[0],N[1],Object(s.useState)("")),B=Object(o.a)(T,2),D=(B[0],B[1],Object(s.useState)("")),Q=Object(o.a)(D,2),H=(Q[0],Q[1],Object(s.useState)("")),J=Object(o.a)(H,2),P=(J[0],J[1],Object(s.useState)(!1)),L=Object(o.a)(P,2),R=L[0],U=L[1],G=Object(s.useState)(""),M=Object(o.a)(G,2),V=M[0],Y=M[1],W=Object(s.useState)(!1),X=Object(o.a)(W,2),Z=X[0],$=(X[1],Object(s.useState)([])),ee=Object(o.a)($,2),te=ee[0],ae=ee[1],ne=Object(s.useState)({}),ce=Object(o.a)(ne,2),re=(ce[0],ce[1],Object(s.useState)([])),le=Object(o.a)(re,2),ue=le[0],oe=(le[1],Object(s.useState)()),se=Object(o.a)(oe,2),ie=se[0],me=se[1],be=Object(s.useState)(""),de=Object(o.a)(be,2),Ee=de[0],pe=de[1],fe=Object(s.useState)(),je=Object(o.a)(fe,2),Oe=je[0],he=je[1],ye=Object(s.useState)(""),xe=Object(o.a)(ye,2),ve=(xe[0],xe[1],Object(s.useState)("")),Se=Object(o.a)(ve,2),ge=Se[0],ke=Se[1],Ce=Object(s.useState)(0),_e=Object(o.a)(Ce,2),Fe=_e[0],we=_e[1],ze=Object(s.useState)(""),qe=Object(o.a)(ze,2),Ke=(qe[0],qe[1],Object(s.useState)(["",""])),Ae=Object(o.a)(Ke,2),Ie=(Ae[0],Ae[1],Object(s.useState)(["",""])),Ne=Object(o.a)(Ie,2),Te=(Ne[0],Ne[1],Object(s.useState)("")),Be=Object(o.a)(Te,2),De=Be[0],Qe=Be[1],He=Object(s.useState)(),Je=Object(o.a)(He,2),Pe=Je[0],Le=Je[1],Re=Object(s.useState)("large"),Ue=Object(o.a)(Re,2),Ge=Ue[0],Me=Ue[1],Ve=Object(s.useState)("South"),Ye=Object(o.a)(Ve,2),We=Ye[0],Xe=Ye[1],Ze=Object(s.useState)(),$e=Object(o.a)(Ze,2),et=$e[0],tt=$e[1],at=Object(s.useState)(!1),nt=Object(o.a)(at,2),ct=(nt[0],nt[1],Object(s.useState)(["product_id","name","product_size","product_color","Carton size","quantity","status","show_details"])),rt=Object(o.a)(ct,1)[0],lt=function(){var t=Object(r.a)(c.a.mark((function t(){var a,n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=te.filter((function(e){return 1==e.selected})),console.log("fiklter",a),n={},n=parseInt(Pe)>0?{c_id:V,bilty_no:ge,bilty_amount:Fe,note:De,products:a,return_amount:Pe,type:"return"}:{c_id:V,bilty_no:ge,bilty_amount:Fe,note:De,products:a,type:"normal"},console.log("product",a),t.next=8,d.a.post("".concat(E.b,"invoice"),n);case 8:r=t.sent,console.log("dta",r),alert("Successfully Created"),e.history.push("/invoice/list"),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),t.t0.response.status&&alert(t.t0.response&&t.t0.response.data),console.log(t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,14]])})));return function(){return t.apply(this,arguments)}}();console.log("table",ue),Object(s.useEffect)((function(){function e(){return(e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!g){e.next=6;break}return e.next=3,d.a.get("".concat(E.b,"customer?name=").concat(g));case 3:e.t0=e.sent,e.next=9;break;case 6:return e.next=8,d.a.get("".concat(E.b,"customer"));case 8:e.t0=e.sent;case 9:t=e.t0,console.log("data",t),200==t.status&&p(t.data);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[R]),Object(s.useEffect)((function(){function e(){return(e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!g){e.next=6;break}return e.next=3,d.a.get("".concat(E.b,"product?name=").concat(g));case 3:e.t0=e.sent,e.next=9;break;case 6:return e.next=8,d.a.get("".concat(E.b,"product"));case 8:e.t0=e.sent;case 9:t=e.t0,console.log("data",t),200==t.status&&ae(t.data);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[Z]);var ut=Object(s.useState)([]),ot=Object(o.a)(ut,2),st=ot[0],it=ot[1];return i.a.createElement(m.k,null,i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12",md:"12",className:"mb-4"},i.a.createElement(m.e,null,i.a.createElement(m.h,null,i.a.createElement("center",null,i.a.createElement("b",null,"Create Invoice"))),i.a.createElement(m.f,null,i.a.createElement(m.U,null,i.a.createElement(m.G,{variant:"tabs"},i.a.createElement(m.H,null,i.a.createElement(m.I,null,i.a.createElement("b",null,"Select Customer"))),i.a.createElement(m.H,null,i.a.createElement(m.I,null,i.a.createElement("b",null,"Add Items"))),i.a.createElement(m.H,null,i.a.createElement(m.I,null,i.a.createElement("b",null,"Other Details")))),i.a.createElement(m.S,null,i.a.createElement(m.T,null,i.a.createElement(m.e,null,i.a.createElement(m.h,null),i.a.createElement(m.f,null,i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.y,null,i.a.createElement(m.x,{id:"appendedInputButton",size:"16",placeholder:"Search customer by name",value:g,onChange:function(e){return k(e.target.value)},type:"text"}),i.a.createElement(m.z,null,i.a.createElement(m.d,{onClick:function(){return U(!R)},color:"secondary"},"Search"))))),i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12",style:{marginTop:"30px "}},i.a.createElement(m.E,null,b&&b.length>0&&b.map((function(e,t){var a=V==e._id;return console.log("active",a),i.a.createElement(m.F,{onClick:function(){return Y(e._id)},href:"#",active:a},i.a.createElement(m.K,{onClick:function(){return Y(e._id)}},i.a.createElement(m.i,null,e.c_id),i.a.createElement(m.i,null,e.name)))})))))))),i.a.createElement(m.T,null,i.a.createElement(m.e,null,i.a.createElement(m.h,null),i.a.createElement(m.f,null,i.a.createElement(m.K,null,i.a.createElement(m.i,null,i.a.createElement(m.m,{items:te,fields:rt,tableFilter:!0,hover:!0,sorter:!0,scopedSlots:{product_size:function(e){return i.a.createElement("td",null,e.product_size?e.product_size:"Not Found")},product_color:function(e){return i.a.createElement("td",null,e.product_color?e.product_color:"Not Found")},"Carton size":function(e){return i.a.createElement("td",null,i.a.createElement("center",null,e.carton_size))},quantity:function(e){return i.a.createElement("td",null,i.a.createElement("center",null,e.quantity?e.quantity:"Not Selected"))},status:function(e){return i.a.createElement("td",null,i.a.createElement("center",null,i.a.createElement(m.a,{color:e&&e.selected?"success":"secondary"},e&&e.selected?"Selected":"Pending")))},show_details:function(e,t){return i.a.createElement("td",{className:"py-2"},i.a.createElement("center",null,i.a.createElement(m.d,{color:"primary",variant:"outline",shape:"square",size:"sm",onClick:function(){!function(e){var t=st.indexOf(e),a=st.slice();-1!==t?a.splice(t,1):a=[].concat(Object(u.a)(st),[e]),it(a),q(0)}(t)}},st.includes(t)?"Hide":"Show")))},details:function(e,t){return console.log("item",e),i.a.createElement(m.j,{show:st.includes(t)},i.a.createElement(m.f,null,i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"ccnumber"},"Quantity"),i.a.createElement(m.x,{disabled:e.selected,id:"ccnumber",type:"number",placeholder:"Product Quantity",value:z,onChange:function(e){return q(e.target.value)}})))),i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"ccnumber"},"Discount"),i.a.createElement(m.x,{disabled:e.selected,id:"ccnumber",type:"number",placeholder:"Discount in percent",value:et,onChange:function(e){return tt(e.target.value)}})))),i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"4"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"ccmonth"},"Carton Size"),i.a.createElement(m.x,{type:"number",disabled:e.selected,value:e.carton_size.toFixed(2)}))),i.a.createElement(m.i,{xs:"4"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"ccmonth"},"Cartons"),i.a.createElement(m.x,{value:e.stock.toFixed(2),disabled:e.selected}))),i.a.createElement(m.i,{xs:"4"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"ccyear"},"Quantity"),i.a.createElement(m.x,{type:"number",disabled:e.selected,value:(parseFloat(e.carton_size)*parseFloat(e.stock)).toFixed(2)})))),e.selected?i.a.createElement(m.d,{size:"sm",onClick:function(){return function(e){var t=[];te.forEach((function(a){a._id!=e&&(t=[].concat(Object(u.a)(t),[Object(l.a)(Object(l.a)({},a),{},{quantity:void 0,selected:!1})]))})),ae(t),console.log("p",te)}(e._id)},color:"danger",className:"ml-1"},"Unselect"):i.a.createElement(m.d,{onClick:function(){return function(e,t){if(console.log("log",e,t,z),z<1)alert("Quantity must be greater than 1");else if(z)if(z>t)alert("This product have only ".concat(t," items in stock"));else{var a=[];te.forEach((function(t){a=t._id==e?[].concat(Object(u.a)(a),[Object(l.a)(Object(l.a)({},t),{},{quantity:parseFloat(z),discount:parseFloat(et),q_type:Ge.toLowerCase(),region:We.toLowerCase(),selected:!0,st:Ee,sq:ie,sa:Oe})]):[].concat(Object(u.a)(a),[t])})),ae(a),q(),tt(),Me("large"),Xe("South"),pe(""),me(),he(),console.log("p",a)}else alert("Empty Quantity is not allowed")}(e._id,e.carton_size*e.stock)},size:"sm",color:"info"},"Select")))}}})))))),i.a.createElement(m.T,null,i.a.createElement(m.e,null,i.a.createElement(m.h,null),i.a.createElement(m.f,null,i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"name"},"Bilty Number"),i.a.createElement(m.x,{id:"name",placeholder:"Bilty Number",required:!0,value:ge,onChange:function(e){return ke(e.target.value)}})))),i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"name"},"Bilty Amount"),i.a.createElement(m.x,{id:"name",type:"number",placeholder:"Bilty Amount",required:!0,value:Fe,onChange:function(e){return we(e.target.value)}})))),i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"name"},"Return Amount"),i.a.createElement(m.x,{id:"name",type:"number",placeholder:"Return Amount",required:!0,value:Pe,onChange:function(e){return Le(e.target.value)}})))),i.a.createElement(m.K,null,i.a.createElement(m.i,{xs:"12"},i.a.createElement(m.t,null,i.a.createElement(m.C,{htmlFor:"name"},"Note"),i.a.createElement(m.V,{id:"name",type:"text",placeholder:"Comments",required:!0,value:De,onChange:function(e){return Qe(e.target.value)}})))),i.a.createElement(m.K,{style:{display:"flex",justifyContent:"flex-end"}},i.a.createElement(m.i,{md:"2"},i.a.createElement(m.d,{block:!0,variant:"outline",color:"dark",onClick:function(){return lt()}},"Create Invoice ")))))))))))))}}}]);
//# sourceMappingURL=10.2cef1cff.chunk.js.map