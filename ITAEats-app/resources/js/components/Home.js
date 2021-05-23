import React from 'react';
import ReactDOM from 'react-dom';
import BodyHome from './BodyHome';
import '../../css/app.css';
function Home() {
    return (
        <>
            <BodyHome />
        </>
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
