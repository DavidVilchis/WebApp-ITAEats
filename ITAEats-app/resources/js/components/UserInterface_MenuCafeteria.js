import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_MenuCafeteria';
import { useHistory } from 'react-router-dom';
import '../../css/app.css';
function MenuCafeteriaPage() {
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

export default MenuCafeteriaPage;

if (document.getElementById('menuCafeteriaPage')) {
    ReactDOM.render(<MenuCafeteriaPage />, document.getElementById('menuCafeteriaPage'));
}
