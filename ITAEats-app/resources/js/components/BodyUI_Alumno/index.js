import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI';
import { GiShoppingCart } from 'react-icons/gi';
import '../../../css/BodyUIStyle.css';
import { Toast, CardColumns, Card, Button, Modal, Form, Table, Container, Col, Row } from 'react-bootstrap';
import Axios from 'axios';

const BodyUI = () => {
    //Constantes para ver los registros
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({
        idDePlatillo: '',
        numeroDeControl: '',
    })

    const [showToastAdd, setShowToastAdd] = useState(false);
    const [showToastError, setShowToastError] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        if(dataEdit.idDePlatillo != ''){
            setShowAdd(true);
        }
        else{
            setShowToastError(true);
        }
    }

    const [tabla, setTabla] = useState([]);

    const handleEditChange = (e) => {
        setDataEdit({
            ...dataEdit,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (dataEdit.idDePlatillo != "") {
            formData.append('numeroDeControl', localStorage.getItem("numeroDeControl"));
            formData.append('idDePlatillo', dataEdit.idDePlatillo);
            await Axios({
                method: 'post',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/nuevoPedidoAlumno',
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(response => {
                    console.log("Se agrego");
                    setDataEdit({
                        idDePlatillo: '',
                        numeroDeControl: ''
                    })
                    setShowToastAdd(true);
                    handleCloseAdd();
                    setTabla(response.data);
                })
                .catch(error => {
                    console.log('Error Login', error)
                })
        }
        else {
            console.log(dataEdit.idDePlatillo);
        }
    }
    useEffect(() => {
        (async () => {
            const response = await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/mostrarPlatillos'
            })
                .then(response => {
                    console.log('response.data', response.data)
                    setData(response.data);
                })
            console.log(data)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarPedidoNumeroDeControl?numeroDeControl=' + localStorage.getItem("numeroDeControl")
            })
                .then(response => {
                    console.log('response.data', response.data)
                    setTabla(response.data);
                })
        })();
    }, []);
    return (
        <>
            <NavbarUI />
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
                <Toast onClose={() => setShowToastError(false)} show={showToastError} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">¡Error!</strong>
                    </Toast.Header>
                    <Toast.Body>¡Elije un platillo para generar un nuevo pedido!</Toast.Body>
                </Toast>
            </center>
            <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>¿Está seguro de confirmar el pedido?</Form.Label>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseAdd}>No</Button>{' '}
                    <Button variant="success" onClick={handleSubmit}>Si</Button>
                </Modal.Footer>
            </Modal>
            <Container id="body-style">
                <Row>
                    <Col md="6">
                        <Row>
                            <Col md="12">
                                <h1>Menú del día</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <CardColumns>
                                    {data.map(dataItem => (
                                        <Card border="dark" style={{ width: '10rem' }} key={dataItem.idDePlatillo}>
                                            <Card.Img variant="top" src={"/WebApp-ITAEats/ITAEats-app/resources/images/Platillos/" + dataItem.fotoDePlatillo} />
                                            <Card.Body>
                                                <Card.Title className="cards-title">{dataItem.nombreDePlatillo}</Card.Title>
                                                <Card.Text>
                                                    Precio: ${dataItem.precio}
                                                    <br />
                                                    {dataItem.descripcionDePlatillo}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </CardColumns>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col md="12">
                                <h2><GiShoppingCart id="icono" />Carrito de compra</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form>
                                    <Form.Group controlId="formBuscarPlatillo">
                                        <Form.Control as="select" onChange={handleEditChange} name="idDePlatillo">
                                            <option>Seleccione un platillo</option>
                                            {data.map(dataItem => (
                                                <option key={dataItem.idDePlatillo} value={dataItem.idDePlatillo}>{dataItem.nombreDePlatillo}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="5">
                                <Button variant="success" onClick={handleShowAdd} block>Generar nueva orden</Button>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row className="row justify-content-md-center">
                            <Col md="auto">
                                <Table striped bordered hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                            <th colSpan="3"><center>Pedidos del usuario</center></th>
                                        </tr>
                                        <tr>
                                            <th>Id. Platillo</th>
                                            <th>Nombre del platillo</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabla.map(dataItem => (
                                            <tr key={dataItem.idDePlatillo + " " +dataItem.numeroDeControl}>
                                                <td>{dataItem.idDePlatillo}</td>
                                                <td>{dataItem.nombreDePlatillo}</td>
                                                <td>{dataItem.created_at}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BodyUI;