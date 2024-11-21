import axios from "axios";
import React from "react";
import { registerService } from "../services/login.service";

export function Register(){

    const [username, setUsername] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    async function sendRegister(){
        const data = {username, password}
        if(password != passwordConfirmation){
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }
        try{
            const response = await fetch("http://localhost:3002/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then( res => res.json())
            .then(res => {
                setErrorMessage(res.text)
            });
           
        }catch(e){
            console.log(e)
        }
       
        
    }

    return(
        <>
        
        <form class="form" id="signup">
         <input type="email" id="email" onChange={(e) => {setUsername(e.target.value)}} value={username} placeholder="Username" required/>
         <br></br>
         <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}} value={password} placeholder="Password" required/>
         <br></br>
         <input type="password" id="passwordConfirmation" onChange={(e) => {setPasswordConfirmation(e.target.value)}} value={passwordConfirmation} placeholder="Confirm Password" required/>
         <br></br>
         <button type="button" id="signup-button" class="signupbutton" onClick={sendRegister}>Sign Up</button>
         <br></br>
         </form>
        {errorMessage && <h2 id="error-message">{errorMessage}</h2>}
        <div>
            <p>La contraseña debe tener:</p>
            <ul>
                <li>Minimo 10 caracteres</li>
                <li>Debe incluir mayusculas y minusculas</li>
                <li>Debe incluir numeros</li>
                <li>Debe incluir un simbolo (ej:#,$,%,!,...)</li>
            </ul>
        </div>
        


        </>
    )
}