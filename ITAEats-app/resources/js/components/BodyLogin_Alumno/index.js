import React, { useState, useEffect } from 'react';
import { Image, CardColumns, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import Axios from 'axios';
import '../../../css/BodyLoginStyle.css';
const BodyUI = () => {
    const [alumno, setAlumno] = useState({
        numeroDeControl: '',
        password: ' '
    });

    const [data, setData] = useState([]);

    const handleInputChange = (e) =>{
        setAlumno({
            ...alumno,
            [e.target.name] : e.target.value
        })
    };

    const handleSearch = async (e) =>{
        e.preventDefault();
        const response = await Axios({
            method: 'get',
            url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/iniciarSesion?numeroDeControl=' + alumno.numeroDeControl
        })
        .then(response => {
            console.log('response.data', response.data)
            setData(response.data)
        })
        console.log(data)
    };

    return (
        <>
            <div className="container" id="container-style">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="title">Iniciar sesión</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <center>
                            <Image src="/WebApp-ITAEats/ITAEats-app/resources/images/user1.png" width="160" height="160" />
                        </center>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Form>
                            <Form.Group type="input" controlId="formNumeroDeControl">
                                <Form.Label>Número de control</Form.Label>
                                <Form.Control placeholder="Número de control" name="numeroDeControl" onChange = {handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" onChange = {handleInputChange} placeholder="Contraseña" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Button variant="success" onClick={handleSearch} block>Iniciar sesión</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BodyUI;