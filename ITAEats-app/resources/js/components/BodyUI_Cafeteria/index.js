import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
import '../../../css/BodyUIStyle.css';
import { Toast, Button, Modal, Form, Table } from 'react-bootstrap';
import Axios from 'axios';

const BodyUI = () => {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        handleAll();
        setShowAdd(true);
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => {
        setShowDelete(false);
        setTablaDelete([]);
    }
    const handleShowDelete = () => setShowDelete(true);

    const [showDialogConfirm, setShowDialogConfirm] = useState(false);
    const handleCloseDialogConfirm = () => setShowDialogConfirm(false);
    const handleShowDialogConfirm = () => {
        if (tablaDelete != []) {
            setShowDialogConfirm(true);
        }
    }

    const [showToastUpdate, setShowToastUpdate] = useState(false);
    const [showToastAdd, setShowToastAdd] = useState(false);
    const [showToastDelete, setShowToastDelete] = useState(false);
    const [showToastErrorAdd, setShowToastErrorAdd] = useState(false);
    const [showToastErrorSearch, setShowToastErrorSearch] = useState(false);
    const [showToastErrorSend, setShowToastErrorSend] = useState(false);
    

    const [data, setData] = useState({
        idDePlatillo: '',
        numeroDeControl: '',
    })
    const [dataEdit, setDataEdit] = useState({
        idDePlatillo: '',
        numeroDeControl: '',
    })

    const [tabla, setTabla] = useState([]);
    const [tablaDelete, setTablaDelete] = useState([]);
    const [tablaPlatillos, setTablaPlatillos] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/pedidos'
            })
                .then(response => {
                    console.log('response.data', response.data)
                    setTabla(response.data);
                })
            console.log(data)
        })();
    }, []);

    const handleAll = async (e) => {
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/mostrarPlatillos'
        })
            .then(response => {
                console.log('response.data', response.data)
                setTablaPlatillos(response.data);
            })
            .catch(error => {
                console.log("Error ", error);
            })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(data.idDePlatillo);
        console.log(data.numeroDeControl);
        if (data.idDePlatillo != "" && data.numeroDeControl != "") {
            await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarAlumnos?numeroDeControl=' + data.numeroDeControl
            })
                .then(response => {
                    if (response.data[0]["numeroDeControl"] != "") {
                        formData.append('numeroDeControl', response.data[0]["numeroDeControl"]);
                        formData.append('idDePlatillo', data.idDePlatillo);
                        Axios({
                            method: 'post',
                            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/nuevoPedido',
                            data: formData,
                            config: { headers: { 'Content-Type': 'multipart/form-data' } }
                        })
                            .then(response => {
                                if (response.data.success == true) {
                                    console.log("Se agrego");
                                    setData({
                                        idDePlatillo: '',
                                        numeroDeControl: ''
                                    })
                                    setShowToastAdd(true);
                                    handleCloseAdd();
                                }
                            })
                            .catch(error => {
                                console.log('Error Login', error)
                            })
                    }
                })
                .catch(error => {
                    setShowToastErrorSearch(true);
                })
        }
        else {
            setShowToastErrorAdd(true);
        }
    }
    const handleSearchDelete = async (e) => {
        e.preventDefault();
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarPedidoNumeroDeControl?numeroDeControl=' + dataEdit.numeroDeControl
        })
            .then(response => {
                console.log('response.data', response.data)
                setTablaDelete(response.data);
            })
            .catch(error => {
                console.log("Error ", error);
            })
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (dataEdit.idDePlatillo != "" && tablaDelete != []) {
            formData.append('numeroDeControl', tablaDelete[0]["numeroDeControl"]);
            formData.append('idDePlatillo', dataEdit.idDePlatillo);
            await Axios({
                method: 'post',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/entregarPedido',
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(response => {
                    if (response.data.success == true) {
                        console.log("Se borro");
                        handleCloseDialogConfirm();
                        handleCloseDelete();
                        setShowToastDelete(true)
                    }
                })
                .catch(error => {
                    console.log('Error ', error)
                })
        }
        else{
            handleCloseDialogConfirm();
            setShowToastErrorSend(true);
        }
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
    return (
        <>
            <NavbarUI />
            <center>
                <br />
                <Toast onClose={() => setShowToastUpdate(false)} show={showToastUpdate} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Actualización de pedido</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se actualizo correctamente el pedido!</Toast.Body>
                </Toast>
            </center>
            <center>
                <br />
                <Toast onClose={() => setShowToastAdd(false)} show={showToastAdd} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Nuevo pedido</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se agrego correctamente el pedido!</Toast.Body>
                </Toast>
            </center>
            <center>
                <br />
                <Toast onClose={() => setShowToastDelete(false)} show={showToastDelete} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Entrega de pedido al alumno</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se entrego el pedido al alumno!</Toast.Body>
                </Toast>
            </center>
            <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar nuevo pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formPlatillos">
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
                            <center>
                                <br />
                                <Toast onClose={() => setShowToastErrorSearch(false)} show={showToastErrorSearch} delay={1000} autohide>
                                    <Toast.Header>
                                        <strong className="mr-auto">¡Error!</strong>
                                    </Toast.Header>
                                    <Toast.Body>No se encuentra al alumno en la base de datos</Toast.Body>
                                </Toast>
                                <br />
                            </center>
                            <Form.Label>Platillos</Form.Label>
                            <Form.Control as="select" name="idDePlatillo" onChange={handleInputChange}>
                                <option>Seleccione un platillo</option>
                                {tablaPlatillos.map(dataItem => (
                                    <option key={dataItem.idDePlatillo} value={dataItem.idDePlatillo}>{dataItem.nombreDePlatillo}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formNumeroDeControl">
                            <Form.Label>Número de control</Form.Label>
                            <Form.Control type="input" name="numeroDeControl" onChange={handleInputChange} placeholder="Ingrese el número de control" />
                        </Form.Group>
                        <center>
                            <Button variant="danger" onClick={handleCloseAdd}>
                                Cancelar
                            </Button>{' '}
                            <Button variant="success" type="submit">
                                Generar nuevo pedido
                            </Button>
                        </center>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Entregar pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <center>
                            <br />
                            <Toast onClose={() => setShowToastErrorSend(false)} show={showToastErrorSend} delay={1000} autohide>
                                <Toast.Header>
                                    <strong className="mr-auto">¡Error!</strong>
                                </Toast.Header>
                                <Toast.Body>¡Verifique los campos!</Toast.Body>
                            </Toast>
                            <br />
                        </center>
                        <Form.Group controlId="formBuscarPlatillo">
                            <Form.Label>Buscar alumno</Form.Label>
                            <Form.Control type="input" name="numeroDeControl" onChange={handleEditChange} placeholder="Ingrese el número de control" />
                            <br />
                            <Button variant="primary" onClick={handleSearchDelete} >Buscar</Button>
                        </Form.Group>
                    </Form>
                    <Form.Control as="select" name="idDePlatillo" onChange={handleEditChange}>
                        <option>Seleccione un pedido</option>
                        {tablaDelete.map(dataItem => (
                            <option key={dataItem.idDePlatillo} value={dataItem.idDePlatillo}>{dataItem.nombreDePlatillo}</option>
                        ))}
                    </Form.Control>
                    <center>
                        <br />
                        <Button variant="danger" onClick={handleCloseDelete}>
                            Cancelar
                        </Button>{' '}
                        <Button variant="outline-success" type="button" onClick={handleShowDialogConfirm}>
                            Entregar pedido
                        </Button>
                    </center>
                </Modal.Body>
            </Modal>
            <Modal centered size="sm" show={showDialogConfirm} onHide={handleCloseDialogConfirm} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Está seguro de entregar este pedido?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Button variant="danger" onClick={handleCloseDialogConfirm} block>No</Button>{' '}
                        <Button variant="success" onClick={handleDelete} block>Si</Button>
                    </center>
                </Modal.Body>
            </Modal>
            <div className="container" id="body-style">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Tabla de pedidos</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Button variant="success" onClick={handleShowAdd} block>Nuevo Pedido</Button> {' '}
                            </div>
                            <div className="col-md-3">
                                <Button variant="outline-info" onClick={handleShowDelete} block>Entregar Pedido</Button> {' '}
                            </div>
                            <div className="col-md-3">
                                <Button variant="secondary" onClick={() => window.location.reload(false)} block>Refrescar</Button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th>ID de platillo</th>
                                        <th>Número de control</th>
                                        <th>Fecha</th>
                                        <th>Nombre del platillo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabla.map(dataItem => (
                                        <tr key={dataItem.idDePlatillo + " " + dataItem.numeroDeControl}>
                                            <td>{dataItem.idDePlatillo}</td>
                                            <td>{dataItem.numeroDeControl}</td>
                                            <td>{dataItem.created_at}</td>
                                            <td>{dataItem.nombreDePlatillo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BodyUI;