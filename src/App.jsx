import { BrowserRouter,Route,Routes } from "react-router-dom"
import RegistroLab from "./components/RegistroLab"
import RegistroLabForm from "./components/RegistroLabForm"
function App() {

  return (
    <BrowserRouter>
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<RegistroLab/>} />
        <Route path="/registro-lab" element={<RegistroLabForm/>} />
        <Route path="/editar-registro-lab/:id" element={<RegistroLabForm/>} />
        
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
