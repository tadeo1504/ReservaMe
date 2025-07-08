import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes'; // Asegúrate de que la ruta sea correcta
import './App.css';
import './index.css'; // o el nombre real del archivo donde pusiste las directivas
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
          {/* Rutas públicas */}
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path='/Home' element={<ListaNegocios />} />
            <Route path='/Reserva' element={<ReservaPagina />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
