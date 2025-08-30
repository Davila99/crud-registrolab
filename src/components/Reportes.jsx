import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const registroLabApi = axios.create({
  baseURL: "https://davila.pythonanywhere.com/api/registro/"
});

function Reportes() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ carrera: "", docente: "" });

  useEffect(() => {
    registroLabApi.get("/")
      .then((res) => {
        setRegistros(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener los registros", err);
        setLoading(false);
      });
  }, []);

  // Aplicar filtros
  const registrosFiltrados = registros.filter((r) => {
    return (
      (filtros.carrera === "" || r.carrera.toLowerCase().includes(filtros.carrera.toLowerCase())) &&
      (filtros.docente === "" || r.docente.toLowerCase().includes(filtros.docente.toLowerCase()))
    );
  });

  // Agrupación por carrera
  const carreras = registrosFiltrados.reduce((acc, r) => {
    acc[r.carrera] = (acc[r.carrera] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(carreras),
    datasets: [
      {
        label: "Reservaciones por Carrera",
        data: Object.values(carreras),
        backgroundColor: "rgba(59, 130, 246, 0.6)"
      }
    ]
  };

  const pieData = {
    labels: Object.keys(carreras),
    datasets: [
      {
        label: "Distribución",
        data: Object.values(carreras),
        backgroundColor: [
          "#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA", "#F472B6"
        ]
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-sky-900 mb-6 text-center">📊 Reportes de Reservaciones</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Filtrar por carrera"
          value={filtros.carrera}
          onChange={(e) => setFiltros({ ...filtros, carrera: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Filtrar por docente"
          value={filtros.docente}
          onChange={(e) => setFiltros({ ...filtros, docente: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <>
          <div className="mb-10">
            <Bar data={chartData} />
          </div>

          <div className="mb-10">
            <Pie data={pieData} />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-sky-100">
                <tr>
                  <th className="px-4 py-2 text-left">Carrera</th>
                  <th className="px-4 py-2 text-left">Asignatura</th>
                  <th className="px-4 py-2 text-left">Docente</th>
                  <th className="px-4 py-2 text-left">Inicio</th>
                  <th className="px-4 py-2 text-left">Fin</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{r.carreras_id.descripcion}</td>
                    <td className="px-4 py-2">{r.asignatura_id.descripcion}</td>
                    <td className="px-4 py-2">{r.docentes_id.nombre}</td>
                    <td className="px-4 py-2">{r.hora_inicio}</td>
                    <td className="px-4 py-2">{r.hora_fin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Reportes;