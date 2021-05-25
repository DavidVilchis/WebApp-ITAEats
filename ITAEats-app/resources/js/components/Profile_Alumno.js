import React from 'react';
import ReactDOM from 'react-dom';
import BodyProfile from './BodyProfile_Alumno';
import '../../css/app.css';
import { useHistory } from 'react-router-dom'
function ProfileAlumnoPage() {
    let history = useHistory();
    const login = () => {
        history.push("/WebApp-ITAEats/ITAEats-app/public/login");
    }
    console.log(localStorage.getItem('numeroDeControl'));
    if(localStorage.getItem('numeroDeControl') != null){
        return (
            <>
                <BodyProfile />
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

export default ProfileAlumnoPage;

if (document.getElementById('profileAlumnoPage')) {
    ReactDOM.render(<ProfileAlumnoPage />, document.getElementById('profileAlumnoPage'));
}
