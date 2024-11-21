const express = require("express");
const routerFact = express.Router();
const factService = require("../services/facturas-services")

routerFact.get("/api/facturas/", async function (req, res) {
  try {
    console.log(req.query.Email, req.query.Activo)
    const rdo = await factService.getFacturasByFilter(req.query.Email, req.query.Activo) 
    return res.json(rdo)
} catch {
  console.log("NO SE PUDO ACCEDER A LA PAGINA")
}

});

routerFact.post("/api/facturas/", async (req, res) => {
  try {
    const rdo = await factService.createFacturas(req.body.Email, req.body.FechaAlta, req.body.Activo); 
    return res.json(rdo)
} catch (err) {
  console.log(err)
}
});

routerFact.put("/api/facturas/:id", factService.modifyFacturas)

routerFact.delete("/api/facturas/:id", factService.deleteFacturas);

routerFact.get("/api/facturas/:id", factService.getById);

module.exports = routerFact;
