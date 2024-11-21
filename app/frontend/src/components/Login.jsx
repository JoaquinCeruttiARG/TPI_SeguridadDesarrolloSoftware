import axios from "axios";
import React from "react";
import { loginService } from "../services/login.service";
import { useNavigate } from 'react-router-dom';

export function Login(){
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    async function sendLogin(){
        const data = {username, password}
        try{
            const errorCode = 0;
            const response = await fetch("http://localhost:3002/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            }).then( res => res.json())
            .then(res => {
                setErrorMessage(res.text)
                if(res.text == "Logueado"){
                    navigate("/inicio")
                }});
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
         <button type="button" id="signup-button" class="signupbutton" onClick={sendLogin}>Sign Up</button>
         <br></br>
         <button type="button" id="signup-google" class="signupbutton">Sign in with Google</button>
         {errorMessage && <h2 id="error-message">{errorMessage}</h2>}
        </form>


        </>
    )
}