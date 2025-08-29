import { useEffect, useState } from 'react'
import { getRegistros } from '../api/registrolab'
import Header from './Header'

export default function RegistroLab() {
    const [registroLabs, setRegistroLabs] = useState([])
    const [filteredLabs, setFilteredLabs] = useState([])
    const [selectedLab, setSelectedLab] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [labsOptions, setLabsOptions] = useState([])

    const loadRegistroLab = async () => {
        const response = await getRegistros()
        setRegistroLabs(response.data)
        setFilteredLabs(response.data)

        // Extraer laboratorios únicos para el filtro
        const uniqueLabs = [...new Set(
            response.data.map(registro => registro.laboratorio_id.descripcion)
        )]
        setLabsOptions(uniqueLabs)
    }

    useEffect(() => {
        loadRegistroLab()
    }, [])
    function formatearHora12(hora24) {
        const [hora, minuto] = hora24.split(':');
        const hora12 = hora % 12 || 12;
        const periodo = hora < 12 ? 'AM' : 'PM';
        return `${hora12}:${minuto} ${periodo}`;
    }
    function formatShortDate(dateString) {
    // Asegura que la fecha se interprete correctamente añadiendo el timezone
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}
    useEffect(() => {
        // Aplicar filtros cuando cambian los valores
        let result = registroLabs

        if (selectedLab) {
            result = result.filter(registro =>
                registro.laboratorio_id.descripcion === selectedLab
            )
        }

        if (selectedDate) {
            result = result.filter(registro =>
                registro.fecha === selectedDate
            )
        }

        setFilteredLabs(result)
    }, [selectedLab, selectedDate, registroLabs])

    return (
        <div className='mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Header />
            {/* Panel de Filtros Compacto */}
            <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    {/* Filtro por Laboratorio */}
                    <div className="md:col-span-5">
                        <label htmlFor="laboratorio" className="block text-xs font-medium text-gray-600 mb-1">
                            Laboratorio
                        </label>
                        <div className="relative">
                            <select
                                id="laboratorio"
                                className="w-full pl-2 pr-8 py-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white"
                                value={selectedLab}
                                onChange={(e) => setSelectedLab(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {labsOptions.map((lab, index) => (
                                    <option key={index} value={lab}>{lab}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filtro por Fecha */}
                    <div className="md:col-span-5">
                        <label htmlFor="fecha" className="block text-xs font-medium text-gray-600 mb-1">
                            Fecha
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                id="fecha"
                                className="w-full pl-2 pr-8 py-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Botón Limpiar */}
                    <div className="md:col-span-2">
                        <button
                            className="w-full px-3 py-2 flex items-center justify-center gap-1 text-xs font-medium text-sky-700 bg-sky-50 rounded-md hover:bg-sky-100 transition-colors border border-sky-200"
                            onClick={() => {
                                setSelectedLab('')
                                setSelectedDate('')
                            }}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            {/* Resultados */}
            <div>
                
                {filteredLabs.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredLabs.map((registro) => (
                            <div key={registro.id} className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-all duration-200 group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-sky-800 group-hover:text-sky-600 transition-colors">
                                            {registro.laboratorio_id.descripcion}
                                        </h3>
                                        <p className="text-sm text-gray-500">{registro.asignatura_id.descripcion}</p>
                                    </div>
                                    <span className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {formatShortDate(registro.fecha)}
                                    </span>
                                </div>

                                <div className="space-y-3 text-gray-700">
                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 text-sky-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className="text-sm"><span className='font-medium'>Docente: </span>{registro.docentes_id.nombre}</p>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 text-sky-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p className="text-sm"><span className='font-medium'>Carrera: </span>{registro.carreras_id.descripcion}</p>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-sky-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-700">
                                                {formatearHora12(registro.hora_inicio)} - {formatearHora12(registro.hora_fin)}
                                            </span>
                                        </div>

                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${new Date(registro.fecha) >= new Date()
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {new Date(registro.fecha) >= new Date() ? 'Próxima' : 'Completada'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-700">No se encontraron reservaciones</h3>
                        <p className="mt-1 text-sm text-gray-500">Intenta ajustar tus filtros de búsqueda.</p>
                        <button
                            onClick={() => { setSelectedLab(''); setSelectedDate(''); }}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}