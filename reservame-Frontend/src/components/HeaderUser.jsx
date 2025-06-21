import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderUser() {
  const navigate = useNavigate();
  const [perfilOpen, setPerfilOpen] = useState(false);
  const perfilRef = useRef(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setPerfilOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToFavoritos = () => {
    navigate('/Favoritos');
  };

  const navigateToExplorar = () => {
    navigate('/Explorar');
  };

  const handleConfiguracion = () => {
    setPerfilOpen(false);
    navigate('/Perfil');
  };

  const handleCerrarSesion = () => {
    setPerfilOpen(false);
    // Aquí puedes agregar lógica de logout si es necesario
    navigate('/login');
  };

  return (
    <header className="w-full bg-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6">
        <h1 className="text-xl font-bold text-blue-500 tracking-wide select-none">
          ¡ReservaMe!
        </h1>
        <nav className="flex space-x-2">
          <button
            className="px-3 py-1 rounded-md text-blue-700 hover:bg-blue-200 transition"
            onClick={navigateToFavoritos}
          >
            Favoritos
          </button>
          <button
            className="px-3 py-1 rounded-md text-blue-700 hover:bg-blue-200 transition"
            onClick={navigateToExplorar}
          >
            Explorar
          </button>
          <div className="relative" ref={perfilRef}>
            <button
              className="px-3 py-1 rounded-md text-blue-700 hover:bg-blue-200 transition"
              onClick={() => setPerfilOpen((open) => !open)}
            >
              Perfil
            </button>
            {perfilOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-blue-200 rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-100"
                  onClick={handleConfiguracion}
                >
                  Configuración
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-blue-100"
                  onClick={handleCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderUser;