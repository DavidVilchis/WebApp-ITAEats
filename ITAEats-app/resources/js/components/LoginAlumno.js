import React from 'react';
import Navbar from './NavbarHome';
import BodyLogin from './BodyLogin_Alumno';
import { useHistory } from 'react-router-dom'
function LoginAlumno(){
    let history = useHistory();
    const UI = () => {
        history.push("/WebApp-ITAEats/ITAEats-app/public/inicio/alumno");
    }
    console.log(localStorage.getItem('numeroDeControl'));
    if(localStorage.getItem('numeroDeControl') != null){
        return (
            <>
                {UI()}
            </>
        );
    }
    else{
        return(
            <>
               <Navbar />
               <BodyLogin />
            </>
        );
    }

}

export default LoginAlumno;

if (document.getElementById('loginAlumno')) {
    ReactDOM.render(<LoginAlumno />, document.getElementById('loginAlumno'));
}