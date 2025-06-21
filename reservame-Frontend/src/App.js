import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './index.css'; // o el nombre real del archivo donde pusiste las directivas
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/loginPages/LoginPage';
import ReservaPagina from './pages/reservaPages/ReservaPagina';
import ListaNegocios from './pages/homePages/ListaNegocios';
import RegisterPage from './pages/RegisterPages/Register';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/Home' element={<ListaNegocios />} />
          <Route path='/Reserva' element={<ReservaPagina />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
