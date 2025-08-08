import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';
import { useState } from 'react';
function Register() {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensajeError, setMensajeError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = () => {
        setLoading(true);
        setMensajeError("");

        axios.post('http://127.0.0.1:5000/api/usuarios/registrar',
            {
                nombre: name,
                apellido: lastname,
                email: email,
                contrasena: password,
                telefono: telefono,
                rol: "cliente" // Asignar rol por defecto
            })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    // Registro exitoso, redirigir al login
                    navigate("/login");
                }
            })
            .catch(err => {
                if (err.response && err.response.data?.mensaje) {
                    setMensajeError(err.response.data.mensaje);
                } else {
                    setMensajeError("Error en el registro. Inténtalo de nuevo.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

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
                        Únete a <span className="text-cyan-900">ReservaMe</span>
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl font-medium tracking-wide">
                        Crea tu cuenta y comienza a reservar de manera rápida, sencilla y segura. ¡La mejor experiencia te espera!
                    </p>
                </div>
            </div>

            {/* Sección derecha (1/3) */}
            <div className="w-1/3 bg-white flex flex-col justify-center items-center shadow-2xl">
                <h1 className="text-4xl font-extrabold text-cyan-700 mb-8">ReservaMe</h1>
                <div className="w-full max-w-sm">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Crear Cuenta</h3>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => { e.preventDefault(); register(); }}
                    >
                        {/* Row para Nombre y Apellido */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Input Nombre */}
                            <div className="relative">
                                <input
                                    className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <PersonIcon className="absolute left-2 top-4 text-cyan-400" fontSize="small" />
                            </div>
                            {/* Input Apellido */}
                            <div className="relative">
                                <input
                                    className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Apellido"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                                <AccountCircleIcon className="absolute left-2 top-4 text-cyan-400" fontSize="small" />
                            </div>
                        </div>
                        {/* Input Teléfono */}
                        <div className="relative">
                            <input
                                className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
                                type="text"
                                id="telefono"
                                name="telefono"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                            <PhoneIcon className="absolute left-2 top-4 text-cyan-400" fontSize="small" />
                        </div>

                        {/* Input Email */}
                        <div className="relative">
                            <input
                                className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-lg"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <EmailIcon className="absolute left-2 top-4 text-cyan-400" />
                        </div>

                        {/* Input Contraseña */}
                        <div className="relative">
                            <input
                                className="w-full pl-10 pr-3 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-lg"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <LockIcon className="absolute left-2 top-4 text-cyan-400" />
                        </div>

                        {/* Botón de registro */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-3 rounded-lg transition text-lg ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                                }`}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>

                        {/* Error message */}
                        {mostrarError}

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-t border-cyan-200" />
                            <span className="mx-4 text-gray-500">O</span>
                            <hr className="flex-grow border-t border-cyan-200" />
                        </div>

                        {/* Link para login */}
                        <div className="flex justify-center mt-4">
                            <span className="text-gray-600 text-sm">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="text-cyan-700 hover:underline font-medium">
                                    Inicia Sesión
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;