import React from 'react';
// import Encabezado from '../components/CommonComponents/Encabezado';
// import PieDePagina from '../components/CommonComponents/PieDePagina';
import { Link } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';
import { useState } from 'react';
function Register() {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        axios.post('http://127.0.0.1:5000/auth/register',
            {
                nombre: name,
                apellido: lastname,
                email: email,
                contrasena: password
            }).then((response) => {
                console.log(response);
            });
    }


    return (
        <div>
            {/* <Encabezado /> */}
            <div className="register-page">
                <h1>¡Bienvenido!</h1>
                <div className='register-form'>


                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" id="lastname" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                    </div>


                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <button onClick={register}>Registrarse</button>
                    <h3>¿Ya estás registrado? <Link to="/login">Inicia Sesión</Link></h3>
                </div>
            </div>
            {/* <PieDePagina /> */}
        </div>
    );
}

export default Register;