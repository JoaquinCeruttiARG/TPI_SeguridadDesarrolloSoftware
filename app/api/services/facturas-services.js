const sequelize = require("../base-orm/sequelize-init.js");
const { Op } = require("sequelize");

const getFacturasByFilter = async (email, activo) => {
    if (!email && !activo) {
        let rdo = await sequelize.facturas.findAll({
        attributes: [
            "IdFactura", 
            "Email", 
            "FechaAlta", 
            "Activo"
        ],
        order: [["IdFactura", "ASC"]]
        });
        return rdo.map(r => r.dataValues)
    }else{
        //seteo de var bases
        !email ? email = "" : email = email
        activo === "false" ? activo = false : activo = true
        console.log(email + " este es el mail", activo + " este activo")
        const rdo = await sequelize.facturas.findAll({
            attributes: [
                "IdFactura", 
                "Email", 
                "FechaAlta", 
                "Activo"
            ],
            where: {
                [Op.and]: [
                    {
                        Email: {
                            [Op.like]: `%${email}%`
                        },
                        Activo: {
                            [Op.like]: activo
                        }

                    }
                ]
            },
            order: [['IdFactura', "ASC"]]
    })

    return rdo.map(r => r.dataValues)
}
}
const modifyFacturas = async (req,res) =>{

  try {
    let item = await sequelize.facturas.findOne({
      attributes: [
        "IdFactura", 
        "Email", 
        "FechaAlta",
        "Activo"],
      where: { IdFactura: req.params.id },
    });
    console.log(item);
    if (!item) {
      res.status(404).json({ message: "FACTURA NOT FOUND (fijise man)" });
      return;
    }
    item.Email = req.body.Email;
    item.FechaAlta =  req.body.FechaAlta;
    item.Activo =  req.body.Activo;
    await item.save();

    res.sendStatus(200);
  } catch (err) {
      throw err;
    }
  }

const getById = async function(req, res, next){
    let item = await sequelize.facturas.findOne({
      attributes: [
        "IdFactura", 
        "Email", 
        "FechaAlta",
        "Activo"],
        where: { IdFactura: req.params.id },
      });
      res.json(item);}

const createFacturas = async (email, fechaAlta, activo) => {
    const rdo = await sequelize.facturas.create({
        Email: email, 
        FechaAlta: fechaAlta,  
        Activo: activo
    })

    return rdo.dataValues
}

const deleteFacturas = async (req, res) => {
    let bajaFisica = false;
    let idFact = req.params.id
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await sequelize.facturas.destroy({
        where: { IdFactura: idFact },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        //FIJARSE SI AHORA ANDA
        let data = await sequelize.sequelize.query(
          "UPDATE facturas SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdFactura = :IdFactura",
          {
            replacements: { IdFactura: +idFact },
          }
        );
        res.sendStatus(200);
      } catch (err) {
            throw err;
        }
      }
    };

const facturasServices = {
    getFacturasByFilter,
    createFacturas,
    deleteFacturas,
    modifyFacturas,
    getById
}

module.exports = facturasServices
