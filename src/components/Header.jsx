import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // iconos (hamburguesa y cerrar)

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 mb-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo / título */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold text-green-700 hover:text-green-800 transition-colors"
        >
          Consulta & Reservaciones
        </Link>

        {/* Botón hamburguesa (solo en móvil) */}
        <button
          className="md:hidden text-green-700 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Acciones en desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/registro-lab"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all"
          >
            Nuevo Registro
          </Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {open && (
        <div className="md:hidden px-4 mt-2 space-y-2">
          <Link
            to="/registro-lab"
            className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all"
            onClick={() => setOpen(false)}
          >
            Nuevo Registro
          </Link>
        </div>
      )}
    </nav>
  );
}
