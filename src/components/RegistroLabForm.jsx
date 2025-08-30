import React, { useState } from "react";

const carreras = ["Ingeniería", "Arquitectura", "Medicina"];
const asignaturas = ["Matemáticas", "Física", "Química"];
const docentes = ["Juan Pérez", "Ana López", "Carlos Ruiz"];

export default function RegistroLabForm() {
  const [form, setForm] = useState({
    carrera: "",
    asignatura: "",
    docente: "",
    horaInicio: "",
    horaFin: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🚧 Esta funcionalidad aún está en desarrollo.");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8">
      <form onSubmit={handleSubmit}>
        {/* Título */}
        <h1 className="flex flex-col items-center text-sky-900 mb-6">
          <span className="text-3xl font-extrabold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nueva Reservación de Laboratorio
          </span>
          <span className="text-base font-medium text-gray-500 mt-1">
            Completa el formulario para registrar tu solicitud
          </span>
        </h1>

        {/* Alerta de desarrollo */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3 shadow-sm">
          <svg
            className="w-6 h-6 text-yellow-500 mt-0.5 flex-shrink-0"
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
            🚧 Esta funcionalidad está en desarrollo. Muy pronto podrás realizar tus solicitudes de reservaciones desde aquí.
          </p>

        </div>

        {/* Inputs deshabilitados */}
        <div className="grid gap-5 opacity-70 pointer-events-none select-none">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Carrera
            </label>
            <select
              name="carrera"
              value={form.carrera}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100"
              disabled
            >
              <option value="">Seleccione la carrera</option>
              {carreras.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Asignatura
            </label>
            <select
              name="asignatura"
              value={form.asignatura}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100"
              disabled
            >
              <option value="">Seleccione la asignatura</option>
              {asignaturas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Docente
            </label>
            <select
              name="docente"
              value={form.docente}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100"
              disabled
            >
              <option value="">Seleccione el docente</option>
              {docentes.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Hora de Inicio
              </label>
              <input
                type="time"
                name="horaInicio"
                value={form.horaInicio}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Hora de Fin
              </label>
              <input
                type="time"
                name="horaFin"
                value={form.horaFin}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Botón deshabilitado */}
        <button
          type="button"
          disabled
          className="w-full mt-6 bg-gray-400 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm cursor-not-allowed"
        >
          Guardar Registro
        </button>
      </form>
    </div>
  );
}
