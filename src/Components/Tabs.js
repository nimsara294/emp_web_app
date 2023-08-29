import React from 'react'
import Nav from 'react-bootstrap/Nav';

import "bootstrap/dist/css/bootstrap.css";

function Tabs() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link href="/employees">Employees</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/departments'>Departments</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Tabs