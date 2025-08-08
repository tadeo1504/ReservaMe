import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

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

    const login = () => {
        axios.post('http://127.0.0.1:5000/api/usuarios/iniciar_sesion', {
            email: formulario.email,
            contrasena: formulario.contrasena
        })
            .then(({ data }) => {
                if (data.ok) {
                    console.log(data);
                    // Guardar token si lo hay
                    if (data.usuario.token) {
                        localStorage.setItem("token", data.usuario.token);
                    }
                    if (data.usuario.rol) {
                        localStorage.setItem("rol", data.usuario.rol);
                    }
                    if (data.usuario.id_usuario) {
                        localStorage.setItem("id_usuario", data.usuario.id_usuario);
                    }
                    navigate("/Home");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    // Mensaje personalizado si viene del backend
                    const mensaje = err.response.data?.mensaje || "Credenciales incorrectas";
                    setMensajeError(mensaje); // 👈 lo mostramos en pantalla
                } else {
                    console.error("Error en login:", err);
                    setMensajeError("Fallo la conexión con el servidor");
                }
            });
    };

    const [mensajeError, setMensajeError] = useState("");

    const mostrarError = mensajeError ? (
        <div className="text-red-500 text-sm mt-2">
            {mensajeError}
        </div>
    ) : null;




    return (
        <div className="min-h-screen flex">
            {/* Sección izquierda (2/3) */}
            <div className="w-2/3 bg-gradient-to-br from-cyan-400 to-blue-300 flex flex-col justify-center items-center p-16">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
                        Reservar nunca fue tan fácil como con <span className="text-cyan-900">ReservaMe</span>
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl font-medium tracking-wide">
                        Organiza tus reservas de manera rápida, sencilla y segura. ¡Disfruta de la mejor experiencia!
                    </p>
                </div>
            </div>

            {/* Sección derecha (1/3) */}
            <div className="w-1/3 bg-white flex flex-col justify-center items-center shadow-2xl">
                <h1 className="text-4xl font-extrabold text-cyan-700 mb-10">ReservaMe</h1>
                <div className="w-full max-w-sm">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Iniciar Sesión</h3>
                    <form
                        className="space-y-6"
                        onSubmit={(e) => { e.preventDefault(); login(); }}
                    >
                        {/* Input usuario */}
                        <div className="relative">
                            <input
                                className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-lg"
                                type="text"
                                name="email"
                                placeholder="Correo"
                                value={formulario.email}
                                onChange={handleInputChange}
                                autoComplete="username"
                            />
                            <AccountCircleIcon className="absolute left-2 top-4 text-cyan-400" />
                        </div>
                        {/* Input contraseña */}
                        <div className="relative">
                            <input
                                className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-lg"
                                type="password"
                                name="contrasena"
                                placeholder="Contraseña"
                                value={formulario.contrasena}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                            />
                            <LockIcon className="absolute left-2 top-4 text-cyan-400" />
                        </div>
                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition text-lg"
                        >
                            Ingresar
                        </button>
                        {/* Error message */}
                        {mostrarError}
                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-t border-cyan-200" />
                            <span className="mx-4 text-gray-500">O</span>
                            <hr className="flex-grow border-t border-cyan-200" />
                        </div>
                        {/* Links */}
                        <div className="flex justify-center mt-2">
                            <button
                                type="button"
                                className="text-cyan-700 text-sm hover:underline"
                                onClick={() => alert('Funcionalidad no implementada')}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <div className="flex justify-center mt-2">
                            <span
                                className="text-cyan-700 text-sm hover:underline cursor-pointer"
                                onClick={() => navigate("/register")}
                            >
                                Registrarse
                            </span>
                        </div>
                        <div className="flex justify-center mt-6">
                            <span
                                className="text-cyan-700 text-sm hover:underline cursor-pointer"
                                onClick={() => navigate("/RegistroAdmin")}
                            >
                                Tenes un negocio? Registrate como dueño
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
