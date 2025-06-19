import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./HeaderUser.css";
import { useNavigate } from 'react-router-dom';

function HeaderUser() {
  const navigate = useNavigate();

  // crear los metodos para navegar a donde se necesite, por ejemplo: principal, reservas, perfil, etc. aunque aun no esten implementedas las paginas

  const navigateToHome = () => {
    navigate('/Home');
  }

  const navigateToReservas = () => {
    navigate('/Reserva');
  }

  const navigateToPerfil = () => {
    navigate('/Perfil');
  }


  return (
    <div>
      <div className='encabezado'>
        <div className="app-title">
          <h1>¡ReservaMe!</h1>
        </div>
        <div className="encabezado-buttons">
          <button className='nav-button' onClick={navigateToHome}>Home</button>
          <button className='nav-button' onClick={navigateToReservas}>Reservas</button>
          <button className='nav-button' onClick={navigateToPerfil}>Perfil</button>
        </div>

      </div>

    </div>
  )
}

export default HeaderUser