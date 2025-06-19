import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import "./loginPage.css";

// const preventDefault = (event) => event.preventDefault();

export const LoginPage = () => {

    const [formulario, setFormulario] = useState({
        email: "",
        contrasena: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const login = ()=> {
        console.log(formulario);
        axios.post('http://127.0.0.1:5000/auth/login', {
            email: formulario.email,
            contrasena: formulario.contrasena
        })
        .then((response) => {
            console.log(response);
            navigate("/Home");
        })
        .catch((error) => {
            console.error("Error en login:", error);
        });
    }        

    return (
        <div className='login-page-div'>
            {/* Sección izquierda */}
            <div className="left-section">
                <div>
                    <h2>Reservar nunca fue tan fácil como con ReservaMe</h2>
                </div>
            </div>

            {/* Sección derecha */}
            <div className="right-section">
                <h1 className='title-app'>ReservaMe</h1>
                <div className='log-box'>
                    <h3 className='log-text'>Iniciar Sesión</h3>
                    <form className="form-login" onSubmit={(e) => { e.preventDefault(); login(); }}>
                    {/* Input usuario */}
                        <div className="username">
                            <input
                                className='input-user'
                                type="text"
                                name="email"
                                placeholder="Correo"
                                value={formulario.email}
                                onChange={handleInputChange}
                            />
                            <AccountCircleIcon className='user-icon' />
                        </div>
                        {/* Input contraseña */}
                        <div className="password">
                            <input
                                className='input-pass'
                                type="password"
                                name="contrasena"
                                placeholder="Contraseña"
                                value={formulario.contrasena}
                                onChange={handleInputChange}
                            />
                            <LockIcon className='lock-icon' />
                        </div>
                        {/* Botón */}
                        <button type="submit" className='boton-ingresar'>Ingresar</button>
                        {/* Links */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '10px',
                                fontSize: '0.9rem'
                            }}
                            // onClick={preventDefault}
                        >
                            <Link href="#" underline="hover" style={{ color: '#2d2d2d' }}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '10px',
                                fontSize: '0.9rem'
                            }}
                            // onClick={preventDefault}
                        >
                            <span
                                className="link"
                                onClick={() => navigate("/register")}
                                style={{ cursor: "pointer", color: "#2d2d2d" }}
                            >
                                Registrarse
                            </span>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
};

