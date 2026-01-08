import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getActivities } from "../api/registrolab";

const formatDateEs = (value) => {
  if (!value) return "Fecha no disponible";
  const parsed = new Date(value);
  return parsed.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ActivityCards() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await getActivities();
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
        <div className="max-w-7xl mx-auto text-center text-gray-500 font-medium">
          Cargando actividades...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const dateLabel = formatDateEs(activity.fecha);

            return (
              <div
                key={activity.id ?? activity.nombre_evento}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-[#005a8d] tracking-tight">
                      {activity.nombre_evento || "Actividad"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {activity.tipo_actividad?.nombre || "Tipo de actividad"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#e8f4ff] text-[#005a8d] text-xs font-semibold px-3 py-1 rounded-full">
                      {dateLabel}
                    </span>
                    <button
                      type="button"
                      aria-label="Ver detalles de la actividad"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 text-[#005a8d] hover:bg-[#e8f4ff] hover:border-[#cfe6ff] transition-colors"
                      onClick={() => { setSelected(activity); setOpen(true); }}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {open && selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="actividad-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/50 opacity-100 animate-fade-in"
              onClick={() => setOpen(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 transform transition-all duration-200 animate-scale-in">
              <div className="flex items-start justify-between">
                <div>
                  <h2 id="actividad-modal-title" className="text-2xl font-semibold text-[#005a8d]">
                    {selected.nombre_evento}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selected.tipo_actividad?.nombre}
                  </p>
                </div>
                <span className="bg-[#e8f4ff] text-[#005a8d] text-xs font-semibold px-3 py-1 rounded-full">
                  {formatDateEs(selected.fecha)}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p className="font-medium mb-1">Descripción de asistencia</p>
                <p className="leading-relaxed">
                  {selected.descripcion_evento || selected.descripcion || selected.descripcion_asistencia || "Sin descripción"}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-[#005a8d] text-white hover:bg-[#00466f] transition-colors"
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
    