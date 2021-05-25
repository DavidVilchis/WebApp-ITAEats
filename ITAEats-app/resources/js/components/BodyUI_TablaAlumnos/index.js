import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
import '../../../css/BodyUIStyle.css';
import { CardColumns, Card, Toast, Button, Modal, Form, Table } from 'react-bootstrap';
import Axios from 'axios';

const BodyUI = () => {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => {
        setShowUpdate(false);
        setTablaEdit([]);
    }
    const handleShowUpdate = () => setShowUpdate(true);

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

    const [data, setData] = useState({
        numeroDeControl: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        claveCarrera: ''
    })
    const [dataEdit, setDataEdit] = useState({
        numeroDeControl: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        claveCarrera: ''
    })

    const [tabla, setTabla] = useState([]);
    const [tablaEdit, setTablaEdit] = useState([]);
    const [tablaDelete, setTablaDelete] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/alumnos'
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
        if (data.numeroDeControl != "" && data.nombres != "" && data.apellidoPaterno != "" && data.apellidoMaterno != "" && data.claveCarrera != "") {
            formData.append('numeroDeControl', data.numeroDeControl)
            formData.append('nombres', data.nombres)
            formData.append('apellidoPaterno', data.apellidoPaterno)
            formData.append('apellidoMaterno', data.apellidoMaterno)
            formData.append('claveCarrera', data.claveCarrera)
            await Axios({
                method: 'post',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/nuevoAlumno',
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(response => {
                    if (response.data.success == true) {
                        console.log("Se agrego");
                        setData({
                            numeroDeControl: '',
                            nombres: '',
                            apellidoPaterno: '',
                            apellidoMaterno: '',
                            claveCarrera: ''
                        })
                        setShowToastAdd(true)
                    }
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
    const handleSearch = async (e) => {
        e.preventDefault();
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarAlumnos?numeroDeControl=' + dataEdit.numeroDeControl
        })
            .then(response => {
                console.log('response.data', response.data)
                setTablaEdit(response.data);
            })
            .catch(error => {
                console.log("Error ", error);
            })
    }
    const handleSearchDelete = async (e) => {
        e.preventDefault();
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarAlumnos?numeroDeControl=' + dataEdit.numeroDeControl
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
        formData.append('numeroDeControl', tablaDelete[0]["numeroDeControl"]);
        await Axios({
            method: 'post',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/borrarAlumno',
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
    const handleEdit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        dataEdit.numeroDeControl = tablaEdit[0]["numeroDeControl"];
        if (dataEdit.nombres == "") {
            dataEdit.nombres = tablaEdit[0]["nombres"];
        }
        if (dataEdit.apellidoPaterno == "") {
            dataEdit.apellidoPaterno = tablaEdit[0]["apellidoPaterno"];
        }
        if (dataEdit.apellidoMaterno == "") {
            dataEdit.apellidoMaterno = tablaEdit[0]["apellidoMaterno"];
        }
        if (dataEdit.claveCarrera == "") {
            dataEdit.claveCarrera = tablaEdit[0]["claveCarrera"];
        }
        formData.append('numeroDeControl', dataEdit.numeroDeControl)
        formData.append('nombres', dataEdit.nombres)
        formData.append('apellidoPaterno', dataEdit.apellidoPaterno)
        formData.append('apellidoMaterno', dataEdit.apellidoMaterno)
        formData.append('claveCarrera', dataEdit.claveCarrera)
        await Axios({
            method: 'post',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/editarAlumnos',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                if (response.data.success == true) {
                    console.log("Se actualizo");
                    handleCloseUpdate();
                    setShowToastUpdate(true)
                }
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
    return (
        <>
            <NavbarUI />
            <center>
                <br />
                <Toast onClose={() => setShowToastUpdate(false)} show={showToastUpdate} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Actualización de alumnos</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se actualizo correctamente el alumno!</Toast.Body>
                </Toast>
            </center>
            <center>
                <br />
                <Toast onClose={() => setShowToastAdd(false)} show={showToastAdd} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Nuevo alumno</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se agrego correctamente el alumno!</Toast.Body>
                </Toast>
            </center>
            <center>
                <br />
                <Toast onClose={() => setShowToastDelete(false)} show={showToastDelete} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Eliminar alumno</strong>
                    </Toast.Header>
                    <Toast.Body>¡Se borro correctamente al alumno!</Toast.Body>
                </Toast>
            </center>
            <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar nuevo alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNumeroDeControl">
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
                            <Form.Label>Número de control</Form.Label>
                            <Form.Control type="input" name="numeroDeControl" onChange={handleInputChange} placeholder="Ingrese el número de control del alumno" />
                        </Form.Group>
                        <Form.Group controlId="formNombreCompleto">
                            <Form.Label>Nombre(s)</Form.Label>
                            <Form.Control type="input" name="nombres" onChange={handleInputChange} placeholder="Ingrese unicamente los nombres" />
                            <Form.Label>Apellido paterno</Form.Label>
                            <Form.Control type="input" name="apellidoPaterno" onChange={handleInputChange} placeholder="Ingrese unicamente el apellido paterno" />
                            <Form.Label>Apellido materno</Form.Label>
                            <Form.Control type="input" name="apellidoMaterno" onChange={handleInputChange} placeholder="Ingrese unicamente el apellido materno" />
                        </Form.Group>
                        <Form.Group controlId="formClaveDeCarrera">
                            <Form.Label>Clave de carrera</Form.Label>
                            <Form.Control type="input" name="claveCarrera" onChange={handleInputChange} placeholder="Ingrese la clave de carrera" />
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
                    <Modal.Title>Editar Alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBuscarPlatillo">
                            <Form.Label>Buscar alumno</Form.Label>
                            <Form.Control type="input" name="numeroDeControl" onChange={handleEditChange} placeholder="Ingrese el número de control" />
                            <br />
                            <Button variant="primary" onClick={handleSearch} >Buscar</Button>
                        </Form.Group>
                    </Form>
                    {tablaEdit.map(dataItem => (
                        <Form key={dataItem.numeroDeControl}>
                            <Form.Group controlId="formNombreCompleto">
                                <Form.Label>Nombre(s)</Form.Label>
                                <Form.Control type="input" name="nombres" onChange={handleEditChange} placeholder={dataItem.nombres} />
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="input" name="apellidoPaterno" onChange={handleEditChange} placeholder={dataItem.apellidoPaterno} />
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control type="input" name="apellidoMaterno" onChange={handleEditChange} placeholder={dataItem.apellidoMaterno} />
                            </Form.Group>
                            <Form.Group controlId="formClaveDeCarrera">
                                <Form.Label>Clave de carrera</Form.Label>
                                <Form.Control type="input" name="claveCarrera" placeholder={dataItem.claveCarrera} onChange={handleEditChange} />
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
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBuscarPlatillo">
                            <Form.Label>Buscar alumno</Form.Label>
                            <Form.Control type="input" name="numeroDeControl" onChange={handleEditChange} placeholder="Ingrese el número de control" />
                            <br />
                            <Button variant="primary" onClick={handleSearchDelete} >Buscar</Button>
                        </Form.Group>
                    </Form>
                    {tablaDelete.map(dataItem => (
                        <Form key={dataItem.numeroDeControl}>
                            <Form.Group controlId="formNombreCompleto">
                                <Form.Label>Nombre(s)</Form.Label>
                                <Form.Control type="input" name="nombres" disabled onChange={handleEditChange} value={dataItem.nombres} />
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control type="input" name="apellidoPaterno" disabled onChange={handleEditChange} value={dataItem.apellidoPaterno} />
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control type="input" name="apellidoMaterno" disabled onChange={handleEditChange} value={dataItem.apellidoMaterno} />
                            </Form.Group>
                            <Form.Group controlId="formClaveDeCarrera">
                                <Form.Label>Clave de carrera</Form.Label>
                                <Form.Control type="input" name="claveCarrera" disabled value={dataItem.claveCarrera} onChange={handleEditChange} />
                            </Form.Group>
                            <center>
                                <Button variant="danger" onClick={handleCloseDelete}>
                                        Cancelar
                                </Button>{' '}
                                    <Button variant="warning" type="button" onClick={handleShowDialogConfirm}>
                                        Eliminar
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
            <div className="container" id="body-style">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Tabla de alumnos</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Button variant="success" onClick={handleShowAdd} block>Nuevo Alumno</Button> {' '}
                            </div>
                            <div className="col-md-3">
                                <Button variant="primary" onClick={handleShowUpdate} block>Editar Alumno</Button> {' '}
                            </div>
                            <div className="col-md-3">
                                <Button variant="danger" onClick={handleShowDelete} block>Borrar Alumno</Button> {' '}
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
                                        <th>Número de control</th>
                                        <th>Nombre completo</th>
                                        <th>Carrera</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabla.map(dataItem => (
                                        <tr key={dataItem.numeroDeControl}>
                                            <td>{dataItem.numeroDeControl}</td>
                                            <td>{dataItem.nombres + " " + dataItem.apellidoPaterno + " " + dataItem.apellidoMaterno}</td>
                                            <td>{dataItem.claveCarrera}</td>
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