import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { Principal } from "./componentes/Principal";
import { PageNotFound } from "./componentes/PageNotFound";
import { Lista } from "./componentes/Lista";
import { About } from "./componentes/About";
import { useCallback, useEffect, useState } from "react";
import { ListadoContext } from "./context/ListadoContext";

function App() {
  const [listaCompra, setListaCompra] = useState([]);
  const urlListaCompra = process.env.REACT_APP_APP_ARTICULOS;
  const getListaCompra = useCallback(async () => {
    try {
      const response = await fetch(`${urlListaCompra}`);
      if (!response.ok)
        throw new Error("No se han recibido los datos esperados.");
      const datos = await response.json();
      setListaCompra(datos);
    } catch (error) {
      console.error(error.message);
    }
  }, [urlListaCompra]);
  useEffect(() => {
    getListaCompra();
  }, [getListaCompra]);
  return (
    <>
      <ListadoContext.Provider
        value={{
          listaCompra,
        }}
      >
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
      </ListadoContext.Provider>
    </>
  );
}

export default App;
