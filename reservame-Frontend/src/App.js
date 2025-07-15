import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes'; // Asegúrate de que la ruta sea correcta
import './App.css';
import './index.css'; // o el nombre real del archivo donde pusiste las directivas
import { LoginPage } from './pages/loginPages/LoginPage';
import Home from './pages/homePages/Home';
import Register from './pages/RegisterPages/Register';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorar from './pages/ExplorarPages/Explorar';
import NegocioReservaDetalle from './pages/Negocio/NegocioReservaDetalle';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<Register />} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path='/Home' element={<Home />} />
            <Route path='/Reserva/:id' element={<NegocioReservaDetalle />} />
            <Route path='/Explorar' element={<Explorar />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
