import { useState } from "react";

export const useFormulario = (datosProducto) => {
  const [datosFormulario, setDatosFormulario] = useState(datosProducto);

  const setData = (e) => {
    const elemento = e.target;
    setDatosFormulario({
      ...datosFormulario,
      [e.target.id]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "number"
          ? elemento.valueAsNumber
          : elemento.value,
    });
  };

  return {
    setData,
    datosFormulario,
    setDatosFormulario,
  };
};
