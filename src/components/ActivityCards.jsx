import { useEffect, useState } from "react";
import { Clock, School, User } from "lucide-react";
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
            const carrera = "Ingenieria en Sistemas III";
            const horario = "08:00 - 10:00 AM";

            return (
              <div
                key={activity.id ?? activity.nombre_evento}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#005a8d]">
                      {activity.nombre_evento || "Actividad"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {activity.tipo_actividad?.nombre || "Tipo de actividad"}
                    </p>
                  </div>
                  <span className="bg-[#e8f4ff] text-[#005a8d] text-xs font-semibold px-3 py-1 rounded-full">
                    {dateLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                    <User className="h-5 w-5 text-[#38b6ff]" />
                    <div>
                      <p className="text-xs text-gray-400">Docente</p>
                      <p className="font-medium">
                        {activity.descripcion_asistencia || "Por definir"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <School className="h-5 w-5 text-[#38b6ff]" />
                    <div>
                      <p className="text-xs text-gray-400">Carrera</p>
                      <p className="font-medium">{carrera}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#38b6ff]" />
                    <span className="font-medium">{horario}</span>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Completada
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
