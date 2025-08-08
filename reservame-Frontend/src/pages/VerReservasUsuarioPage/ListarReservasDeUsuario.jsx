import React from 'react'
import HeaderUser from '../../components/HeaderUser'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

function ListarReservasDeUsuario() {
    const [reservas, setReservas] = useState([]);
    const id_usuario = localStorage.getItem('id_usuario');

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reservas/usuario/${id_usuario}`);
                setReservas(response.data);
                console.log("Reservas del usuario:", response.data);
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
            }
        };

        fetchReservas();
    }, [id_usuario]);

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderUser />
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Reservas del Usuario {id_usuario}
                </h1>
                <ul className="space-y-4">
                    {reservas.map(reserva => (
                        <li
                            key={reserva.id}
                            className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between"
                        >
                            <div>
                                <div className="text-lg font-semibold text-blue-700">
                                    Negocio: {reserva.nombre_negocio}
                                </div>
                                <div className="text-gray-600">
                                    Fecha: {new Date(reserva.creada_en).toLocaleDateString()}
                                </div>
                                <div className="text-gray-600">
                                    Horario: {reserva.hora_inicio?.slice(0, 5)} - {reserva.hora_fin?.slice(0, 5)}
                                </div>
                            </div>
                            <span
                                className={`mt-2 sm:mt-0 inline-block px-3 py-1 rounded-full text-sm font-medium ${reserva.estado === 'confirmada'
                                    ? 'bg-green-100 text-green-800'
                                    : reserva.estado === 'pendiente'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListarReservasDeUsuario