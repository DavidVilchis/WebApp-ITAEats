import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_TablaAlumnos';
import '../../css/app.css';
function TablaAlumnosPage() {
    return (
        <>
            <BodyUI />
        </>
    );
}

export default TablaAlumnosPage;

if (document.getElementById('tablaAlumnosPage')) {
    ReactDOM.render(<TablaAlumnosPage />, document.getElementById('tablaAlumnosPage'));
}
