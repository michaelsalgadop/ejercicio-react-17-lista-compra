import { useContext, useMemo } from "react";
import { ListadoContext } from "../context/ListadoContext";

export const Lista = () => {
  const { listaCompra } = useContext(ListadoContext);
  const articulosComprados = useMemo(
    () => listaCompra.filter((articulo) => articulo.comprado).length,
    [listaCompra]
  );
  const totalComprado = useMemo(
    () =>
      listaCompra
        .filter((articulo) => articulo.comprado)
        .reduce(
          (acumulador, articulo) =>
            articulo.precio ? acumulador + articulo.precio : acumulador,
          0.0
        ),
    [listaCompra]
  );
  return (
    <>
      <section className="info espaciado bloque-superior">
        <i className="icono fas fa-plus-circle"></i>
        <p className="n-articulos">
          {articulosComprados}/{listaCompra.length} comprados
        </p>
      </section>
      <main className="principal espaciado">
        <ul className="articulos">
          {listaCompra.map(({ id, nombre, precio, comprado }) => (
            <li className="articulo" key={id}>
              <input type="checkbox" className="marcar" checked={comprado} />
              <span className="nombre">{nombre}</span>
              <span className="precio">
                {precio ? `${precio.toFixed(2)}€` : ""}
              </span>
              <i className="borrar fas fa-times"></i>
            </li>
          ))}
        </ul>
        <span className="precio-total">{totalComprado.toFixed(2)}€</span>
      </main>
    </>
  );
};
