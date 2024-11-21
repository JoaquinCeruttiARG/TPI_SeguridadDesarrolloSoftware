import React from 'react';

// Agregar en este archivo la funcion .map aplicada a la lista para poder mostrar por pantalla cada fila que se obntendra de la bd o del archivo donde esta la
// lista mock. Prestar atencion al orden en el que estan los titulos de las columnas de la tabla para que cada dato este en donde le corresponde:
const ListadoFacturas = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <h3>Jugadores</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>IdFactura</th>
            <th>Email</th>
            <th>FechaAlta</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((factura) => (
            <tr key={factura.IdFactura}>
            <th>{factura.Email}</th>
            <th>{factura.FechaAlta}</th>
            <th>{factura.Activo}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// No olvidarse de exportar:
export default ListadoFacturas;
