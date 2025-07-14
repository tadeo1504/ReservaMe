// Explorar.jsx
import React, { useState, useEffect } from 'react';
import Negocio from '../../components/Negocio';
import HeaderUser from '../../components/HeaderUser';
import Buscador from '../../components/Buscador';
import axios from 'axios';

function Explorar() {
    const [negocios, setNegocios] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState("");

    useEffect(() => {
        const fetchNegocios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/negocios');
                setNegocios(response.data);
            } catch (error) {
                console.error("Error al obtener los negocios:", error);
            }
        };
        fetchNegocios();
    }, []);

    const negociosFiltrados = negocios.filter((negocio) =>
        negocio.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
            <HeaderUser />
            <div className='flex flex-col gap-8 px-6 py-8 max-w-7xl mx-auto'>
                <Buscador valorBusqueda={valorBusqueda} setValorBusqueda={setValorBusqueda} />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {negociosFiltrados.map((negocio) => (
                        <Negocio
                            key={negocio.id}
                            id={negocio.id}
                            nombre={negocio.nombre}
                            descripcion={negocio.descripcion}
                            direccion={negocio.direccion}
                            telefono_contacto={negocio.telefono_contacto}
                            mail={negocio.mail}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Explorar;
