import React from 'react';
import ReactDOM from 'react-dom';
import BodyUI from './BodyUI_Alumno';
import '../../css/app.css';
function AlumnoPage() {
    return (
        <>
            <BodyUI />
        </>
    );
}

export default AlumnoPage;

if (document.getElementById('alumnoPage')) {
    ReactDOM.render(<AlumnoPage />, document.getElementById('alumnoPage'));
}
