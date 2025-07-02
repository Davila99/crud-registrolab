import { Link } from "react-router"


export default function Header() {
  return (
    <nav className=' py-4 mb-2'>
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold">Reservaciones de Laboratorios</Link>
            <div>
            <Link to="/registro-lab" className="bg-green-600 text-white px-4 py-2 rounded-lg">Nuevo Registro</Link>
            </div>
        </div>        
    </nav>
  )
}
