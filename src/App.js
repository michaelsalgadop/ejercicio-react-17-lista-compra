import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { Principal } from "./componentes/Principal";
import { PageNotFound } from "./componentes/PageNotFound";
import { Lista } from "./componentes/Lista";
import { About } from "./componentes/About";

function App() {
  return (
    <>
      <Router>
        <Cabecera></Cabecera>
        <Routes>
          {/* Elimina `exact`, ya no es necesario, las rutas coinciden exactamente por defecto */}
          <Route path="/" element={<Principal />}></Route>
          <Route path="/lista" element={<Lista />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
