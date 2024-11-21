import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceEquipos;

//aca deberia cambiar algunas cosas, las querys que recibo aca no estan para los equipos
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdEquipo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdEquipo);
}

async function Grabar(item) {
  if (item.IdEquipo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdEquipo, item);
  }
}

export const equiposService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};