const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// funcion para pasar el Activo que viene de Sequelize en "true" o "false" a 1 o 0 respectivamente:
const convertirActivo = function (activo) {
  if(activo == 'true') {return 1}
  if (activo == 'false') {return 0}
  else {return '%'}
}



router.get("/api/automoviles", async function(req, res, next){
  if (req.query.Pagina) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.automoviles.findAndCountAll({
      attributes: [
        "Id",
        "Nombre",
        "Marca",
        "FechaLanzamiento",
        "Activo",
      ],
      order: [["Id", "ASC"]],
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
    
  }
  else {
            let items = await db.automoviles.findAll({
              attributes: [
                "Id",
                "Nombre",
                "Marca",
                "FechaLanzamiento",
                "Activo"
              ],
              where: {[Op.and]: [
                  {
                    Nombre: { [Op.like]: `${req.query.Nombre}%`}
                  },
                  {
                    Activo: {[Op.like]: `${convertirActivo(req.query.Activo)}`}
                  }
              ]},
              order: [["Id", "ASC"]],
            });
            res.json(items);
          }
        }
    );
    router.get("/api/automoviles/:id", async function(req, res, next){
        let item = await db.automoviles.findOne({
            attributes: [
              "Id",
              "Nombre",
              "Marca",
              "FechaLanzamiento",
              "Activo"
            ],
            where: { Id: req.params.id },
          });
          res.json(item);
    });
        
    router.post("/api/automoviles/", async (req, res) => {
          try {
            let data = await db.automoviles.create({
              Nombre: req.body.Nombre,
              Marca: req.body.Marca,
              FechaLanzamiento: req.body.FechaLanzamiento,
              Activo: req.body.Activo
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
    
    router.put("/api/automoviles/:id", async (req, res) => {
        try {
          let item = await db.automoviles.findOne({
            attributes: [
              "Id",
              "Nombre",
              "Marca",
              "FechaLanzamiento"
            ],
            where: { Id: req.params.id },
          });
          if (!item) {
            res.status(404).json({ message: "Automovil no encontrado!" });
            return;
          }
          item.Nombre = req.body.Nombre;
          item.Marca = req.body.Marca;
          item.FechaLanzamiento = req.body.FechaLanzamiento;
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
    
    router.delete("/api/automoviles/:id", async (req, res) => {
      
        let bajaFisica = false;
      
        if (bajaFisica) {
          // baja fisica
          let filasBorradas = await db.automoviles.destroy({
            where: { Id: req.params.id },
          });
          if (filasBorradas == 1) res.sendStatus(200);
          else res.sendStatus(404);
        } else {
          // baja logica
          try {
            let data = await db.sequelize.query(
              "UPDATE automoviles SET Activo = case when Activo = 1 then 0 else 1 end WHERE Id = :Id",
              {
                replacements: { Id: +req.params.id },
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

module.exports = router;