import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_MenuCafeteria';
import '../../css/app.css';
function MenuCafeteriaPage() {
    return (
        <>
            <BodyUI />
        </>
    );
}

export default MenuCafeteriaPage;

if (document.getElementById('menuCafeteriaPage')) {
    ReactDOM.render(<MenuCafeteriaPage />, document.getElementById('menuCafeteriaPage'));
}
