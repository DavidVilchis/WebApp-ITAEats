import React from 'react';
import Navbar from './NavbarHome';
function LoginCafeteria(){
    return(
        <>
            <Navbar />
            <p>Cafetería</p>
        </>
    );
}

export default LoginCafeteria;

if (document.getElementById('loginCafeteria')) {
    ReactDOM.render(<LoginCafeteria />, document.getElementById('loginCafeteria'));
}