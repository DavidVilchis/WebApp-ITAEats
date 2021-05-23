import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
import { GiShoppingCart } from 'react-icons/gi';
import '../../../css/BodyUIStyle.css';
import { CardColumns, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import Axios from 'axios';

const BodyUI = () => {
    return (
        <>
            <NavbarUI />
            <div className="container" id="body-style">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Tabla de pedidos</h1>
                            </div>
                        </div>
                        <div className="row">
                        <Table striped bordered hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Id. Platillo</th>
                                            <th>Platillo</th>
                                            <th>Fecha</th>
                                            <th>Número de control</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>
                                                <Button variant="success" block>Entregado</Button>
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