import React from 'react';
import '../../../css/NavbarUIStyle.css';
import {FiLogOut} from 'react-icons/fi';
import {RiRestaurantLine, RiUserLine} from 'react-icons/ri';
import {Link} from 'react-router-dom';
import { Form, FormControl, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
const NavbarComponent = () => {
    return (
        <>
            <div className = "w-100">
            <Navbar expand="lg" className="navbar-style-ui" variant = "dark">
                <Navbar.Brand href="#home">
                    <img src="/WebApp-ITAEats/ITAEats-app/resources/images/ITAEatsLogo.png" width = "70" heaight = "70" className = "d-inline-block align-top" alt=""/>{' '}
                    <Form.Label id="title-label">ITA-Eats</Form.Label>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as = {Link} to = "/WebApp-ITAEats/ITAEats-app/public/inicio/alumno" className="link-style" id="navbar-opciones"> <RiRestaurantLine /> Inicio </Nav.Link>
                        <Nav.Link as = {Link} to = "/WebApp-ITAEats/ITAEats-app/public/inicio/alumno/perfil" className="link-style" id="navbar-opciones"><RiUserLine /> Perfil</Nav.Link>
                        <Nav.Link href="#cerrar" className="link-style" id="cerrar-sesion">Cerrar sesión <FiLogOut/> </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
            
            
        </>
    );
};

export default NavbarComponent;