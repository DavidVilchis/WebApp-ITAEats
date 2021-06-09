import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
import '../../../css/BodyUIStyle.css';
import { Toast, Image, Button, Modal, Form, Table, Container, Row, Col } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import Axios from 'axios';

const BodyUI = () => {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => {
        setShowUpdate(false);
        setTablaEdit([]);
        setSelectedFileEdit(null);
    }
    const handleShowUpdate = (idDePlatillo) => {
        dataEdit.idDePlatillo = idDePlatillo;
        handleSearch();
        setShowUpdate(true);
    }


    const [showDialogConfirm, setShowDialogConfirm] = useState(false);
    const handleCloseDialogConfirm = () => setShowDialogConfirm(false);
    const handleShowDialogConfirm = (idDePlatillo) => {
        dataEdit.idDePlatillo = idDePlatillo;
        console.log(dataEdit.idDePlatillo);
        setShowDialogConfirm(true);
    }

    const [showToastUpdate, setShowToastUpdate] = useState(false);
    const [showToastAdd, setShowToastAdd] = useState(false);
    const [showToastDelete, setShowToastDelete] = useState(false);
    const [showToastErrorAdd, setShowToastErrorAdd] = useState(false);

    const [data, setData] = useState({
        nombreDePlatillo: '',
        descripcionDePlatillo: '',
        precio: '',
        fotoDePlatillo: ''
    })
    const [dataEdit, setDataEdit] = useState({
        idDePlatillo: '',
        nombreDePlatillo: '',
        descripcionDePlatillo: '',
        precio: '',
        fotoDePlatillo: ''
    })
    const [dataSearch, setDataSearch] = useState({
        nombrePlatilloBuscar: ''
    })

    const [tabla, setTabla] = useState([]);
    const [tablaEdit, setTablaEdit] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileEdit, setSelectedFileEdit] = useState(null);


    useEffect(() => {
        (async () => {
            const response = await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/mostrarPlatillos'
            })
                .then(response => {
                    console.log('response.data', response.data)
                    setTabla(response.data);
                })
            console.log(data)
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (data.nombreDePlatillo != "" && data.descripcionDePlatillo != "" && data.precio != "" && selectedFile != null) {
            formData.append('nombreDePlatillo', data.nombreDePlatillo)
            formData.append('descripcionDePlatillo', data.descripcionDePlatillo)
            formData.append('precio', data.precio)
            formData.append('fotoDePlatillo', selectedFile.name)
            await Axios({
                method: 'post',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/agregarPlatillo',
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(response => {
                    console.log("Se agrego");
                    setData({
                        nombreDePlatillo: '',
                        descripcionDePlatillo: '',
                        precio: '',
                        fotoDePlatillo: ''
                    })
                    setShowToastAdd(true);
                    setTabla(response.data);
                })
                .catch(error => {
                    console.log('Error Login', error)
                })
        }
        else {
            setShowToastErrorAdd(true);
            handleShowAdd(true);
        }
    }
    const handleSearchNombreDePlatillo = async (e) => {
        e.preventDefault();
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarPlatilloNombre?nombreDePlatillo=' + dataSearch.nombrePlatilloBuscar
        })
            .then(response => {
                setTabla(response.data);
            })
            .catch(error => {
                console.log("Error ", error);
            })
    }
    const handleSearch = async (e) => {
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarPlatillo?idDePlatillo=' + dataEdit.idDePlatillo
        })
            .then(response => {
                console.log('response.data', response.data)
                console.log('response.data.fotoDePlatillo', response.data[0]["fotoDePlatillo"])
                setTablaEdit(response.data);
            })
            .catch(error => {
                console.log("Error ", error);
            })
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('idDePlatillo', dataEdit.idDePlatillo);
        await Axios({
            method: 'post',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/borrarPlatillo',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                console.log("Se borro");
                handleCloseDialogConfirm();
                setShowToastDelete(true);
                setTabla(response.data);
            })
            .catch(error => {
                console.log('Error ', error)
            })

    }
    const handleEdit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        dataEdit.idDePlatillo = tablaEdit[0]["idDePlatillo"];
        if (dataEdit.nombreDePlatillo == "") {
            dataEdit.nombreDePlatillo = tablaEdit[0]["nombreDePlatillo"];
        }
        if (dataEdit.descripcionDePlatillo == "") {
            dataEdit.descripcionDePlatillo = tablaEdit[0]["descripcionDePlatillo"];
        }
        if (dataEdit.precio == "") {
            dataEdit.precio = tablaEdit[0]["precio"];
        }
        if (selectedFileEdit == null) {
            dataEdit.fotoDePlatillo = tablaEdit[0]["fotoDePlatillo"]
        }
        else {
            dataEdit.fotoDePlatillo = selectedFileEdit.name;
        }
        formData.append('idDePlatillo', dataEdit.idDePlatillo)
        formData.append('nombreDePlatillo', dataEdit.nombreDePlatillo)
        formData.append('descripcionDePlatillo', dataEdit.descripcionDePlatillo)
        formData.append('precio', dataEdit.precio)
        formData.append('fotoDePlatillo', dataEdit.fotoDePlatillo)
        await Axios({
            method: 'post',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/editarPlatillo',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                setTabla(response.data);
                console.log("Se actualizo");
                handleCloseUpdate();
                setShowToastUpdate(true)
            })
            .catch(error => {
                console.log('Error ', error)
            })
    }

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleEditChange = (e) => {
        setDataEdit({
            ...dataEdit,
            [e.target.name]: e.target.value
        })
    }
    const handleSearchChange = async (e) => {
        setDataSearch({
            ...dataSearch,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <NavbarUI />
            <center>
                <br />
                <Toast onClose={() => setShowToastUpdate(false)} show={showToastUpdate} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Actualización de platillo</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se actualizo correctamente el platillo!</Toast.Body>
                </Toast>
            </center>
            <center>
                <br />
                <Toast onClose={() => setShowToastAdd(false)} show={showToastAdd} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Nuevo de platillo</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se agrego correctamente el platillo!</Toast.Body>
                </Toast>
            </center>
            <center>
                <br />
                <Toast onClose={() => setShowToastDelete(false)} show={showToastDelete} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Eliminar platillo</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se borro correctamente el platillo!</Toast.Body>
                </Toast>
            </center>
            <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar nuevo platillo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombrePlatillo">
                            <center>
                                <br />
                                <Toast onClose={() => setShowToastErrorAdd(false)} show={showToastErrorAdd} delay={1000} autohide>
                                    <Toast.Header>
                                        <strong className="mr-auto">¡Error!</strong>
                                    </Toast.Header>
                                    <Toast.Body>Revise que los campos que no esten vacíos</Toast.Body>
                                </Toast>
                                <br />
                            </center>
                            <Form.Label>Nombre del platillo</Form.Label>
                            <Form.Control type="input" name="nombreDePlatillo" onChange={handleInputChange} placeholder="Ingrese el nombre del platillo" />
                        </Form.Group>
                        <Form.Group controlId="formDescripcionDePlatillo">
                            <Form.Label>Descripcion del platillo</Form.Label>
                            <Form.Control as="textarea" rows={3} name="descripcionDePlatillo" onChange={handleInputChange} placeholder="Ingrese una descripcion pequeña del platillo" />
                        </Form.Group>
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precio del platillo</Form.Label>
                            <Form.Control type="input" name="precio" onChange={handleInputChange} placeholder="0.0" />
                        </Form.Group>
                        <Form.Group controlId="formFileSelect">
                            <Form.File id="formControlFile" name="fotoDePlatillo" onChange={(e) => setSelectedFile(e.target.files[0])} label="Selecciona una foto del platillo" />
                        </Form.Group>
                        <center>
                            <Button variant="danger" onClick={handleCloseAdd}>
                                Cancelar
                            </Button>{' '}
                            <Button variant="success" type="submit" onClick={handleCloseAdd}>
                                Guardar cambios
                            </Button>
                        </center>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar platillo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tablaEdit.map(dataItem => (
                        <Form key={dataItem.idDePlatillo}>
                            <Form.Group controlId="formNombrePlatillo">
                                <Form.Label>Nombre del platillo</Form.Label>
                                <Form.Control type="input" name="nombreDePlatillo" onChange={handleEditChange} defaultValue={dataItem.nombreDePlatillo} />
                            </Form.Group>
                            <Form.Group controlId="formDescripcionDePlatillo">
                                <Form.Label>Descripcion del platillo</Form.Label>
                                <Form.Control as="textarea" rows={3} name="descripcionDePlatillo" defaultValue={dataItem.descripcionDePlatillo} onChange={handleEditChange} />
                            </Form.Group>
                            <Form.Group controlId="formPrecio">
                                <Form.Label>Precio del platillo</Form.Label>
                                <Form.Control type="input" name="precio" onChange={handleEditChange} defaultValue={dataItem.precio} />
                            </Form.Group>
                            <Form.Group controlId="formFileSelect">
                                <Form.File id="formControlFile" name="fotoDePlatillo" onChange={(e) => setSelectedFileEdit(e.target.files[0])} label="Selecciona una foto del platillo" />
                            </Form.Group>
                            <center>
                                <Button variant="danger" onClick={handleCloseUpdate}>
                                    Cancelar
                            </Button>{' '}
                                <Button variant="success" type="button" onClick={handleEdit}>
                                    Guardar cambios
                            </Button>
                            </center>
                        </Form>
                    ))}
                </Modal.Body>
            </Modal>
            <Modal centered size="sm" show={showDialogConfirm} onHide={handleCloseDialogConfirm} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Está seguro de eliminar el registro?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Button variant="danger" onClick={handleCloseDialogConfirm} block>No</Button>{' '}
                        <Button variant="success" onClick={handleDelete} block>Si</Button>
                    </center>
                </Modal.Body>
            </Modal>
            <Container id="body-style">
                <Row>
                    <Col md="12">
                        <Row>
                            <Col md="12">
                                <h1>Menú de cafetería</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <Button variant="success" onClick={handleShowAdd} block>Nuevo platillo</Button> {' '}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="3">
                                <Form>
                                    <Form.Group controlId="buscarNombre">
                                        <Form.Control variant="input" name="nombrePlatilloBuscar" onChange={handleSearchChange} placeholder="Buscar nombre del platillo" />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md="6">
                                <Button variant="primary" onClick={handleSearchNombreDePlatillo}>Buscar</Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th>Nombre del platillo</th>
                                        <th>Descripción del platillo</th>
                                        <th>Precio</th>
                                        <th>Foto de platillo</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabla.map(dataItem => (
                                        <tr key={dataItem.idDePlatillo}>
                                            <td>{dataItem.nombreDePlatillo}</td>
                                            <td>{dataItem.descripcionDePlatillo}</td>
                                            <td>${dataItem.precio}</td>
                                            <td>
                                                <Image src={"/WebApp-ITAEats/ITAEats-app/resources/images/Platillos/" + dataItem.fotoDePlatillo} width={150} />
                                            </td>
                                            <td>
                                                <Button variant="primary" block onClick={() => handleShowUpdate(dataItem.idDePlatillo)}><FiEdit/> Editar</Button> {'  '}
                                                <Button variant="danger" block onClick={() => handleShowDialogConfirm(dataItem.idDePlatillo)}><AiFillDelete/> Borrar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BodyUI;