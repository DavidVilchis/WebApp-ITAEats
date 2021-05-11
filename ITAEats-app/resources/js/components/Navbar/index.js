import React from 'react';
import '../../../css/NavbarStyle.css';
import { Form, FormControl, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
const NavbarComponent = () => {
    return (
        <>
            <Navbar expand="lg" className="navbar-style" variant = "dark">
                <Navbar.Brand href="#home">
                    <img src="/WebApp-ITAEats/ITAEats-app/resources/images/ITAEatsLogo.png" width = "100" heaight = "100" className = "d-inline-block align-top" alt=""/>{' '}
                    <Form.Label className="title-label">ITA-Eats</Form.Label>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="link-style">Inicio</Nav.Link>
                        <Nav.Link href="https://aguascalientes.tecnm.mx/" className="link-style">TecNM - ITA</Nav.Link>
                        <Nav.Link href="https://aguascalientes.tecnm.mx/sin-categoria/antecedentes-e-historia/" className="link-style">Nosotros</Nav.Link>
                        <NavDropdown title="Iniciar Sesión" id="basic-nav-dropdown" className="dropdown-style">
                            <NavDropdown.Item href="#action/3.1">Estudiante - Profesor</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Cafetería</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavbarComponent;