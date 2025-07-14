import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Negocio(props) {
    const { id, nombre, descripcion, direccion, telefono_contacto, mail } = props;

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full  flex flex-col items-start">
            <p className="text-lg font-semibold text-gray-800">{nombre}</p>
            <p className="text-gray-600">{descripcion}</p>
            <div className="flex space-x-2">
                <button
                    onClick={handleOpen}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Ver detalles
                </button>
                <button
                    onClick={() => navigate(`/Reserva/${id}`)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Reservar
                </button>
            </div>
            <Modal
                show={open}
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    <div className="flex flex-col items-start space-y-4">
                        <h2 className="font-bold text-xl mb-2">
                            Nombre: {nombre}
                        </h2>
                        <div className="text-gray-700">
                            Descripción: {descripcion}
                        </div>
                        <div className="text-gray-700 mt-2">
                            Dirección: {direccion}
                        </div>
                        <div className="text-gray-700 mt-2">
                            Teléfono: {telefono_contacto}
                        </div>
                        <div className="text-gray-700 mt-2">
                            Email: {mail}
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <button
                                onClick={() => navigate(`/Reserva/${id}`)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Reservar
                            </button>
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
        // </div>
    );
}

export default Negocio;