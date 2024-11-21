import React from "react";
import moment from "moment";

export default function FacturasListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  // mejorar performance
  //console.log("render ArticulosListado", [Items]); //para ver cuando se renderiza y luego mejoramos con el  hoock useMemo


  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">IdFactura</th>
            <th className="text-center">Email</th>
            <th className="text-center">FechaAlta</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Fact) => (
              <tr key={Fact.IdFactura}>
                <td>{Fact.IdFactura}</td>
                <td>{Fact.Email ? Fact.Email : "No ingresó su email"}</td>
                <td>{Fact.FechaAlta}</td>
                <td>{Fact.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Fact)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Fact.Activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Fact.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Fact)}
                  > {Fact.Activo ? "Desactivar" : "Activar"}
                    <i
                      className={"fa fa-" + (Fact.Activo ? "times" : "check")}
                    ></i>
                  </button>

                


                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
          </div>
          <div className="col text-center">
          </div>

          
        </div>
      </div>
    </div>
  );
}
