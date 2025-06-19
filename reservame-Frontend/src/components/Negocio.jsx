import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Negocio.css";
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function Negocio(props) {
    const { id, nombre, direccion, telefono } = props

    const reservar = () => {
        axios.put('http://localhost:3001/api/reservas/' + id)
            .then((response) => {
                console.log(response);
            });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
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
                <Box sx={style}>
                    
                <Typography id="modal-modal-title" variant="h6" component="h2">nombre: {nombre}</Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>direccion: {direccion}</Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>telefono: {telefono}</Typography>
                        <button onClick={reservar}>Reservar</button>
                        <button onClick={handleClose}>Cerrar</button>
                   
                </Box>
                </Modal>
                <button onClick={reservar}>Reservar</button>
            </div>
        </div>
    )
}

export default Negocio