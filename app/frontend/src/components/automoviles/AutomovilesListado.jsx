import React from "react";
import moment from "moment";

export default function AutomovilesListado({
  Autos,
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
      <table className="table table-hover table-sm table-bordered table-stripe">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Marca</th>
            <th className="text-center">Fecha Lanzamiento</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Autos &&
            Autos.map((Auto) => (
              <tr key={Auto.Id}>
                <td>{Auto.Nombre}</td>
                <td>{Auto.Marca}</td>
                <td className="text-end">
                {moment(Auto.FechaLanzamiento).format("DD/MM/YYYY")}
                {console.log(Auto.FechaLanzamiento)}
                </td>
                <td>{Auto.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Auto)}
                  > Consultar
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Auto)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Auto.Activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Auto.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Auto)}
                  > {Auto.Activo ? "Desactivar" : "Activar"}
                    <i
                      className={"fa fa-" + (Auto.Activo ? "times" : "check")}
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
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
                console.log(e.target.value)
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>

          
        </div>
      </div>
    </div>
  );
}
