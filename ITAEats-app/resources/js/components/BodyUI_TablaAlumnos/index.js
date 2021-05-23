import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI_Cafeteria';
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
                                <h1>Tabla de alumnos</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Button variant="success" block>Nuevo Alumno</Button>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                        <Table striped bordered hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Número de control</th>
                                            <th>Nombre completo</th>
                                            <th>Carrera</th>
                                            <th>Beca alimenticia</th>
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