import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Negocio.css";
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';


function Negocio(props) {
    const { id, nombre, direccion, telefono } = props

    const reservar = () => {
        axios.put('http://localhost:3001/api/reservas/' + id)
            .then((response) => {
                console.log(response);
            });
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className="reserva">
                <p>nombre: {nombre}</p>
                <button onClick={handleOpen}>Ver detalles</button>
                <Modal
                    className='modal'
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <div className="modal">
                        <h2>nombre: {nombre}</h2>
                        <p>direccion: {direccion}</p>
                        <p>telefono: {telefono}</p>
                        <button onClick={reservar}>Reservar</button>
                        <button onClick={handleClose}>Cerrar</button>
                    </div>
                </Modal>
                <button onClick={reservar}>Reservar</button>
            </div>
        </div>
    )
}

export default Negocio