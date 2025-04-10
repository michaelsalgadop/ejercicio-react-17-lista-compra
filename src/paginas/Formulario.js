import { useCallback, useContext, useEffect, useState } from "react";
import { InfoArticulos } from "../componentes/InfoArticulos";
import { useNavigate, useParams } from "react-router-dom";
import { ListadoContext } from "../context/ListadoContext";
import { useFormulario } from "../hooks/useFormulario";
import { useCRUD } from "../hooks/useCRUD";

export const Formulario = () => {
  const { idProducto } = useParams();

  const { listaCompra, setListaCompra, urlListaCompra, buscarProductoPorId } =
    useContext(ListadoContext);

  const [productoEditar, setProductoEditar] = useState({
    id: idProducto,
    nombre: "",
    precio: 0.0,
    comprado: false,
  });

  const { setData, datosFormulario, setDatosFormulario } =
    useFormulario(productoEditar);
  const { crear, actualizar } = useCRUD();
  const navigate = useNavigate();

  const volver = () => navigate("/lista");

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      if (datosFormulario.id === 0) return;
      const respuesta = await crear(urlListaCompra, datosFormulario);
      if (respuesta.ok) {
        const nuevoArticulo = respuesta.objeto;
        setListaCompra([...listaCompra, nuevoArticulo]);
      }
      volver();
    } catch (error) {
      console.error(error.message);
    }
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    try {
      if (datosFormulario.id === 0) return;
      const nuevoArticulo = {
        ...buscarProductoPorId(idProducto),
        ...datosFormulario,
      };
      const respuesta = await actualizar(
        urlListaCompra + idProducto,
        nuevoArticulo
      );
      if (respuesta.ok) {
        setListaCompra(
          listaCompra.map((articulo) =>
            parseInt(articulo.id) === parseInt(idProducto)
              ? { ...articulo, ...datosFormulario }
              : articulo
          )
        );
      }
      volver();
    } catch (error) {
      console.error(error.message);
    }
  };

  const getLastId = useCallback(
    () =>
      parseInt(
        listaCompra.length > 0
          ? listaCompra.reduce(
              (acumulador, producto) =>
                parseInt(producto.id) > acumulador
                  ? (acumulador = parseInt(producto.id))
                  : acumulador,
              0
            )
          : 0
      ),
    [listaCompra]
  );

  useEffect(() => {
    const productoEncontrado = buscarProductoPorId(idProducto);
    setDatosFormulario((prev) =>
      !productoEncontrado
        ? {
            ...prev,
            id: (getLastId() + 1).toString(),
          }
        : productoEncontrado
    );
  }, [
    listaCompra,
    getLastId,
    buscarProductoPorId,
    setDatosFormulario,
    idProducto,
  ]);
  const { nombre, precio } = datosFormulario;
  return (
    <>
      <InfoArticulos accion={volver} esVolver={true}></InfoArticulos>
      <main className="principal espaciado">
        <h2 className="titulo-seccion">
          {idProducto ? "Editar" : "Crear"} artículo
        </h2>
        <form
          className="form"
          onSubmit={idProducto ? editarProducto : crearProducto}
        >
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
