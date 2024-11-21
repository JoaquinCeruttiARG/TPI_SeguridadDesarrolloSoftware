import React, {useState} from 'react'
export  function Contador() {
    const [estado, setEstado] = useState(0)
    let variable  = 0    
    console.log('Renderizado, estado: ', estado)
    console.log('Renderizado, variable: ', variable)
  return (
    <div>
        <h1>Estado: {estado}</h1>
        <h1>Variable: {variable}</h1>
     <button onClick={() => {setEstado(estado+1); console.log("estado", estado)} }>incrementar estado</button> 
     <button onClick={() => {variable ++; console.log('variable', variable)} }>incrementar variable</button> 
    </div>

  )
}
