import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
import '../../../css/BodyUIStyle.css';
import { CardColumns, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import Axios from 'axios';

const BodyUI = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        nombreDePlatillo: '',
        descripcionDePlatillo: '',
        precio: '',
        fotoDePlatillo: ''
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(data.nombreDePlatillo);
        console.log(data.descripcionDePlatillo);
        console.log(data.precio);
        console.log(selectedFile.name);
        /*formData.append('nombreDePlatillo', data.nombreDePlatillo)
        formData.append('descripcionDePlatillo', data.descripcionDePlatillo)
        formData.append('precio', data.precio)
        formData.append('fotoDePlatillo', data.fotoDePlatillo)
        await Axios({
            method: 'post',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/agregarPlatillo',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response=>{
            if(response.data.login == true){
                console.log("Se agrego");
            }
        })
        .catch(error => {
            console.log('Error Login', error)
        })*/
    }
    return (
        <>
            <NavbarUI />
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar nuevo platillo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombrePlatillo">
                            <Form.Label>Nombre del platillo</Form.Label>
                            <Form.Control type="input" name="nombreDePlatillo" onChange={handleInputChange} placeholder="Ingrese el nombre del platillo" />
                        </Form.Group>
                        <Form.Group controlId="formDescripcionDePlatillo">
                            <Form.Label>Descripcion del platillo</Form.Label>
                            <Form.Control type="textarea" name="descripcionDePlatillo" onChange={handleInputChange} placeholder="Ingrese una descripcion pequeña del platillo" />
                        </Form.Group>
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precio del platillo</Form.Label>
                            <Form.Control type="numbre" name="precio" onChange={handleInputChange} placeholder="0.0" />
                        </Form.Group>
                        <Form.Group controlId="formFileSelect">
                            <Form.File id="formControlFile" name="fotoDePlatillo" onChange={(e) => setSelectedFile(e.target.files[0])} label="Selecciona una foto del platillo" />
                        </Form.Group>
                        <center>
                            <Button variant="danger" onClick={handleClose}>
                                Cancelar
                            </Button>{' '}
                            <Button variant="success" type="submit">
                                Guardar cambios
                            </Button>
                        </center>
                    </Form>
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
                                <Button variant="success" onClick={handleShow} block>Nuevo platillo</Button>
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
                                        <th>fotoDePlatillo</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>$</td>
                                        <td>-</td>
                                        <td>
                                            <Button variant="primary">Editar</Button>{' '}
                                            <Button variant="danger">Borrar</Button>{' '}
                                        </td>
                                    </tr>
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