import { Link } from "react-router"


export default function Header() {
  return (
   <nav className="bg-white shadow-md py-4 mb-4">
  <div className="container mx-auto flex justify-between items-center px-4">
    {/* Logo / título */}
    <Link to="/" className="text-2xl md:text-3xl font-extrabold text-green-700 hover:text-green-800 transition-colors">
      Consulta & Reservaciones de Laboratorios
    </Link>

    {/* Acciones */}
    <div className="flex items-center gap-4">
      <Link 
        to="/registro-lab" 
        className="hidden md:inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all"
      >
        Nuevo Registro
      </Link>
    </div>
  </div>
</nav>

  )
}
