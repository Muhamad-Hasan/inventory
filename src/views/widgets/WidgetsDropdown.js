import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'

const WidgetsDropdown = (props) => {
  console.log("props" , props);
  let {count} = props
  // render
  return (
    <CRow>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header={count && count.user}
          text="Customers"
          style={{height:"200px"}}
        >
       
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={count && count.product}
          text="Products"
          style={{height:"200px"}}
         
        >
          
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header={count && count.invoice}
          text="Invoices"
          style={{height:"200px"}}
          
        >
        </CWidgetDropdown>
      </CCol>

    
    </CRow>
  )
}

export default WidgetsDropdown
