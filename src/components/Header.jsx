import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    <nav className="bg-skiblue shadow-md border-b-4 border-yellow-400 py-4 mb-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold text-blue-900 hover:text-blue-700 transition-colors"
        >
          URACCAN.<span className="text-yellow-400">Reservation.</span>
          <span className ="text-green-600">Lab</span>
        </Link>

        <button
          className="md:hidden text-blue-900 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/registro-lab"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition-all font-semibold"
          >
            Nuevo Registro
          </Link>
          <button
            type="button"
            className="px-4 py-2 rounded-xl border-2 border-blue-900 text-blue-900 hover:bg-blue-50 transition-all font-medium"
            onClick={onOpenSupport}
          >
            Soporte
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 mt-2 space-y-2 pb-4">
          <Link
            to="/registro-lab"
            className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-center shadow-sm"
            onClick={() => setOpen(false)}
          >
            Nuevo Registro
          </Link>
          <button
            type="button"
            className="block w-full border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-xl hover:bg-blue-50"
            onClick={() => { setOpen(false); onOpenSupport(); }}
          >
            Soporte
          </button>
        </div>
      )}

      {supportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={onCloseSupport} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 border-t-8 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900">Acceso a Soporte</h2>
            <p className="mt-1 text-sm text-gray-500">Ingresa el PIN de 6 dígitos para continuar.</p>

            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Código PIN</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={onChangePin}
                className={`w-full rounded-xl px-3 py-3 border-2 text-2xl tracking-[1em] text-center ${error ? "border-red-500 focus:ring-red-500" : "border-gray-100 focus:ring-blue-900"}`}
                placeholder="••••••"
              />
              {error && <p className="mt-2 text-sm text-red-600 font-medium text-center">{error}</p>}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-500 font-semibold hover:text-gray-700"
                onClick={onCloseSupport}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-lg"
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