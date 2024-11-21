import React, { useState, useEffect } from "react";
import moment from "moment";
import AutomovilesBuscar from "./AutomovilesBuscar";
import AutomovilesListado from "./AutomovilesListado";
import AutomovilesRegistro from "./AutomovilesRegistro";
//import { articulosfamiliasService } from "../../services/articulosFamilias.service";
import { automovilesService } from "../../services/automoviles.service";
import modalDialogService from "../../services/modalDialog.service";

function Automoviles() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Autos, setAutos] = useState(null);
  const [Auto, setAuto] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

 const [Automoviles, setAutomoviles] = useState(null); //?????????

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    //console.log("mounting Articulos");
    async function BuscarAutomoviles() {
      let data = await automovilesService.Buscar();
      setAutomoviles(data);
    }
    BuscarAutomoviles();
    return () => {
      //console.log("unmounting Automoviles");
    };
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(false);
    const data = await automovilesService.Buscar(Nombre, Activo, _pagina);
    setAutos(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await automovilesService.BuscarPorId(item);
    setAuto(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(auto) {
    BuscarPorId(auto, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(auto) {
    if (!auto.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(auto, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setAuto({
      Id: 0,
      Nombre: null,
      FechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
      Activo: true,
    });
  }

  

  async function ActivarDesactivar(auto) {
    // const resp = window.confirm(
    //   "Esta seguro que quiere " +
    //     (item.Activo ? "desactivar" : "activar") +
    //     " el registro?"
    // );
    // if (resp) {
    //     await articulosService.ActivarDesactivar(item);
    //     Buscar();
    // }

    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (auto.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await automovilesService.ActivarDesactivar(auto);
        await Buscar();
      }
    );
  }

  async function Grabar(auto) {
    // agregar o modificar
    await automovilesService.Grabar(auto);
    await Buscar();
    Volver();

    modalDialogService.Alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente.",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "success"
    );

    // setTimeout(() => {
    //   alert(
    //     "Registro " +
    //       (AccionABMC === "A" ? "agregado" : "modificado") +
    //       " correctamente."
    //   );
    // }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  // mejorar performance
  // const memoArticulosListado = useMemo(
  //   () => (
  //     <ArticulosListado
  //       Items={Items}
  //       Consultar={Consultar}
  //       Modificar={Modificar}
  //       ActivarDesactivar={ActivarDesactivar}
  //       Pagina={Pagina}
  //       RegistrosTotal={RegistrosTotal}
  //       Paginas={Paginas}
  //       Buscar={Buscar}
  //     />
  //   ),
  //   [Items]
  // );

  return (
    <div>
      <div className="tituloPagina">
        Automoviles <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <AutomovilesBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Autos?.length > 0 && (
        <AutomovilesListado
          {...{
            Autos,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Autos?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <AutomovilesRegistro
          {...{ AccionABMC, Auto, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Automoviles };
