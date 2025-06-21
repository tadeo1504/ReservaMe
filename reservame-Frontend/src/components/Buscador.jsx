import React from 'react'

function Buscador() {
  return (
    <div>
        <div className="flex justify-center items-center mt-4">
            <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Buscar
            </button>
        </div>
    </div>
  )
}

export default Buscador