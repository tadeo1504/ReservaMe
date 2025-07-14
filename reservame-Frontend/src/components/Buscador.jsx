// Buscador.jsx
import React from 'react';

function Buscador({ valorBusqueda, setValorBusqueda, onEnter }) {
  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter();
            }
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default Buscador;
