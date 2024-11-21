const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {users, sessions} = require("../base-orm/sequelize-init")

const validateIdentity = async ( req, res, next) => {
    console.log("hi")
    const token = req.cookies.authtoken;

    if(!token){
        console.log("No hay token")
        return res.status(401).end()
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).end()
        }
    }) 

    const sesion = await sessions.findOne({
        where: 
        {jwtToken: token,
        anulated: false}
    })

    if(!sesion){
        return res.status(401).end()
    }

    const UserId =  sesion.idUsuario;

    const user = await users.findOne({
        where: {idUsuario: UserId}
    })

    if(!user){
        return res.status(401).end();
    }


    req.user = user;
    req.sesion = sesion;

    console.log("Identidad validada")
    next();
}

module.exports = validateIdentity;