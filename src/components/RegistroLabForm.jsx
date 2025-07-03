import React from 'react'

export default function RegistroLabForm() {
  return (
    <div>
        <form>
            <h1 className="text-3xl font-bold text-sky-900 mb-4">Nueva Reservacion </h1>
            <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Carrera</label>
                <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" placeholder="Ingrese la carrera" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Asignatura</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Ingrese la asignatura" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Docente</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Ingrese el nombre del docente" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Hora de Inicio</label>
                <input type="time" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Hora de Fin</label>
                <input type="time" className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Guardar Registro</button>
        </form>
    </div>
  )
}
