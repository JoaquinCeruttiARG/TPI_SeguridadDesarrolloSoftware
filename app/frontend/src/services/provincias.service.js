import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceProvincias;

//aca deberia cambiar algunas cosas, las querys que recibo aca no estan para los equipos
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdProvincia);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdProvincia);
}

async function Grabar(item) {
  if (item.IdProvincia === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdProvincia, item);
  }
}

export const provinciasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};