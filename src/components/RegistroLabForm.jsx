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
    <div className="max-w-lg mx-auto bg-white shadow-2xl rounded-3xl p-8 border-t-[12px] border-blue-900">
      <form onSubmit={handleSubmit}>
        <h1 className="flex flex-col items-center text-blue-900 mb-8 text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-3xl font-black tracking-tight">Nueva Reservación</span>
          <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Sistema de Laboratorios</span>
        </h1>

        <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-yellow-900 text-xs font-bold leading-snug">
            SISTEMA EN MANTENIMIENTO: El formulario de registro se habilitará tras la sincronización de la base de datos.
          </p>
        </div>

        <div className="grid gap-6 opacity-40 pointer-events-none select-none">
          <div>
            <label className="block text-xs font-black text-blue-900 uppercase mb-2 ml-1">Carrera Institucional</label>
            <select className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 font-medium" disabled>
              <option value="">Seleccione la carrera</option>
              {carreras.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-blue-900 uppercase mb-2 ml-1">Asignatura</label>
            <select className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 font-medium" disabled>
              <option value="">Seleccione la asignatura</option>
              {asignaturas.map((a) => (<option key={a} value={a}>{a}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-blue-900 uppercase mb-2 ml-1">Docente Responsable</label>
            <select className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 font-medium" disabled>
              <option value="">Seleccione el docente</option>
              {docentes.map((d) => (<option key={d} value={d}>{d}</option>))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-blue-900 uppercase mb-2 ml-1">Entrada</label>
              <input type="time" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50" disabled />
            </div>
            <div>
              <label className="block text-xs font-black text-blue-900 uppercase mb-2 ml-1">Salida</label>
              <input type="time" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50" disabled />
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled
          className="w-full mt-10 bg-gray-100 text-gray-400 font-black px-4 py-4 rounded-2xl border-2 border-dashed border-gray-200 uppercase tracking-widest text-sm"
        >
          Módulo Bloqueado
        </button>
      </form>
    </div>
  );
}