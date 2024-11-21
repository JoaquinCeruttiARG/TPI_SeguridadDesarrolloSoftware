const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

const convertirActivo = function (activo) {
  if(activo == 'true'){ return 1}
  if (activo == 'false') {return 0}
  else {return `%`}
}

router.get("/api/provincias", async function(req, res, next){
    
  if (req.query.Pagina) {
      let where = {};
      if (req.query.Nombre != undefined && req.query.Nombre !== "") {
        where.Nombre = {
          [Op.like]: "%" + req.query.Nombre + "%",
        };
      }
      const Pagina = req.query.Pagina ?? 1;
      const TamañoPagina = 10;
      const { count, rows } = await db.provincias.findAndCountAll({
        attributes: [
          "IdProvincia",
          "Nombre",
          "FechaFundacion",
          "Activo",
        ],
        order: [["IdProvincia", "ASC"]],
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
      let items = await db.provincias.findAll({
        attributes: [
          "IdProvincia",
          "Nombre",
          "FechaFundacion",
          "Activo",
        ],
        order: [["IdProvincia", "ASC"]],
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


router.get("/api/provincias/:id", async function(req, res, next){
    let item = await db.provincias.findOne({
        attributes: [
          "IdProvincia",
          "Nombre",
          "FechaFundacion",
          "Activo",
        ],
        where: { IdProvincia: req.params.id },
      });
      res.json(item);
});
    
router.post("/api/provincias/", async (req, res) => {
      try {
        let data = await db.provincias.create({
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

router.put("/api/provincias/:id", async (req, res) => {
    try {
      let item = await db.provincias.findOne({
        attributes: [
          "IdProvincia",
          "Nombre",
          "FechaFundacion",
          "Activo",
        ],
        where: { IdProvincia: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Provincia no encontrada!" });
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

router.delete("/api/provincias/:id", async (req, res) => {
  
    let bajaFisica = false;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.provincias.destroy({
        where: { IdProvincia: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        let data = await db.sequelize.query(
          "UPDATE provincias SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdProvincia = :IdProvincia",
          {
            replacements: { IdProvincia: +req.params.id },
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