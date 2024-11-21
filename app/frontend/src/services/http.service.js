import axios from "axios"; 
import modalService from "./modalDialog.service";

// Crear una instancia de axios con los encabezados estándar
const httpService = axios.create({
  headers: {
    "Content-Type": "application/json", // El tipo de contenido será JSON por defecto
  },
  withCredentials: true
});

// Interceptor de solicitud para añadir el token de autenticación
httpService.interceptors.request.use(
  (request) => {
    // Bloqueo de pantalla antes de la solicitud
    modalService.BloquearPantalla(true);
    
    // Recuperar el token de sesión
    const accessToken = sessionStorage.getItem("accessToken");
    
    // Si el token está presente, añadirlo al encabezado Authorization
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    
    // Retornar la solicitud modificada (o sin cambios)
    return request;
  },
  (error) => {
    console.log("Error en la solicitud de Axios", error);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar las respuestas y errores
httpService.interceptors.response.use(
  (response) => {
    // Bloqueo de pantalla cuando la respuesta es exitosa
    modalService.BloquearPantalla(false);
    
    // Retornar la respuesta tal cual
    return response;
  },
  (error) => {
    // Manejo de errores en la respuesta
    console.log("Error en la respuesta de Axios", error);
    modalService.BloquearPantalla(false);

    // Determinar el mensaje de error basado en el código de estado HTTP
    if (error.response.status === 401) {
      // No autenticado
      error.message = "Debe loguearse para acceder a esta funcionalidad";
    } else if (error.response.status === 403) {
      // Usuario no autorizado
      error.message = "Usuario no autorizado para acceder a esta funcionalidad";
    } else {
      // Mensaje de error genérico
      error.message =
        error?.response?.data?.message ??
        "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    }
    
    // Mostrar el mensaje de error en una ventana emergente
    modalService.Alert(error.message);
    
    return Promise.reject(error);
  }
);

export default httpService;