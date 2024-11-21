import React, { useState, useEffect } from "react";
import moment from "moment";
import EquiposBuscar from "./EquiposBuscar";
import EquiposListado from "./EquiposListado";
import EquiposRegistro from "./EquiposRegistro";
//import { articulosfamiliasService } from "../../services/articulosFamilias.service";
import { equiposService } from "../../services/equipos.service";
import modalDialogService from "../../services/modalDialog.service";

function Equipos() {
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

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

 const [Equipos, setEquipos] = useState(null); //?????????

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    //console.log("mounting Articulos");
    async function BuscarEquipos() {
      let data = await equiposService.Buscar();
      setEquipos(data);
    }
    BuscarEquipos();
    return () => {
      //console.log("unmounting Articulos");
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
    const data = await equiposService.Buscar(Nombre, Activo, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await equiposService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdEquipo: 0,
      Nombre: null,
      FechaFundacion: moment(new Date()).format("YYYY-MM-DD"),
      Activo: true,
    });
  }

 

  async function ActivarDesactivar(item) {
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
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await equiposService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    await equiposService.Grabar(item);
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
        Equipos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <EquiposBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <EquiposListado
          {...{
            Items,
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

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <EquiposRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Equipos };
