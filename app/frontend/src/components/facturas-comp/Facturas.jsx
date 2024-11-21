import React, { useState, useEffect } from "react";
import moment from "moment";
import FacturasBuscar from "./FacturasBuscar";
import FacturasListado from "./FacturasListado";
import FacturasRegistro from "./FacturasRegistro";
//import { articulosfamiliasService } from "../../services/articulosFamilias.service";
import { facturasService } from "../../services/facturas.services";
import modalDialogService from "../../services/modalDialog.service";

function Facturas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Email, setEmail] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

 const [Facturas, setFacturas] = useState(null); 

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    //console.log("mounting Articulos");
    async function BuscarFacturas() {
      let data = await facturasService.BuscarFact();
      setFacturas(data);
    }
    BuscarFacturas();
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
    const data = await facturasService.BuscarFact(Email, Activo, _pagina);
    console.log(data)
    setItems(data);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    console.log("esta es la data")
    console.log(item)
    const data = await facturasService.BuscarPorIdFact(item);
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
      IdFactura: 0,
      Email: null,
      FechaAlta: moment(new Date()).format("DD/MM/YYYY"),
      Activo: true,
    });
  }

  

  async function ActivarDesactivar(item) {

    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await facturasService.ActivarDesactivarFact(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item, id) {
    // agregar o modificar
    await facturasService.GrabarFact(item, id);
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
        Facturas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>
      {AccionABMC === "L" && (
        <FacturasBuscar
          Email={Email}
          setEmail={setEmail}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <FacturasListado
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
        <FacturasRegistro
          {...{ AccionABMC, Item, Grabar, Volver, Items }}
        />
      )}
    </div>
  );
}

export { Facturas };
