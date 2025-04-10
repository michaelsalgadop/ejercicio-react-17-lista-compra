export const useCRUD = () => {
  const crear = async (urlAPI, cuerpo) => {
    const response = await fetch(urlAPI, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    const nuevoObjeto = response.ok ? await response.json() : null;
    return { ok: response.ok, objeto: nuevoObjeto };
  };
  const actualizar = async (urlAPI, cuerpo) => {
    const response = await fetch(urlAPI, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    return { ok: response.ok };
  };
  const eliminar = async (urlAPI) => {
    const response = await fetch(urlAPI, {
      method: "DELETE",
    });
    return { ok: response.ok };
  };
  return {
    crear,
    actualizar,
    eliminar,
  };
};
