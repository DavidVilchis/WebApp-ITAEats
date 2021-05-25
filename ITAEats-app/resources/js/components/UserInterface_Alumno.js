import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_Alumno';
import '../../css/app.css';
import { useHistory } from 'react-router-dom'
function AlumnoPage() {
    let history = useHistory();
    const login = () => {
        history.push("/WebApp-ITAEats/ITAEats-app/public/login");
    }
    console.log(localStorage.getItem('numeroDeControl'));
    if(localStorage.getItem('numeroDeControl') != null){
        return (
            <>
                <BodyUI />
            </>
        );
    }
    else{
        return (
            <>
            {login()}
            </>
        );
    }
}

export default AlumnoPage;

if (document.getElementById('alumnoPage')) {
    ReactDOM.render(<AlumnoPage />, document.getElementById('alumnoPage'));
}
