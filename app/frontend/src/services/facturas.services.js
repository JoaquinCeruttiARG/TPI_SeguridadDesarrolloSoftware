import {config} from "../config";
import httpService from "./http.services";

const urlResource = config.urlResourceFacturas;

//aca deberia cambiar algunas cosas, las querys que recibo aca no estan para los equipos
async function BuscarFact(Email, Activo, Pagina) {
  const resp = await httpService.get(urlResource + "/", {
    params: { Email, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorIdFact(item) {
  const Email = item.Email
  const Activo = item.Activo
  // const peticion = urlResource + "/?Email="+mail+"&Activo="+act
  // console.log(peticion)
  const resp = await httpService.get(urlResource + "/",{
    params: {Email, Activo}
  });
  console.log(resp.data)
  return resp.data;
}

async function ActivarDesactivarFact(item) {
  const IdFactura = item.IdFactura
  console.log( item.IdFactura)
  await httpService.delete(urlResource + "/" + IdFactura);
}

async function GrabarFact(item, id) {
  if (!id ) {
    await httpService.post(urlResource, item);
  } else {
    console.log(id)
    await httpService.put(urlResource + "/" + id, item);
  }
}


export const facturasService = {
  BuscarFact,
  BuscarPorIdFact,
  ActivarDesactivarFact,
  GrabarFact
};