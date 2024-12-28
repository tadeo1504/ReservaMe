import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Reserva from '../../components/Reserva';
import "./ReservaPagina.css";
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../../components/HeaderUser';

function ReservaPagina() {
    const [reservas, setReservas] = useState([]);

    const agregarFakeReserva = () => {
        const countId = reservas.length + 1; 
        setReservas([
            ...reservas,
            {
                id: countId,
                hora: "12:00",
                fecha: "2022-10-10",
                estado: false,
            }
        ]);
    }

    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/reservas')
    //         .then((response) => {
    //             setReservas(response.data);
    //         });
    // }, []);

  return (
    <div>
        <HeaderUser />
        <div className="reserva-pagina">
            <button onClick={agregarFakeReserva}>Agregar reserva falsa</button>
            {reservas.map((reserva) => (
                <Reserva
                    key={reserva.id}
                    id={reserva.id}
                    hora={reserva.hora}
                    fecha={reserva.fecha}
                    estado={reserva.estado}
                />
            ))}
        </div>
    </div>
  )
}

export default ReservaPagina