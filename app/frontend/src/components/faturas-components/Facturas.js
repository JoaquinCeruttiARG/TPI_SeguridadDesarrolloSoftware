import React, { useForm } from 'react-hook-form';
import { useEffect, useState} from 'react';
import { facturasServices } from '../../services/facturas.services';
import ListadoFacturas from './ListadoFacturas';
const Facturas = () => {
  const [lista, setLista] = useState();

  const { register, handleSubmit } = useForm();
  const buscarFacturas = async (idFactura) => {
    try{
      const response = await facturasServices.findFacturas(idFactura)
      setLista(response)

    } catch {
      alert(`Couldn't find facturas`)
    }
  }
  useEffect(() =>{
    const traerJugadores = async () => {
      const rdo = await facturasServices.findFacturas()
      setLista(rdo)
    }
    traerJugadores()
  }, [])
  const onSubmit = (data) => {
    buscarFacturas(data.filtro, data.orden)
    console.log("Programar búsqueda y populado de la grilla");

  };

  return (
    <div className="container">
      <h1>Formulario de Búsqueda</h1>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Id:</label>
              <input type="text" className="form-control" {...register('idFactura')} />
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      <ListadoFacturas lista={lista} />
    </div>
  );
};

export default Facturas;
