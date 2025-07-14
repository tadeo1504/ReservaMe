import React, { useState, useEffect } from 'react';
import Negocio from '../../components/Negocio';
import HeaderUser from '../../components/HeaderUser';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Buscador from '../../components/Buscador';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import ZoomMapa from '../../components/ZoomMapa';
import { useNavigate } from 'react-router-dom';

// Configuración inicial del mapa
const POSICION_INICIAL = { lat: -34.9011, lon: -56.1645 };
const ZOOM_INICIAL = 13;

// 🛠️ Solución al problema del ícono
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

function Home() {
    const [negocios, setNegocios] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState("");
    const [destacadosDelDia, setDestacadosDelDia] = useState([]);
    const [coordsBusqueda, setCoordsBusqueda] = useState(null);


    // Referencia al mapa
    const mapRef = useRef();

    const manejarBusqueda = () => {
        const resultado = negocios.find((negocio) =>
            negocio.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
        );

        if (resultado && resultado.coord_lat && resultado.coord_lon) {
            setCoordsBusqueda({
                lat: resultado.coord_lat,
                lon: resultado.coord_lon
            });
        } else {
            alert("No se encontró ningún negocio con ese nombre.");
        }
    };

    useEffect(() => {
        if (valorBusqueda.trim() === "") {
            setCoordsBusqueda({
                lat: POSICION_INICIAL.lat,
                lon: POSICION_INICIAL.lon,
                zoom: ZOOM_INICIAL
            });
        }
    }, [valorBusqueda]);


    const getRandomNegocios = (negocios, count = 3) => {
        const shuffled = [...negocios].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    useEffect(() => {
        const fetchNegocios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/negocios');
                // ahora los negocios tienen coords desde el backend
                setNegocios(response.data);

                // obtenemos 3 negocios aleatorios para mostrar como destacados
                const destacados = getRandomNegocios(response.data, 3);
                setDestacadosDelDia(destacados);
            } catch (error) {
                console.error("Error al obtener los negocios:", error);
            }
        };

        fetchNegocios();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
            <HeaderUser />
            <div className="flex flex-col md:flex-row gap-8 px-6 py-8 max-w-7xl mx-auto">
                {/* Izquierda: Buscador + Mapa */}
                <div className="md:w-1/2 flex flex-col items-center">
                    <div className="w-full flex justify-center mb-6">
                        <div className="w-full max-w-md">
                            <Buscador valorBusqueda={valorBusqueda} setValorBusqueda={setValorBusqueda} onEnter={manejarBusqueda} />
                        </div>
                    </div>
                    <div className="w-full max-w-md aspect-square rounded-xl shadow-lg overflow-hidden border border-blue-200 bg-white">
                        <MapContainer
                            center={[-34.9011, -56.1645]}
                            zoom={13}
                            className="w-full h-full"
                            scrollWheelZoom={false}
                            whenCreated={(mapInstance) => {
                                mapRef.current = mapInstance;
                            }}

                        >
                            {coordsBusqueda && <ZoomMapa coords={coordsBusqueda} />}
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {negocios.map((negocio) => {
                                if (!negocio.coord_lat || !negocio.coord_lon) return null; // filtramos si faltan coords
                                return (
                                    <Marker
                                        key={negocio.id}
                                        position={[negocio.coord_lat, negocio.coord_lon]}
                                    >
                                        <Popup>
                                            <strong>{negocio.nombre}</strong><br />
                                            {negocio.direccion}<br />
                                            Tel: {negocio.telefono_contacto}
                                        </Popup>
                                    </Marker>
                                );
                            })}

                        </MapContainer>
                    </div>

                </div>
                {/* Derecha: Destacados del día */}
                <div className="md:w-1/2 flex flex-col">
                    <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center md:text-left">
                        Destacados del día
                    </h2>
                    <div className="flex flex-col gap-6">
                        {destacadosDelDia.map((negocio) => (
                            <div
                                key={negocio.id}
                                className="bg-white/80 rounded-xl shadow-md border border-cyan-100 hover:shadow-lg transition-shadow"
                            >
                                <Negocio
                                    id={negocio.id}
                                    nombre={negocio.nombre}
                                    descripcion={negocio.descripcion}
                                    mail={negocio.mail}
                                    direccion={negocio.direccion}
                                    telefono_contacto={negocio.telefono_contacto}
                                />
                            </div>
                        ))}
                        <button className="bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 transition-colors" onClick={() => navigate('/explorar')}>
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
