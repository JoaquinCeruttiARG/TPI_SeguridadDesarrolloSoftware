const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const convertirActivo = function (activo) {
  if(activo == 'true'){ return 1}
  if (activo == 'false') {return 0}
  else {return `%`}
}
router.get("/api/equipos", async function(req, res, next){
    
    if (req.query.Pagina) {
        let where = {};
        if (req.query.Nombre != undefined && req.query.Nombre !== "") {
          where.Nombre = {
            [Op.like]: "%" + req.query.Nombre + "%",
          };
        }
        const Pagina = req.query.Pagina ?? 1;
        const TamañoPagina = 10;
        const { count, rows } = await db.equipos.findAndCountAll({
          attributes: [
            "IdEquipo",
            "Nombre",
            "FechaFundacion",
            "Activo",
          ],
          order: [["IdEquipo", "ASC"]],
          where: {
            [Op.and]:[
              {Nombre: {[Op.like]: `%${req.query.Nombre}%`}},
              {Activo: {[Op.like]: `%${convertirActivo(req.query.Activo)}%`}
          }]
          },
          offset: (Pagina - 1) * TamañoPagina,
          limit: TamañoPagina,
        });
    
        return res.json({ Items: rows, RegistrosTotal: count });
        
      } else {
        let items = await db.equipos.findAll({
          attributes: [
            "IdEquipo",
            "Nombre",
            "FechaFundacion",
            "Activo",
          ],
          order: [["IdEquipo", "ASC"]],
          where: {
            [Op.and]:[
              {Nombre: {[Op.like]: `%${req.query.Nombre}%`}},
              {Activo: {[Op.like]: `%${convertirActivo(req.query.Activo)}%`}
          }]
          },
        });
        res.json(items);
      }
});
router.get("/api/equipos/:id", async function(req, res, next){
    let item = await db.equipos.findOne({
        attributes: [
          "IdEquipo",
          "Nombre",
          "FechaFundacion",
          "Activo",
        ],
        where: { IdEquipo: req.params.id },
      });
      res.json(item);
});
    
router.post("/api/equipos/", async (req, res) => {
      try {
        let data = await db.equipos.create({
          Nombre: req.body.Nombre,
          FechaFundacion: req.body.FechaFundacion,
          Activo: req.body.Activo,
        });
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validacion, los devolvemos
          let messages = '';
          err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
          res.status(400).json({message : messages});
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
});
router.put("/api/equipos/:id", async (req, res) => {
    try {
      let item = await db.equipos.findOne({
        attributes: [
          "IdEquipo",
          "Nombre",
          "FechaFundacion",
          "Activo",
        ],
        where: { IdEquipo: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Equipo no encontrado" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.FechaFundacion = req.body.FechaFundacion;
      item.Activo = req.body.Activo;
      await item.save();
  
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
router.delete("/api/equipos/:id", async (req, res) => {
  
    let bajaFisica = false;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.equipos.destroy({
        where: { IdEquipo: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        let data = await db.sequelize.query(
          "UPDATE equipos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdEquipo = :IdEquipo",
          {
            replacements: { IdEquipo: +req.params.id },
          }
        );
        res.sendStatus(200);
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validacion, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
  });
module.exports= router;