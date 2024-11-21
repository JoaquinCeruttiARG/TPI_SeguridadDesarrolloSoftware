import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";



import ErrorB from "./components/ErrorB";

import ModalDialog from "./components/ModalDialog";
import { Equipos } from "./components/equipos/Equipos";
import { Automoviles } from "./components/automoviles/Automoviles"
import { Facturas } from "./components/facturas-comp/Facturas";
import { Provincias } from "./components/provincias/Provincias";
import { Login } from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Register } from "./components/Register";

window.onerror = (msg, url, line, col, error) => {
  // Note that col & error are new to the HTML 5 spec and may not be
  // supported in every browser.  
  var extra = !col ? "" : "\ncolumn: " + col;
  extra += !error ? "" : "\nerror: " + error;

  // You can view the information in an alert to see things working like this:
  let mensaje = "Error: " + msg + "\nurl: " + url + "\nline: " + line + extra;
  console.error(mensaje);
  logError(mensaje);

  var suppressErrorAlert = true;
  // If you return true, then error alerts (like in older versions of
  // Internet Explorer) will be suppressed.
  return suppressErrorAlert;
};

window.onunhandledrejection = (e) => {
  logError(e);
};

const logError = (error) => {
  console.log( error);
  // eviar al servidor este error para que lo loguee
};

function App() {
  

  return (
    <>
     <ErrorBoundary FallbackComponent={ErrorB} onError={logError}> 
        <BrowserRouter>
          
          
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

              <Route path="/equipos" element={<ProtectedRoute element={<Equipos />} />} />
              <Route path="/automoviles" element={<ProtectedRoute element={<Automoviles />} />} />
              <Route path="/facturas" element={<ProtectedRoute element={<Facturas />} />} />
              <Route path="/provincias" element={<ProtectedRoute element={<Provincias />} />} />

              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
