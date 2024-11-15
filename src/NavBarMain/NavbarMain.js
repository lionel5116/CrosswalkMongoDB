import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Button, Navbar, Modal,Form,Row,Col } from 'react-bootstrap';
//import { NavDropdown } from 'react-bootstrap';

import { useState, useContext } from 'react';
import { CartContext } from '../components/ShoppingCart/CartContext';
import CartProduct from '../components/ShoppingCart/CartProduct';

import { GearFill } from 'react-bootstrap-icons';




const NavbarMain = () => {


  return (
    <>
      <div id="MasterContainer">
        <Navbar  expand="lg" style={{backgroundColor:'#b5cfdb'}}>
          <Navbar.Brand href="#/Dashboard" style={{marginLeft:'15px'}}>CROSSWALK 2025-2026</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/Dashboard">Home</Nav.Link>

              <Nav.Link href="#/CrossWalkNewDesign">Crosswalk Staff</Nav.Link>
              <Nav.Link href="#">24-25 APR</Nav.Link>

             

            </Nav>

          </Navbar.Collapse>

          <Navbar.Toggle />

  
       <Form inline ="true">
        <Row>
         
          <Col xs="auto" style={{marginRight:'50px'}}>
            <GearFill/>
          </Col>
        </Row>
      </Form>
        </Navbar>
        
     
      </div>
    </>
  )

}


const myStyles = {
  navBarMarginLeft: {
    marginLeft: '15px'
  },
  headerBackground: {
    backgroundColor: 'powderblue'
  },
};


export default NavbarMain

