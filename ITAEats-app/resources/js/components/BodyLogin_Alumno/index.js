import React, { useState } from 'react';
import { Image, Toast, Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import '../../../css/BodyLoginStyle.css';
const BodyUI = () => {

    const [showToastAdd, setShowToastAdd] = useState(false);
    const [showToastErroPass, setShowToastErroPass] = useState(false);
    const [showToastErroUser, setShowToastErroUser] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => {
        setDataRegister({
            numeroDeControl: '',
            password: ''
        });
        setTabla([]);
        setShowAdd(false);
    }
    const handleShowAdd = () => setShowAdd(true);

    const [tabla, setTabla] = useState([]);
    const [alumno, setAlumno] = useState({
        numeroDeControl: '',
        password: ''
    });
    const [dataRegister, setDataRegister] = useState({
        numeroDeControl: '',
        password: ''
    });

    let history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/iniciarSesion?usuario=' + alumno.numeroDeControl + '&password=' + alumno.password + '&tipoUsuario=alumno'
        })
            .then(response => {
                console.log('response.data', response.data)
                if(response.data != ""){
                    localStorage.setItem('numeroDeControl', response.data[0]['usuario']);
                    history.push("/WebApp-ITAEats/ITAEats-app/public/inicio/alumno");
                }
            })
    }

    const handleSearchRegister = async (e) => {
        e.preventDefault();
        console.log(dataRegister.numeroDeControl);
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarAlumnos?numeroDeControl=' + dataRegister.numeroDeControl
        })
            .then(response => {
                setTabla(response.data);
            })
            .catch(error => {
                console.log('Error Login', error)
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(dataRegister.password);
        if (dataRegister.password != "") {
            await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarUsuario?usuario=' + tabla[0]['numeroDeControl']
            })
                .then(response => {
                    if (response.data == "") {
                        formData.append('usuario', tabla[0]['numeroDeControl'])
                        formData.append('password', dataRegister.password)
                        formData.append('tipoUsuario', "alumno")
                        Axios({
                            method: 'post',
                            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/nuevoUsuario',
                            data: formData,
                            config: { headers: { 'Content-Type': 'multipart/form-data' } }
                        })
                            .then(response => {
                                if (response.data.success == true) {
                                    console.log("Se agrego");
                                    setDataRegister({
                                        numeroDeControl: '',
                                        password: ' '
                                    })
                                    handleCloseAdd();
                                    setShowToastAdd(true);
                                }
                            })
                            .catch(error => {
                                console.log('Error Login', error)
                            })
                    }
                    else{
                        setShowToastErroUser(true);
                    }
                })
        }
        else {
            setShowToastErroPass(true);
        }
    }

    const handleEditChange = (e) => {
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value
        })
    }
    const handleInputChange = (e) => {
        setAlumno({
            ...alumno,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <center>
                <br />
                <Toast onClose={() => setShowToastAdd(false)} show={showToastAdd} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Nuevo usuario</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se agrego correctamente el usuario!</Toast.Body>
                </Toast>
                <br />
            </center>
            <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar nuevo usuario/alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Toast onClose={() => setShowToastErroPass(false)} show={showToastErroPass} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">¡Error!</strong>
                            </Toast.Header>
                            <Toast.Body>Ingresa una contrasña, única. Sigue los buenos pasos de la seguridad</Toast.Body>
                        </Toast>
                        <br />
                    </center>
                    <center>
                        <Toast onClose={() => setShowToastErroUser(false)} show={showToastErroUser} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">¡Error!</strong>
                            </Toast.Header>
                            <Toast.Body>Este usuario ¡Ya existe!</Toast.Body>
                        </Toast>
                        <br />
                    </center>
                    <Form>
                        <Form.Group controlId="formBuscarPlatillo">
                            <Form.Label>Buscar alumno</Form.Label>
                            <Form.Control type="input" name="numeroDeControl" onChange={handleEditChange} placeholder="Ingrese el número de control" />
                            <br />
                            <Button variant="primary" onClick={handleSearchRegister} >Buscar</Button>
                        </Form.Group>
                    </Form>
                    {tabla.map(dataItem => (
                        <Form key={dataItem.numeroDeControl}>
                            <Form.Group controlId="formNombreCompleto">
                                <Form.Label>Nombre(s)</Form.Label>
                                <Form.Control type="input" name="nombres" onChange={handleEditChange} disabled value={dataItem.nombres} />
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="input" name="apellidoPaterno" onChange={handleEditChange} disabled value={dataItem.apellidoPaterno} />
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control type="input" name="apellidoMaterno" onChange={handleEditChange} disabled value={dataItem.apellidoMaterno} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Ingresar contraseña única</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleEditChange} />
                            </Form.Group>
                            <center>
                                <Button variant="danger" onClick={handleCloseAdd}>
                                    Cancelar
                                </Button>{' '}
                                <Button variant="success" onClick={handleSubmit} type="button">
                                    Guardar cambios
                                </Button>
                            </center>
                        </Form>
                    ))}
                </Modal.Body>
            </Modal>
            <Container id="container-style">
                <Row>
                    <Col md="12">
                        <h1 className="title">Iniciar sesión / Alumno</h1>
                    </Col>
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
                                <Form.Label>Número de control</Form.Label>
                                <Form.Control placeholder="Número de control" name="numeroDeControl" onChange={handleInputChange} />
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
                <br />
                <Row>
                    <Col md="12">
                        <center>
                            <Button variant="outline-dark" onClick={handleShowAdd} size="sm">Registrarse</Button>
                        </center>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BodyUI;