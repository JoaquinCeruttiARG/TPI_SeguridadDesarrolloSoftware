import { Button } from "bootstrap";
import { NavLink} from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const token = Cookies.get('authtoken');
  const navigate = useNavigate();

  async function cerrarSesion(){
    console.log("Hello")
    Cookies.remove('authtoken', { path: '/' });
     await fetch("http://localhost:3002/closeSession", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            })
      navigate('/inicio')
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          &nbsp;<i>Seguridad en el Desarrollo de Software</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/equipos">
                Equipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/facturas">
                Facturas
              </NavLink>
            </li>
            < li className="nav-item">
              <NavLink className="nav-link" to="/provincias">
                Provincias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automoviles">
                Automoviles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            {token && <button onClick={cerrarSesion}>
              Cerrar Sesión
            </button>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
