import { useContext } from "react";
import { ListadoContext } from "../context/ListadoContext";

export const InfoArticulos = (props) => {
  const { listaCompra, articulosComprados } = useContext(ListadoContext);
  const { accion, esVolver = false } = props;
  return (
    <section className="info espaciado bloque-superior">
      <i
        className={`icono fas fa-${esVolver ? "minus" : "plus"}-circle pointer`}
        onClick={accion}
      ></i>
      <p className="n-articulos">
        {articulosComprados}/{listaCompra.length} comprados
      </p>
    </section>
  );
};
