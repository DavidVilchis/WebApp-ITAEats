import React from 'react';
import Navbar from './NavbarHome';
import BodyLogin from './BodyLogin_Alumno';
function LoginAlumno(){
    return(
        <>
            <Navbar />
            <BodyLogin />
        </>
    );
}

export default LoginAlumno;

if (document.getElementById('loginAlumno')) {
    ReactDOM.render(<LoginAlumno />, document.getElementById('loginAlumno'));
}