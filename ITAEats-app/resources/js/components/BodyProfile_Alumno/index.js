import React, { useState, useEffect } from 'react';
import NavbarUI from '../NavbarUI';
import '../../../css/BodyProfileStyle.css';
import { Table, Image, Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';

const BodyProfile = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await Axios({
                method: 'get',
                url: 'http://localhost/WebApp-ITAEats/ITAEats-app/public/api/buscarAlumnos?numeroDeControl=' + localStorage.getItem('numeroDeControl')
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
            <Container id="body-style">
                <h1>Perfil</h1>
                <br /><br />
                <Row>
                    <Col md="6">
                        <Image src="/WebApp-ITAEats/ITAEats-app/resources/images/LogoTecNM.png" fluid />
                    </Col>
                    <Col md="6" pd="5">
                        {data.map(dataItem => (
                            <Table variant="dark" size="sm" key={dataItem.numeroDeControl}>
                                <thead>
                                    <tr>
                                        <th colSpan="2"><center>DATOS DEL USUARIO</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Número de control:</th>
                                        <td>{dataItem.numeroDeControl}</td>
                                    </tr>
                                    <tr>
                                        <th>Nombre(s):</th>
                                        <td>{dataItem.nombres}</td>
                                    </tr>
                                    <tr>
                                        <th>Apellido paterno:</th>
                                        <td>{dataItem.apellidoPaterno}</td>
                                    </tr>
                                    <tr>
                                        <th>Apellido materno:</th>
                                        <td>{dataItem.apellidoMaterno}</td>
                                    </tr>
                                    <tr>
                                        <th>Carrera:</th>
                                        <td>{dataItem.claveCarrera}</td>
                                    </tr>
                                    <tr>
                                        <th>Beca alimenticia:</th>
                                        <td>{dataItem.becaAlimenticia}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BodyProfile;