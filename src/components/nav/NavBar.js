import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/myPhotocards">
          Kollektion
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/photocards">
          Photocards
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/artists">
          Artists
        </Link>
      </li>

      {localStorage.getItem("kollektion_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("kollektion_user")
              navigate("/", { replace: true })
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}

      <li className="navbar-item">
        <i
          className="fa-regular fa-moon"
          onClick={() => {
            document.body.classList.toggle("dark-mode")
            document.querySelector(".navbar").classList.toggle("dark-mode-nav")
          }}
        ></i>
      </li>
    </ul>
  )
}
