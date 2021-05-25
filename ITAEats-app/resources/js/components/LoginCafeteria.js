import React from 'react';
import Navbar from './NavbarHome';
import BodyLogin from './BodyLogin_Cafeteria';
import { useHistory } from 'react-router-dom';
function LoginCafeteria(){
    let history = useHistory();
    const UI = () => {
        history.push("/WebApp-ITAEats/ITAEats-app/public/inicio/cafeteria");
    }

    if(localStorage.getItem('usuario') != null){
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

export default LoginCafeteria;

if (document.getElementById('loginCafeteria')) {
    ReactDOM.render(<LoginCafeteria />, document.getElementById('loginCafeteria'));
}