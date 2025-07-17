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
            const data = response.data;
            let subHorariosTotales = [];
            data.forEach(h => {
                const subs = generarSubHorarios(h);
                subHorariosTotales = [...subHorariosTotales, ...subs];
            });
            setHorarios(subHorariosTotales);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los horarios disponibles:", error);
            setError("Error al obtener los horarios disponibles");
        }
    }


    function generarSubHorarios(horario, intervaloMin = 30) {
        const subHorarios = [];

        const inicio = new Date(`1970-01-01T${horario.hora_inicio}`);
        const fin = new Date(`1970-01-01T${horario.hora_fin}`);

        let actual = new Date(inicio);

        while (actual < fin) {
            const siguiente = new Date(actual.getTime() + intervaloMin * 60000);
            if (siguiente > fin) break;

            const formatTime = (date) =>
                date.toTimeString().split(" ")[0]; // Esto da "HH:MM:SS"


            subHorarios.push({
                id_horario_disponible: horario.id,
                fecha: horario.fecha,
                desde: formatTime(actual),
                hasta: formatTime(siguiente),
                cupo_max: horario.cupo_max,
            });

            actual = siguiente;
        }
        console.log(`Horario ${horario.hora_inicio} - ${horario.hora_fin} generó ${subHorarios.length} subhorarios`);
        if (subHorarios.length === 0) {
            console.log(`No se generaron subhorarios para el horario: ${horario.hora_inicio} - ${horario.hora_fin}`);
        }
        return subHorarios;
    }

    // Llamada a la API para obtener los detalles del negocio y los horarios disponibles

    useEffect(() => {
        fetchNegocioDetalles();
        fetchHorarios();
    }, []);

    const handleReserva = async () => {
        if (!horarioSeleccionado) return alert("Seleccioná un horario primero");

        try {
            const response = await axios.post(`http://localhost:5000/api/reservas`, {
                id_usuario: localStorage.getItem('id_usuario'), // Asumiendo que el ID del usuario está guardado en localStorage
                id_negocio: id,
                id_horario_disponible: horarioSeleccionado.id_horario_disponible,
                fecha: new Date(horarioSeleccionado.fecha).toISOString().split("T")[0], // YYYY-MM-DD
                hora_inicio: horarioSeleccionado.desde,
                hora_fin: horarioSeleccionado.hasta,
                estado: "pendiente",
                cupo_maximo: horarioSeleccionado.cupo_max // Si necesitas enviar el cupo máximo, descomentar esta línea
            });
            console.log("Reserva creada:", response.data);
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
                                {horario.desde} - {horario.hasta} ({horario.fecha}) - Cupos: {horario.cupo_max}
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
