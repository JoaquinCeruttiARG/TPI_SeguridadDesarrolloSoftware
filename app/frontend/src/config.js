const urlServidor = "http://localhost:3002"



const urlResourceEquipos = urlServidor + "/api/equipos";
const urlResourceAutomoviles = urlServidor + "/api/automoviles"
const urlResourceFacturas = urlServidor + "/api/facturas";
const urlResourceProvincias = urlServidor + "/api/provincias";
const urlLogin = urlServidor + "/api/login"

export const config = {
    urlServidor,
    urlResourceEquipos,
    urlResourceAutomoviles,
    urlResourceFacturas,
    urlResourceProvincias,
    urlLogin
}