import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../App.css';
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const handleOnLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark "  >
        <div className="container-fluid">
          <Link className="navbar-brand mt-1" to="/"><img className='mb-1' src="favicon2.png" alt="error" width={"30px"} /> iNotebook   </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon  "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5 ms-0">
              <li className="nav-item mx-1">
                <Link className={`nav-link ${location.pathname === '/' ? "text-primary " : "text-white"}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className={`nav-link ${location.pathname === '/about' ? "text-primary" : "text-white"}`} to="/about">About</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className={`nav-link ${location.pathname === '/notebook' ? "text-primary" : "text-white"}`} aria-current="page" to="/notebook">Notebook</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <div className="d-flex login-signup">
              <Link className="btn btn-primary btn-sm mx-1 mb-lg-0 mb-3 button-width " to="/login" role="button">Login</Link>
              <Link className="btn btn-primary btn-sm mx-1 mb-lg-0 mb-3 button-width " to="/signup" role="button">SignUp</Link>
            </div> : <button className='btn btn-primary btn-sm ' onClick={handleOnLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )

}


