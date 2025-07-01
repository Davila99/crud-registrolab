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
        <div>RegistroLab</div>
    )
}
