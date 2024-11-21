import {config}from "../config";
import axios from "axios";

async function loginService(loginData){
    await axios.post("http://localhost:3002/login", loginData, {
        withCredentials: true  // Asegura que las cookies se envíen junto con la solicitud
    });
}

async function registerService(registerData){
    console.log("milanga");
        const response = await fetch("http://localhost:3002/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        //console.log(response);
}

export {loginService, registerService}
