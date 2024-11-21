import modalService from "./modalDialog.service";

function sendRequest(url, method, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    // Configurar encabezados
    xhr.setRequestHeader("Content-Type", "application/json");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    // Mostrar pantalla de bloqueo
    modalService.BloquearPantalla(true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        modalService.BloquearPantalla(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          const errorMessage = handleHttpError(xhr);
          modalService.Alert(errorMessage);
          reject(new Error(errorMessage));
        }
      }
    };

    xhr.onerror = () => {
      modalService.BloquearPantalla(false);
      const errorMessage = "Error en la conexión con el servidor.";
      modalService.Alert(errorMessage);
      reject(new Error(errorMessage));
    };

    xhr.send(data ? JSON.stringify(data) : null);
  });
}

function handleHttpError(xhr) {
  if (xhr.status === 401) {
    return "Debe loguearse para acceder a esta funcionalidad.";
  } else if (xhr.status === 403) {
    return "Usuario no autorizado para acceder a esta funcionalidad.";
  } else {
    return (
      JSON.parse(xhr.responseText)?.message ??
      "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde."
    );
  }
}

// Métodos explícitos para GET, POST, PUT y DELETE
const httpServiceVulnerable = {
  get: (url, config = {}) => {
    const { params, headers } = config;
    const queryParams = params
      ? "?" +
        Object.entries(params)
          .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join("&")
      : "";
    const token = sessionStorage.getItem("accessToken");
  
    return sendRequest(url + queryParams, "GET", null, token);
  },
  post: (url, data) => {
    const token = sessionStorage.getItem("accessToken");
    return sendRequest(url, "POST", data, token);
  },
  put: (url, data) => {
    const token = sessionStorage.getItem("accessToken");
    return sendRequest(url, "PUT", data, token);
  },
  delete: (url) => {
    const token = sessionStorage.getItem("accessToken");
    return sendRequest(url, "DELETE", null, token);
  },
};

export default httpServiceVulnerable;
