const express = require("express");
const routerCloseSession = express.Router();
const { users, sessions } = require("../base-orm/sequelize-init");

routerCloseSession.post("/closeSession", async(req,res) => {
    console.log("Cerrada Sesión")
    const sesion = req.sesion;

    await sessions.update(
        {anulated: true},
        {where: {idSesion: sesion.idSesion}}
    )
    
    res.status(200).json({"text":"Sesion cerrada"});
})

module.exports = routerCloseSession
