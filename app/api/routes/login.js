const express = require("express");
const routerLogin = express.Router();
const bcrypt = require("bcrypt");
const { users, sessions } = require("../base-orm/sequelize-init");
const jwt = require('jsonwebtoken');

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


routerLogin.post("/register", async(req,res) => {
    console.log("Inciiando Registracion")
    const {username, password} = req.body;

    if(!validarSeguridadContraseña(password)){
        return res.status(401).json({"text": "La contraseña no tiene la seguridad suficiente."})
    }

    const user = {};

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const user = await users.create({
            idUsuario: generateUUID(),
            username: username,
            hashedPassword: hashedPassword
        })
    }catch(e){
        return res.status(400).json({"text": "Nombre de usuario ya existente."})
    }
    

    return res.status(200).json({"text": "Registrado con exito."})


})

routerLogin.post("/login", async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({"text": "Usuario y contraseña requeridos"})
    }

    console.log(username, password);

  

    const user = await users.findOne({
        where: {username}
    })


    if(!user){
        return res.status(400).json({"text": "Usuario o contraseña incorrecto"});
    }

    if(user){
        const comparacion = await bcrypt.compare(password, user.hashedPassword)

        if(!comparacion){
            return res.status(400).json({"text": "Usuario o contraseña incorrecto"});
        }

        const token = jwt.sign({
            id: user.idUsuario, username: user.username, iat: Math.floor(Date.now() / 1000)
        }, process.env.JWT_SECRET, { expiresIn: "5m"})

        console.log(token)
        
        const session = await sessions.create({
            idUsuario: user.idUsuario,
            anulated: false,
            jwtToken: token
        })

        console.log("Logueo exitoso")

        res.cookie('authtoken', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax', //Protege contra CSRF,
            maxAge: 300000
        }).status(200).json({"text": "Logueado"});
    }
    
    
})

function validarSeguridadContraseña(password){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{11,}$/;
    return regex.test(password);
}

module.exports = routerLogin;