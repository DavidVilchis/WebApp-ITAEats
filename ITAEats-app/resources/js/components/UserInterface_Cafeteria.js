import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_Cafeteria';
import { useHistory } from 'react-router-dom';
import '../../css/app.css';
function CafeteriaPage() {
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

export default CafeteriaPage;

if (document.getElementById('cafeteriaPage')) {
    ReactDOM.render(<CafeteriaPage />, document.getElementById('cafeteriaPage'));
}
