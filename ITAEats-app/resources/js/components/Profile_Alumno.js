import React from 'react';
import ReactDOM from 'react-dom';
import BodyProfile from './BodyProfile_Alumno';
import '../../css/app.css';
function ProfileAlumnoPage() {
    return (
        <>
            <BodyProfile />
        </>
    );
}

export default ProfileAlumnoPage;

if (document.getElementById('profileAlumnoPage')) {
    ReactDOM.render(<ProfileAlumnoPage />, document.getElementById('profileAlumnoPage'));
}
