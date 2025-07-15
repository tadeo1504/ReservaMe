import React from 'react'
import HeaderUser from '../../components/HeaderUser'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NegocioReservaDetalle() {
    const [negocio, setNegocio] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchNegocioDetalles = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/negocios/${id}`);
            setNegocio(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los detalles del negocio:", error);
            setError("Error al obtener los detalles del negocio");
            setLoading(false);
        }
    }

    const fetchHorarios = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/horarios_disponibles/${id}`);
            setHorarios(response.data);
        } catch (error) {
            console.error("Error al obtener los horarios disponibles:", error);
            setError("Error al obtener los horarios disponibles");
        }
    }
    // Llamada a la API para obtener los detalles del negocio y los horarios disponibles

    useEffect(() => {
        fetchNegocioDetalles();
        fetchHorarios();
    }, []);

    const handleReserva = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/reservas`, {
                id_negocio: id,
                // Otros datos necesarios para la reserva
            });
            console.log("Reserva creada:", response.data);
        } catch (error) {
            console.error("Error al crear la reserva:", error);
        }
    }

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100'>
            <HeaderUser />
            <div className='flex flex-col gap-8 px-6 py-8 max-w-7xl mx-auto'>
                <div className="bg-white rounded-lg shadow-md p-6 w-full ">
                    <h2 className="text-2xl font-bold mb-4">{negocio.nombre}</h2>
                    <p className="text-gray-700 mb-4">{negocio.descripcion}</p>
                    <p className="text-gray-600">Dirección: {negocio.direccion}</p>
                    <p className="text-gray-600">Teléfono: {negocio.telefono_contacto}</p>
                    <p className="text-gray-600">Email: {negocio.mail}</p>
                    <div className="flex space-x-2 mt-4">

                    </div>
                </div>
                {/* Horarios disponibles: */}
                <div className="bg-white rounded-lg shadow-md p-6 w-full ">
                    <h3 className="text-xl font-bold mb-4">Horarios Disponibles</h3>
                    <ul className="list-disc list-inside">
                        {horarios.map((horario) => (
                            <li key={horario.id}>
                                {horario.fecha} - {horario.hora_inicio} a {horario.hora_fin} cupos disponibles: {horario.cupo_max}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default NegocioReservaDetalle
