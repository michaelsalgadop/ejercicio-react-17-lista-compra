import { useCallback, useContext, useEffect, useState } from "react";
import { InfoArticulos } from "./InfoArticulos";
import { useNavigate, useParams } from "react-router-dom";
import { ListadoContext } from "../context/ListadoContext";
import { useFormulario } from "../hooks/useFormulario";

export const Formulario = () => {
  const { idProducto } = useParams();
  const { listaCompra, setListaCompra } = useContext(ListadoContext);
  const buscarProductoPorId = useCallback(
    () =>
      listaCompra.find(
        (producto) => parseInt(producto.id) === parseInt(idProducto)
      ),
    [idProducto, listaCompra]
  );
  const [productoEditar, setProductoEditar] = useState({
    id: idProducto,
    nombre: "",
    precio: 0.0,
    comprado: false,
  });
  const { setData, datosFormulario, setDatosFormulario } =
    useFormulario(productoEditar);
  const navigate = useNavigate();
  const volver = () => navigate("/lista");
  const crearEditarProducto = (e) => {
    e.preventDefault();
    try {
      if (datosFormulario.id === 0) return;
      if (idProducto) {
        setListaCompra(
          listaCompra.map((articulo) =>
            parseInt(articulo.id) === parseInt(idProducto)
              ? { ...articulo, ...datosFormulario }
              : articulo
          )
        );
      } else {
        setListaCompra([...listaCompra, datosFormulario]);
      }
      volver();
    } catch (error) {
      console.error(error.message);
    }
  };
  const getLastId = useCallback(
    () =>
      parseInt(
        listaCompra.reduce(
          (acumulador, producto) =>
            parseInt(producto.id) > acumulador
              ? (acumulador = parseInt(producto.id))
              : acumulador,
          0
        )
      ),
    [listaCompra]
  );
  useEffect(() => {
    if (listaCompra.length === 0) return;
    const productoEncontrado = buscarProductoPorId();
    setDatosFormulario((prev) =>
      !productoEncontrado
        ? {
            ...prev,
            id: getLastId() + 1,
          }
        : productoEncontrado
    );
  }, [listaCompra, getLastId, buscarProductoPorId, setDatosFormulario]);
  const { nombre, precio } = datosFormulario;
  return (
    <>
      <InfoArticulos accion={volver} esVolver={true}></InfoArticulos>
      <main className="principal espaciado">
        <h2 className="titulo-seccion">
          {idProducto ? "Editar" : "Crear"} artículo
        </h2>
        <form className="form" onSubmit={crearEditarProducto}>
          <div className="campo-formulario">
            <label className="label-formulario" htmlFor="nombre">
              Nombre:
            </label>
            <input
              className="input-formulario"
              type="text"
              onChange={setData}
              name="nombre"
              value={nombre}
              id="nombre"
            />
          </div>
          <div className="campo-formulario">
            <label className="label-formulario" htmlFor="precio">
              Precio:
            </label>
            <input
              className="input-formulario"
              type="number"
              name="precio"
              value={precio ? precio : 0}
              onChange={setData}
              id="precio"
            />
            <span className="moneda">€</span>
          </div>
          <button type="submit" className="btn-formulario">
            {idProducto ? "Modificar" : "Crear"}
          </button>
        </form>
      </main>
    </>
  );
};
