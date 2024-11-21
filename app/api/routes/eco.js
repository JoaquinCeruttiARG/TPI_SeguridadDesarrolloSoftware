const express = require("express");
const router = express.Router();

// devuelve una tabla con los parametros pasados desde un formulario html por post o get
router.get("/eco", (req, res) => {

 

  let table = generarTabla(req.query);
  
  res.send(table);
});

router.post("/eco", (req, res) => {
  let table = generarTabla(req.body);
  res.send(table);
});

function generarTabla(datos) {
  let table = '<table border="1">';
  for (const key in datos) {
    if (Object.hasOwnProperty.call(datos, key)) {
      const element = datos[key];
      table += `<tr><td>${key}</td><td>${element}</td></tr>`;
    }
  }
  table += "<table>";
  return table;
}

module.exports = router;

