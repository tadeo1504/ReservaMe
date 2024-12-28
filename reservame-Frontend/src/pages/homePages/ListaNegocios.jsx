import React, { use } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./ListaNegocios.css";
import Negocio from '../../components/Negocio';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../../components/HeaderUser';

function ListaNegocios() {

    // const reservar = () => {
    //     axios.put('http://localhost:3001/api/reservas/' + id)
    //         .then((response) => {
    //             console.log(response);
    //         });
    // }

    // hardcodear una lista de negocios con un useEffect
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
    }
    , []);  

    console.log(negocios);

    



return (
    <div>
        <HeaderUser />
        <div className="reserva">
           {/* mostrar los negocios que hay en el useState */}

            {negocios.map((negocio) => (
                
                <Negocio
                    key={negocio.id}
                    id={negocio.id}
                    nombre={negocio.nombre}
                    direccion={negocio.direccion}
                    telefono={negocio.telefono}
                />
            ))}
            

            {/* <button onClick={reservar}>Reservar</button> */}
        </div>
    </div>
);
}

export default ListaNegocios
