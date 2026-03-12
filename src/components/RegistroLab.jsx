import { useEffect, useState } from 'react'
import { getRegistros } from '../api/registrolab'
import Header from './Header'
import Swal from "sweetalert2";

export default function RegistroLab() {
  const [loading, setLoading] = useState(true);
  const [registroLabs, setRegistroLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [labsOptions, setLabsOptions] = useState([]);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Cargando reservaciones...",
        text: "Conectando con El Servidor...",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  const loadRegistroLab = async () => {
    try {
      const response = await getRegistros();
      const dataRaw = response.data.results || response.data || [];
      setRegistroLabs(dataRaw);
      setFilteredLabs(dataRaw);

      const uniqueLabs = [...new Set(
        dataRaw.map(reg => reg.laboratorio?.descripcion).filter(Boolean)
      )];
      setLabsOptions(uniqueLabs);
    } catch (error) {
      console.error("Error en la petición:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistroLab();
  }, []);

  function formatearHora12(hora24) {
    if (!hora24) return "N/A";
    const [hora, minuto] = hora24.split(':');
    const h = parseInt(hora);
    const hora12 = h % 12 || 12;
    const periodo = h < 12 ? 'AM' : 'PM';
    return `${hora12}:${minuto} ${periodo}`;
  }

  function formatShortDate(dateString) {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  useEffect(() => {
    let result = registroLabs;
    if (selectedLab) result = result.filter(reg => reg.laboratorio?.descripcion === selectedLab);
    if (selectedDate) result = result.filter(reg => reg.fecha === selectedDate);
    setFilteredLabs(result);
  }, [selectedLab, selectedDate, registroLabs]);

  return (
    <div className='mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Header />

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-gray-600 mb-1">Laboratorio</label>
            <select
              className="w-full p-2 text-sm border border-gray-200 rounded-md"
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
            >
              <option value="">Todos los laboratorios</option>
              {labsOptions.map((lab, index) => (
                <option key={index} value={lab}>{lab}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-gray-600 mb-1">Fecha</label>
            <input
              type="date"
              className="w-full p-2 text-sm border border-gray-200 rounded-md"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <button
              className="w-full py-2 text-xs font-medium text-sky-700 bg-sky-50 rounded-md border border-sky-200 hover:bg-sky-100"
              onClick={() => { setSelectedLab(''); setSelectedDate(''); }}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      <div>
        {filteredLabs.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredLabs.map((registro, index) => {
              
              // LÓGICA DE COLORES: index % 3 nos da 0, 1 o 2
              const colorPos = index % 3;
              let borderClass = "border-blue-900"; // Izquierda (Azul)
              let textClass = "text-blue-900";
              let labelClass = "bg-blue-100 text-blue-800";

              if (colorPos === 1) {
                borderClass = "border-yellow-400"; // Centro (Amarillo)
                textClass = "text-yellow-700";
                labelClass = "bg-yellow-100 text-yellow-800";
              } else if (colorPos === 2) {
                borderClass = "border-green-600"; // Derecha (Verde)
                textClass = "text-green-700";
                labelClass = "bg-green-100 text-green-800";
              }

              return (
                <div 
                  key={registro.id} 
                  // Usamos border-t-8 para que el color se note arriba
                  className={`bg-white p-5 rounded-xl shadow-sm border-t-8 ${borderClass} hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-lg font-bold ${textClass}`}>
                        {registro.laboratorio?.descripcion || "Lab sin nombre"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {registro.asignatura?.descripcion || "Sin asignatura"}
                      </p>
                    </div>
                    <span className={`${labelClass} text-[10px] font-bold px-2 py-1 rounded-full uppercase`}>
                      {formatShortDate(registro.fecha)}
                    </span>
                  </div>

                  <div className="space-y-3 text-gray-700">
                    <p className="text-sm">
                      <span className='font-bold text-gray-400 uppercase text-[10px]'>Docente:</span><br/>
                      {registro.docente?.nombre || "No asignado"}
                    </p>

                    <p className="text-sm">
                      <span className='font-bold text-gray-400 uppercase text-[10px]'>Carrera:</span><br/>
                      {registro.carrera?.descripcion || "N/A"}
                    </p>

                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold">
                        {formatearHora12(registro.hora_inicio)} - {formatearHora12(registro.hora_fin)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-700">No se encontraron reservaciones</h3>
          </div>
        )}
      </div>
    </div>
  )
}