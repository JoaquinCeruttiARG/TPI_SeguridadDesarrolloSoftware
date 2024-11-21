import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceAutomoviles;

//aca deberia cambiar algunas cosas, las querys que recibo aca no estan para los equipos
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(auto) {
  const resp = await httpService.get(urlResource + "/" + auto.Id);
  return resp.data;
}

async function ActivarDesactivar(auto) {
  await httpService.delete(urlResource + "/" + auto.Id);
}

async function Grabar(auto) {
  if (auto.Id === 0) {
    await httpService.post(urlResource, auto);
  } else {
    await httpService.put(urlResource + "/" + auto.Id, auto);
  }
}

export const automovilesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};