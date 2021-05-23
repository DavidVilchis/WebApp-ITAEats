import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_Cafeteria';
import '../../css/app.css';
function CafeteriaPage() {
    return (
        <>
            <BodyUI />
        </>
    );
}

export default CafeteriaPage;

if (document.getElementById('cafeteriaPage')) {
    ReactDOM.render(<CafeteriaPage />, document.getElementById('cafeteriaPage'));
}
