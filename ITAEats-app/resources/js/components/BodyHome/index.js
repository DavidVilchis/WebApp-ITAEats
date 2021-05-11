import React from 'react';
import '../../../css/BodyHomeStyle.css';
import {Jumbotron, Button} from 'react-bootstrap';
import Navbar from '../Navbar';
const BodyHome = () => {
    return(
        <>
        <div className='video-container'>
            <video className='video' src='/WebApp-ITAEats/ITAEats-app/resources/video/video-back.mp4' autoPlay loop muted/>
            <Navbar />
            <Jumbotron className="jumbotron">
            <h1 className = "header">¡Bienvenido!</h1>
            <p className = "text">
               No te quedes esperando con hambre, inicia una nueva experiencia con ITA-EATS.
            </p>
            <p>
                <Button variant="outline-light" className = "button-outline">Comenzar</Button>
            </p>
            </Jumbotron>
        </div>
        
        </>
    );
};

export default BodyHome;