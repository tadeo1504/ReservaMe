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

    const fetchSubHorarios = async () => {
        const response = await axios.get(`http://localhost:5000/api/sub_horarios_reserva/negocio/${id}`);
        setHorarios(response.data); // ya no hay que generar subhorarios artificialmente
    };



    // Llamada a la API para obtener los detalles del negocio y los horarios disponibles

    useEffect(() => {
        fetchNegocioDetalles();
        fetchSubHorarios();
    }, []);

    const handleReserva = async () => {
        if (!horarioSeleccionado) return alert("Seleccioná un horario primero");

        try {
            const response = await axios.post(`http://localhost:5000/api/reservas`, {
                id_usuario: localStorage.getItem('id_usuario'),
                id_negocio: id,
                id_sub_horario_reserva: horarioSeleccionado.id,
                estado: "pendiente",
                id_horario_disponible: horarioSeleccionado.id_horario_disponible
            });
            console.log('cupos_disponibles', horarioSeleccionado.cupo_maximo);
            console.log("Reserva creada:", response.data);
            await fetchSubHorarios();

        } catch (error) {
            console.error("Error al crear la reserva:", error);
        }
    };



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
                    <ul className="space-y-2">
                        {horarios.map((horario, idx) => (
                            <li
                                key={idx}
                                onClick={() => setHorarioSeleccionado(horario)}
                                className={`cursor-pointer p-2 rounded-md border ${horarioSeleccionado === horario ? 'bg-blue-200' : 'hover:bg-blue-100'
                                    }`}
                            >
                                {horario.hora_inicio} - {horario.hora_fin} ({horario.fecha}) - Cupos: {horario.cupos_disponibles}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end">
                        <button
                            onClick={handleReserva}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NegocioReservaDetalle
