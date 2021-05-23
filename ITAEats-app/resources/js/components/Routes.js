import React from 'react';
import Home from './Home';
import AlumnoPage from './UserInterface_Alumno';
import LoginAlumno from './LoginAlumno';
import LoginCafeteria from './LoginCafeteria';
import ProfileAlumnoPage from "./Profile_Alumno";
import CafeteriaPage from './UserInterface_Cafeteria';
import MenuCafeteria from './UserInterface_MenuCafeteria';
import TablaAlumnos from './UserInterface_TablaAlumnos';
import {BrowserRouter, Route} from 'react-router-dom';
function Routes() {
    return (
        <>
           <BrowserRouter>
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/" component = {Home} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/inicio/alumno" component = {AlumnoPage} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/login" component = {LoginAlumno} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/login/cafeteria" component = {LoginCafeteria} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/inicio/alumno/perfil" component = {ProfileAlumnoPage} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/inicio/cafeteria" component = {CafeteriaPage} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/inicio/cafeteria/menu" component = {MenuCafeteria} />
                <Route exact path="/WebApp-ITAEats/ITAEats-app/public/inicio/cafeteria/alumnos" component = {TablaAlumnos} />
           </BrowserRouter> 
        </>
    );
}

export default Routes;