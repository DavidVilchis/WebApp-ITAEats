import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI';
import { GiShoppingCart } from 'react-icons/gi';
import '../../../css/BodyUIStyle.css';
import { CardColumns, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import Axios from 'axios';

const BodyUI = () => {
    //Constantes para ver los registros
    const [data, setData] = useState([]);

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
    return (
        <>
            <NavbarUI />
            <div className="container" id="body-style">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Menú del día</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <CardColumns>
                                    {data.map(dataItem => (
                                        <Card border="dark" style={{ width: '10rem' }} key={dataItem.idDePlatillo}>
                                            <Card.Img variant="top" src={dataItem.fotoDePlatillo} />
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
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h2><GiShoppingCart id="icono" />Carrito de compra</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Form>
                                    <Form.Group controlId="formBuscarPlatillo">
                                        <Form.Control as="select">
                                            <option>Seleccione un platillo</option>
                                            {data.map(dataItem => (
                                                <option key={dataItem.idDePlatillo} value={dataItem.idDePlatillo}>{dataItem.nombreDePlatillo}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <Button variant="danger">Cancelar</Button>
                            </div>
                            <div className="col-md-auto">
                                <Button variant="success">Generar nueva orden</Button>
                            </div>
                        </div>
                        <br /><br/>
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <Table striped bordered hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Pedidos del usuario</th>
                                        </tr>
                                        <tr>
                                            <th>Id. Platillo</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BodyUI;