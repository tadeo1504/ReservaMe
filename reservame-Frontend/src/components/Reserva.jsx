import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./ReservaEstilo.css";

function Reserva(props) {
    const {id, hora, fecha, estado} = props

    const reservar = () => {
        axios.put('http://localhost:3001/api/reservas/' + id)
            .then((response) => {
                console.log(response);
                estado = true;
            });
    }

  return (
    <div>
        <div className="reserva">
            <p>Id: {id}</p>
            <p>Hora: {hora}</p>
            <p>Fecha: {fecha}</p>
        <button onClick={reservar}>Reservar</button>
        </div>
    </div>
  )
}

export default Reserva