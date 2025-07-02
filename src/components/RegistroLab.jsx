import { useEffect, useState } from 'react'
import { getRegistros } from '../api/registrolab'

export default function RegistroLab() {
    const [refistroLabs, setRegistroLabs] = useState([])

    const loadRegistroLab = async () => {

        const response = await getRegistros()
        setRegistroLabs(response.data)
        // console.log(response)
    }
    useEffect(() => {
        loadRegistroLab()
    }, [])
    loadRegistroLab()
    return (
        <div className='mt-8'>
            <h1 className="text-3xl font-bold text-sky-900">Reservaciones de Laboratorios</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 text-white'>
                {
                    refistroLabs.map((registro) => (
                        <div key={registro.id} className="bg-sky-900 p-4 rounded-lg shadow">
                            <p>{registro.carrera}</p>
                            <p><span className='font-bold'>Asignatura: </span>{registro.asignatura}</p>
                            <p><span className='font-bold'>Docente: </span>{registro.docente}</p>
                            <p><span className='font-bold'>Hora de Inicio: </span>{registro.horaEntrada}</p>
                            <p><span className='font-bold'>Hora de Fin: </span>{registro.horaSalida}</p>
                            <div className='mt-4'>
                                <button className='bg-green-600 text-white px-2 py-1 rounded-lg'>Editar</button>
                                <button className='bg-red-600 text-white px-2 py-1 rounded-lg ml-2'>Eliminar</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}
