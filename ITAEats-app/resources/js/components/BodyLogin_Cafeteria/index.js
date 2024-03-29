import React, { useState } from 'react';
import { Image, Button, Form, Container, Col, Row } from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import '../../../css/BodyLoginStyle.css';
const BodyUI = () => {

    const [usuario, setUsuario] = useState({
        usuario: '',
        password: ''
    });

    let history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/iniciarSesion?usuario=' + usuario.usuario + '&password=' + usuario.password + '&tipoUsuario=cafeteria'
        })
            .then(response => {
                console.log('response.data', response.data)
                if (response.data != "") {
                    localStorage.setItem('usuario', response.data[0]['usuario']);
                    history.push("/WebApp-ITAEats/ITAEats-app/public/inicio/cafeteria");
                }
            })
    }

    const handleInputChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <Container id="container-style">
                <Row>
                    <div className="col-md-12">
                        <h1 className="title">Iniciar sesión / Cafetería</h1>
                    </div>
                </Row>
                <Row>
                    <Col md="12">
                        <center>
                            <Image src="/WebApp-ITAEats/ITAEats-app/resources/images/user1.png" width="160" height="160" />
                        </center>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form>
                            <Form.Group type="input" controlId="formNumeroDeControl">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control placeholder="Usuario" name="usuario" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Contraseña" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Button variant="success" onClick={handleSearch} block>Iniciar sesión</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BodyUI;