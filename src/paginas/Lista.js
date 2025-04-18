import { useContext, useMemo } from "react";
import { ListadoContext } from "../context/ListadoContext";
import { useNavigate } from "react-router-dom";
import { InfoArticulos } from "../componentes/InfoArticulos";
import { useCRUD } from "../hooks/useCRUD";

export const Lista = () => {
  const { listaCompra, setListaCompra, urlListaCompra, buscarProductoPorId } =
    useContext(ListadoContext);
  const navigate = useNavigate();
  const { eliminar, actualizar } = useCRUD();
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

  const comprarProducto = async (idProducto) => {
    const producto = buscarProductoPorId(idProducto);
    const respuesta = await actualizar(urlListaCompra + idProducto, {
      ...producto,
      comprado: !producto.comprado,
    });

    if (respuesta.ok) {
      setListaCompra(
        listaCompra.map((articulo) =>
          articulo.id === idProducto
            ? { ...articulo, comprado: !articulo.comprado }
            : articulo
        )
      );
    }
  };
  const crearProducto = () => navigate("/productos/crear-producto");
  const modificarProducto = (id) => navigate(`/productos/${id}`);
  const eliminarProducto = async (idProducto) => {
    const respuesta = await eliminar(urlListaCompra + idProducto);
    if (respuesta.ok) {
      setListaCompra(
        listaCompra.filter((articulo) => articulo.id !== idProducto)
      );
    }
  };
  return (
    <>
      <InfoArticulos accion={crearProducto}></InfoArticulos>
      <main className="principal espaciado">
        {listaCompra.length === 0 ? (
          <p className="text-center">No hay productos a mostrar ahora mismo.</p>
        ) : (
          <>
            <ul className="articulos">
              {listaCompra.map(({ id, nombre, precio, comprado }) => (
                <li className="articulo pointer" key={id}>
                  <input
                    type="checkbox"
                    className="marcar"
                    checked={comprado}
                    onChange={() => comprarProducto(id)}
                  />
                  <span
                    className={`nombre ${comprado ? "tachado" : ""}`}
                    onClick={() => modificarProducto(id)}
                  >
                    {nombre}
                  </span>
                  <span
                    className="precio pointer"
                    onClick={() => modificarProducto(id)}
                  >
                    {precio ? `${precio.toFixed(2)}€` : ""}
                  </span>
                  <i
                    className="borrar fas fa-times"
                    onClick={() => eliminarProducto(id)}
                  ></i>
                </li>
              ))}
            </ul>
            <span className="precio-total">{totalComprado.toFixed(2)}€</span>
          </>
        )}
      </main>
    </>
  );
};
