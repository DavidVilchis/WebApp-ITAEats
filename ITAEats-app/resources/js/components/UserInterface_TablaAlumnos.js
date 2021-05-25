import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_TablaAlumnos';
import { useHistory } from 'react-router-dom';
import '../../css/app.css';
function TablaAlumnosPage() {
    let history = useHistory();
    const login = () => {
        history.push("/WebApp-ITAEats/ITAEats-app/public/login/cafeteria");
    }
    if(localStorage.getItem('usuario') != null){
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

export default TablaAlumnosPage;

if (document.getElementById('tablaAlumnosPage')) {
    ReactDOM.render(<TablaAlumnosPage />, document.getElementById('tablaAlumnosPage'));
}
