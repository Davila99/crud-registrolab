import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // iconos (hamburguesa y cerrar)

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onOpenSupport = () => {
    setSupportOpen(true);
    setError("");
    setPin("");
  };

  const onCloseSupport = () => {
    setSupportOpen(false);
    setError("");
  };

  const onChangePin = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(digits);
    if (error) setError("");
  };

  const onSubmitPin = () => {
    if (pin === "202631") {
      setSupportOpen(false);
      navigate("/actividades");
    } else {
      setError("PIN incorrecto. Intenta nuevamente.");
    }
  };

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
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-green-600 text-green-700 hover:bg-green-50 shadow-sm transition-all"
            onClick={onOpenSupport}
          >
            Soporte
          </button>
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
          <button
            type="button"
            className="block w-full border border-green-600 text-green-700 px-4 py-2 rounded-xl shadow-sm transition-all hover:bg-green-50"
            onClick={() => { setOpen(false); onOpenSupport(); }}
          >
            Soporte
          </button>
        </div>
      )}

      {supportOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="support-modal-title"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onCloseSupport} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-start justify-between">
              <h2 id="support-modal-title" className="text-xl font-semibold text-green-700">Acceso a Soporte</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">Ingresa el PIN de 6 dígitos para continuar.</p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pin-input">PIN</label>
              <input
                id="pin-input"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pin}
                onChange={onChangePin}
                className={`w-full rounded-lg px-3 py-2 border text-lg tracking-widest text-center ${error ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"}`}
                placeholder="••••••"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "pin-error" : undefined}
              />
              {error && (
                <p id="pin-error" className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onCloseSupport}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                onClick={onSubmitPin}
              >
                Acceder
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
