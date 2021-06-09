import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import '../../../css/NavbarHomeStyle.css';
import { Form, FormControl, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
const NavbarComponent = () => {
    return (
        <>
            <div className = "w-100">
            <Navbar expand="lg" className="navbar-style" variant = "dark">
                <Navbar.Brand as = {Link} to = "/WebApp-ITAEats/ITAEats-app/public/">
                    <img src="/WebApp-ITAEats/ITAEats-app/resources/images/ITAEatsLogo.png" width = "70" heaight = "70" className = "d-inline-block align-top" alt=""/>{' '}
                    <Form.Label id="title-label">ITA-Eats</Form.Label>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as = {Link} to = "/WebApp-ITAEats/ITAEats-app/public/" className="link-style">Inicio</Nav.Link>
                        <Nav.Link href="https://aguascalientes.tecnm.mx/" className="link-style">TecNM - ITA</Nav.Link>
                        <Nav.Link href="https://aguascalientes.tecnm.mx/sin-categoria/antecedentes-e-historia/" className="link-style">Nosotros</Nav.Link>
                        <NavDropdown title="Iniciar Sesión" id="basic-nav-dropdown" className="dropdown-style">
                            <NavDropdown.Item as = {Link} to = "/WebApp-ITAEats/ITAEats-app/public/login">Estudiante</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as = {Link} to = "/WebApp-ITAEats/ITAEats-app/public/login/cafeteria">Cafetería</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
            
            
        </>
    );
};

export default NavbarComponent;