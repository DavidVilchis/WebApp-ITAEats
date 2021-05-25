import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
import '../../../css/BodyUIStyle.css';
import { Toast, Image, Button, Modal, Form, Table } from 'react-bootstrap';
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

    const [tabla, setTabla] = useState([]);
    const [tablaEdit, setTablaEdit] = useState([]);
    const [tablaDelete, setTablaDelete] = useState([]);

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
                    if (response.data.success == true) {
                        console.log("Se agrego");
                        setData({
                            nombreDePlatillo: '',
                            descripcionDePlatillo: '',
                            precio: '',
                            fotoDePlatillo: ''
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
    const handleSearchDelete = async (e) => {
        e.preventDefault();
        await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarPlatillo?idDePlatillo=' + dataEdit.idDePlatillo
        })
            .then(response => {
                console.log('response.data', response.data)
                console.log('response.data.fotoDePlatillo', response.data[0]["fotoDePlatillo"])
                setTablaDelete(response.data);
            })
            .catch(error => {
                console.log("Error ", error);
            })
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('idDePlatillo', tablaDelete[0]["idDePlatillo"]);
        await Axios({
            method: 'post',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/borrarPlatillo',
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
                    <Form>
                        <Form.Group controlId="formBuscarPlatillo">
                            <Form.Label>Buscar platillo</Form.Label>
                            <Form.Control type="input" name="idDePlatillo" onChange={handleEditChange} placeholder="Ingrese el ID de platillo" />
                            <br />
                            <Button variant="primary" onClick={handleSearch} >Buscar</Button>
                        </Form.Group>
                    </Form>
                    {tablaEdit.map(dataItem => (
                        <Form key={dataItem.idDePlatillo}>
                            <Form.Group controlId="formNombrePlatillo">
                                <Form.Label>Nombre del platillo</Form.Label>
                                <Form.Control type="input" name="nombreDePlatillo" onChange={handleEditChange} placeholder={dataItem.nombreDePlatillo} />
                            </Form.Group>
                            <Form.Group controlId="formDescripcionDePlatillo">
                                <Form.Label>Descripcion del platillo</Form.Label>
                                <Form.Control as="textarea" rows={3} name="descripcionDePlatillo" placeholder={dataItem.descripcionDePlatillo} onChange={handleEditChange} />
                            </Form.Group>
                            <Form.Group controlId="formPrecio">
                                <Form.Label>Precio del platillo</Form.Label>
                                <Form.Control type="input" name="precio" onChange={handleEditChange} placeholder={dataItem.precio} />
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
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar platillo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBuscarPlatillo">
                            <Form.Label>Buscar platillo</Form.Label>
                            <Form.Control type="input" name="idDePlatillo" onChange={handleEditChange} placeholder="Ingrese el ID de platillo" />
                            <br />
                            <Button variant="primary" onClick={handleSearchDelete} >Buscar</Button>
                        </Form.Group>
                    </Form>
                    {tablaDelete.map(dataItem => (
                        <Form key={dataItem.idDePlatillo}>
                            <Form.Group controlId="formNombrePlatillo">
                                <Form.Label>Nombre del platillo</Form.Label>
                                <Form.Control type="input" name="nombreDePlatillo" disabled value={dataItem.nombreDePlatillo} />
                            </Form.Group>
                            <Form.Group controlId="formDescripcionDePlatillo">
                                <Form.Label>Descripcion del platillo</Form.Label>
                                <Form.Control as="textarea" rows={3} name="descripcionDePlatillo" disabled value={dataItem.descripcionDePlatillo} onChange={handleEditChange} />
                            </Form.Group>
                            <Form.Group controlId="formPrecio">
                                <Form.Label>Precio del platillo</Form.Label>
                                <Form.Control type="input" name="precio" disabled value={dataItem.precio} />
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
                                <h1>Menú de cafetería</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Button variant="success" onClick={handleShowAdd} block>Nuevo platillo</Button> {' '}
                            </div>
                            <div className="col-md-3">
                                <Button variant="primary" onClick={handleShowUpdate} block>Editar platillo</Button> {' '}
                            </div>
                            <div className="col-md-3">
                                <Button variant="danger" onClick={handleShowDelete} block>Borrar platillo</Button> {' '}
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
                                        <th>Id. Platillo</th>
                                        <th>Nombre del platillo</th>
                                        <th>Descripción del platillo</th>
                                        <th>Precio</th>
                                        <th>Foto de platillo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabla.map(dataItem => (
                                        <tr key={dataItem.idDePlatillo}>
                                            <td>{dataItem.idDePlatillo}</td>
                                            <td>{dataItem.nombreDePlatillo}</td>
                                            <td>{dataItem.descripcionDePlatillo}</td>
                                            <td>{dataItem.precio}</td>
                                            <td>
                                                <Image src={"/WebApp-ITAEats/ITAEats-app/resources/images/Platillos/" + dataItem.fotoDePlatillo} width={150} />
                                            </td>
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