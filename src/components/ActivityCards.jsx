import { useEffect, useState } from "react";
import { Eye, Clock3, User, BriefcaseBusiness, Building2 } from "lucide-react"; // Importamos iconos adicionales para el diseño de URACCAN
import { getActivities } from "../api/registrolab";

// --- Mantenemos tus funciones formateadoras intactas ---
const formatHour12 = (value) => {
  if (!value || typeof value !== "string") return "—";
  const match = value.match(/^([0-1]?\d|2[0-3]):([0-5]\d)$/);
  if (!match) return "—";
  const hour24 = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
};

const formatDateEs = (value) => {
  if (!value) return "Fecha no disponible";
  let parsed;
  if (value instanceof Date) {
    parsed = value;
  } else if (typeof value === "string") {
    const base = value.includes("T") ? value : `${value}T00:00:00`;
    parsed = new Date(base);
  } else {
    return "Fecha no disponible";
  }

  if (isNaN(parsed)) return "Fecha no disponible";

  return parsed.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Función para asignar colores de borde superior (estilo URACCAN)
const getTopBorderColorClass = (index) => {
  const colors = [
    "border-t-[#1D4ED8]", // Azul (como Laboratorio de Idiomas)
    "border-t-[#FBBF24]", // Amarillo
    "border-t-[#10B981]", // Verde
  ];
  return colors[index % colors.length];
};

export default function ActivityCards() {
  // --- Mantenemos tus estados y lógica intactos ---
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await getActivities();
        // Asumiendo que 'data' es el array de actividades
        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 font-medium pt-20">
          Cargando actividades...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 antialiased">
      
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12"> {/* 'text-center' centra todo el bloque */}
        <div className="text-4xl md:text-6xl font-black text-blue-900 transition-colors tracking-tight">
          
          ACTIVIDADES <span className="text-yellow-400">DE </span>
          <span className="text-green-600">URACCAN</span>
        </div>
        {/* Línea decorativa opcional para que se vea más profesional */}
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        <div className="flex justify-start mb-6"> {/* 'justify-start' lo manda a la izquierda */}
        
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#059669] transition-all shadow-md hover:shadow-lg text-sm border-b-4 border-[#047857]"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          VOLVER AL INICIO
        </a>
        </div>
      </div>
      
        
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Mayor separación (gap) */}
          {activities.map((activity, index) => {
            const dateLabel = formatDateEs(activity.fecha);
            const borderColorClass = getTopBorderColorClass(index);

            // Mapeo de datos (Asegúrate de que estos campos existen en tu API)
            // Si no existen, usa valores por defecto como 'No especificado'
            const laboratorio = activity.laboratorio?.nombre || "Todos los laboratorios"; // o el campo real
            const docente = activity.docente?.nombre || activity.nombre_docente || "Consuelo Blandón"; // Valor de ejemplo
            const carrera = activity.carrera?.nombre || activity.nombre_carrera || "Doctorado en Educación"; // Valor de ejemplo

            return (
              <div
                key={activity.id ?? activity.nombre_evento}
                // --- Reestructuración del Contenedor de la Card ---
                className={`relative bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col ${borderColorClass} border-t-8`}
              >
                {/* 1. Header (Nombre, Fecha, Tipo) - Replicando el estilo URACCAN */}
                <div className="p-7 pb-3"> {/* Padding más amplio, inferior reducido */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Título Grande (como 'Laboratorio de Idiomas') */}
                      <h3 className="text-2xl font-bold text-[#001D3D] leading-tight tracking-tight">
                        {/* Aquí puedes decidir si mostrar el nombre del laboratorio o el nombre del evento */}
                        {activity.nombre_evento || "Nombre del Evento"}
                      </h3>
                      {/* Subtítulo (como 'Recursos electrónicos') - Usando el tipo de actividad */}
                      <p className="text-[15px] font-medium text-gray-500 mt-1">
                        {activity.tipo_actividad?.nombre || "Tipo de actividad"}
                      </p>
                    </div>
                    {/* Badge de Fecha - Esquina superior derecha */}
                    <span className="bg-[#EBF5FF] text-[#1D4ED8] text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                      {dateLabel}
                    </span>
                  </div>
                </div>

                {/* Separador sutil */}
                <hr className="border-gray-100 mt-1 mx-7" />

                {/* 2. Cuerpo detallado (Docente y Carrera) - Estilo URACCAN */}
                <div className="p-7 pt-6 space-y-6 flex-1"> {/* Padding superior para separarlo de la HR */}
                    
                    {/* DOCENTE: Etiqueta y Valor */}
                    <div className="flex items-start gap-4">
                        <User className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Docente:</p>
                            <p className="text-[15px] font-medium text-[#111827] mt-0.5 leading-snug">
                                {docente}
                            </p>
                        </div>
                    </div>

                    {/* CARRERA: Etiqueta y Valor */}
                    <div className="flex items-start gap-4">
                        <BriefcaseBusiness className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Carrera:</p>
                            <p className="text-[15px] font-medium text-[#111827] mt-0.5 leading-snug">
                                {carrera}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Pie de página (Tiempo y Botón de Acción) */}
                <div className="px-7 py-5 bg-gray-50 mt-auto border-t border-gray-100 flex items-center justify-between gap-3">
                    {/* Sección de Horario */}
                    <div className="flex items-center gap-3.5 text-sm font-medium text-gray-700">
                        <Clock3 className="h-5 w-5 text-[#1D4ED8]" />
                        <span className="text-[16px] font-semibold text-[#111827]">
                            {/* Mostramos el rango de tiempo de la actividad */}
                            {activity.hora_inicio ? formatHour12(activity.hora_inicio) : "00:00 AM"} 
                            <span className="text-gray-400 font-normal mx-1"> - </span>
                            {activity.hora_fin ? formatHour12(activity.hora_fin) : "00:00 PM"}
                        </span>
                    </div>

                    {/* Botón 'Ver detalles' integrado al final */}
                    <button
                      type="button"
                      aria-label="Ver detalles de la actividad"
                      className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 bg-white text-[#1D4ED8] hover:bg-[#EBF5FF] hover:border-[#BFDBFE] transition-colors shadow-sm"
                      onClick={() => {
                        setSelected(activity);
                        setOpen(true);
                      }}
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- MODAL DETALLES (Alineado sutilmente al nuevo diseño) --- */}
        {open && selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="actividad-modal-title"
          >
            {/* Fondo / Overlay */}
            <div
              className="absolute inset-0 bg-black/60 opacity-100 animate-fade-in"
              onClick={() => setOpen(false)}
            />
            
            {/* Contenedor del Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl mx-auto p-10 transform transition-all duration-300 animate-scale-in">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                   <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                        {selected.tipo_actividad?.nombre || "TIPO DE ACTIVIDAD"}
                    </p>
                  <h2
                    id="actividad-modal-title"
                    className="text-3xl font-bold text-[#001D3D] leading-tight tracking-tight mt-1"
                  >
                    {selected.nombre_evento || "Detalles de la Actividad"}
                  </h2>
                </div>
                {/* Badge Fecha en Modal */}
                <span className="bg-[#EBF5FF] text-[#1D4ED8] text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap mt-2 flex items-center gap-1.5 uppercase tracking-wider">
                    {formatDateEs(selected.fecha)}
                </span>
              </div>

              {/* Sección de detalles específicos en modal */}
              <div className="mt-9 space-y-7">
                
                {/* DOCENTE Y CARRERA EN MODAL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 bg-gray-50 p-7 rounded-2xl border border-gray-100">
                    {/* DOCENTE */}
                    <div className="flex items-start gap-4">
                        <User className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Docente:</p>
                            <p className="text-[16px] font-medium text-[#111827] mt-0.5 leading-snug">
                                {selected.docente?.nombre || "No especificado"}
                            </p>
                        </div>
                    </div>
                    {/* CARRERA */}
                    <div className="flex items-start gap-4">
                        <BriefcaseBusiness className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Carrera:</p>
                            <p className="text-[16px] font-medium text-[#111827] mt-0.5 leading-snug">
                                {selected.carrera?.nombre || "No especificado"}
                            </p>
                        </div>
                    </div>
                     {/* HORARIO EN MODAL */}
                    <div className="flex items-start gap-4 sm:col-span-2">
                        <Clock3 className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Horario de Actividad:</p>
                            <p className="text-[16px] font-semibold text-[#111827] mt-1.5 flex items-center gap-2">
                                <span className="bg-[#EBF5FF] text-[#1D4ED8] font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                                    {selected.hora_inicio ? formatHour12(selected.hora_inicio) : "—"}
                                </span>
                                <span className="text-gray-400 font-normal"> a </span>
                                <span className="bg-[#EBF5FF] text-[#1D4ED8] font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                                    {selected.hora_fin ? formatHour12(selected.hora_fin) : "—"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* DESCRIPCIÓN */}
                <div className="text-gray-700">
                  <p className="text-base font-bold text-[#001D3D] mb-3 tracking-tight">Descripción y Asistencia</p>
                  <p className="leading-relaxed text-[15px] bg-white border border-gray-100 p-6 rounded-2xl text-gray-600">
                    {selected.descripcion_evento ||
                      selected.descripcion ||
                      selected.descripcion_asistencia ||
                      "No se proporcionó una descripción detallada para esta actividad."}
                  </p>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#001D3D] text-white font-semibold text-sm hover:bg-[#003566] transition-colors shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}