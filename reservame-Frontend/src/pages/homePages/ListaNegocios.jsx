import React, { useState, useEffect } from 'react';
import Negocio from '../../components/Negocio';
import HeaderUser from '../../components/HeaderUser';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Buscador from '../../components/Buscador';

function ListaNegocios() {
    const [negocios, setNegocios] = useState([]);

    useEffect(() => {
        setNegocios([
            {
                id: 1,
                nombre: "Negocio 1",
                direccion: "Calle 1",
                telefono: "123456789",
            },
            {
                id: 2,
                nombre: "Negocio 2",
                direccion: "Calle 2",
                telefono: "987654321",
            },
            {
                id: 3,
                nombre: "Negocio 3",
                direccion: "Calle 3",
                telefono: "123456789",
            },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
            <HeaderUser />
            <div className="flex flex-col md:flex-row gap-8 px-6 py-8 max-w-7xl mx-auto">
                {/* Izquierda: Buscador + Mapa */}
                <div className="md:w-1/2 flex flex-col items-center">
                    <div className="w-full flex justify-center mb-6">
                        <div className="w-full max-w-md">
                            <Buscador />
                        </div>
                    </div>
                   <div className="w-full max-w-md aspect-square rounded-xl shadow-lg overflow-hidden border border-blue-200 bg-white">
                        <MapContainer
                            center={[-34.9011, -56.1645]}
                            zoom={13}
                            className="w-full h-full"
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {negocios.map((negocio) => (
                            <Marker
                                key={negocio.id}
                                position={[-34.9011 + negocio.id * 0.01, -56.1645 + negocio.id * 0.01]}
                            >
                                <Popup>
                                <strong>{negocio.nombre}</strong><br />
                                {negocio.direccion}<br />
                                Tel: {negocio.telefono}
                                </Popup>
                            </Marker>
                            ))}
                        </MapContainer>
                        </div>

                </div>
                {/* Derecha: Destacados del día */}
                <div className="md:w-1/2 flex flex-col">
                    <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center md:text-left">
                        Destacados del día
                    </h2>
                    <div className="flex flex-col gap-6">
                        {negocios.map((negocio) => (
                            <div
                                key={negocio.id}
                                className="bg-white/80 rounded-xl shadow-md border border-cyan-100 hover:shadow-lg transition-shadow"
                            >
                                <Negocio
                                    id={negocio.id}
                                    nombre={negocio.nombre}
                                    direccion={negocio.direccion}
                                    telefono={negocio.telefono}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListaNegocios;
