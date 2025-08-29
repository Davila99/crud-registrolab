import React from 'react'

export default function RegistroLabForm() {
  return (
 <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
  <form>
    <h1 className="text-3xl font-bold text-sky-900 mb-4">
      Nueva Reservación
    </h1>

    {/* Alerta de desarrollo */}
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
      <svg
        className="w-6 h-6 text-yellow-500 mt-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-yellow-800 text-sm font-medium">
        Esta funcionalidad está en desarrollo 🚧. Muy pronto podrás
        registrar tus reservaciones desde aquí.
      </p>
    </div>

    {/* Inputs (deshabilitados por ahora) */}
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700">Carrera</label>
      <input
        type="text"
        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        placeholder="Ingrese la carrera"
        disabled
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700">Asignatura</label>
      <input
        type="text"
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        placeholder="Ingrese la asignatura"
        disabled
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700">Docente</label>
      <input
        type="text"
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        placeholder="Ingrese el nombre del docente"
        disabled
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700">Hora de Inicio</label>
      <input
        type="time"
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        disabled
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700">Hora de Fin</label>
      <input
        type="time"
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        disabled
      />
    </div>

    <button
      type="button"
      disabled
      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
    >
      Guardar Registro
    </button>
  </form>
</div>

  )
}
