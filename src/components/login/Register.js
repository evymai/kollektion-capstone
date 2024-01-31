import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByUsername } from "../../services/userService"

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    name: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "kollektion_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByUsername(user.username).then((response) => {
      if (response.length > 0) {
        // Duplicate. No good.
        window.alert("An account with that username already exists.")
      } else {
        // Good email, create user.
          registerNewUser()
          navigate("/login")
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Kollektion</h1>
        <h2>Register an account</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="form-control"
              placeholder="First Name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="username"
              id="username"
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
