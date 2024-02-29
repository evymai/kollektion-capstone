import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./UserForm.css"
import { editUserInfo, getUserById } from "../../services/userService"

export const UpdateUser = ({currentUser}) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(undefined)


  const navigate = useNavigate()

  useEffect(() => {
    getUserById(currentUser.id).then((data) => {
      setCurrentUserInfo(data)
    })
  }, [currentUser.id])
  console.log(currentUserInfo)

  const handleUserEdit = (event) => {
    event.preventDefault()
    const newUserObj = {
      id: currentUser.id,
      name: currentUser.name,
      user: currentUser.username,
    }
    editUserInfo(newUserObj).then(() => {
      navigate(`/editProfile`)
    })
  }
  const handleInputChange = (event) => {
    const stateCopy = { ...currentUser }
    stateCopy[event.target.name] = event.target.value
    setCurrentUserInfo(stateCopy)
  }

  return (
    <form>
      <h2>Update Profile</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          placeholder={currentUser?.name}
          type="text"
          name="name"
          required
          className="form-control"
          value={currentUser?.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="email"
          required
          className="form-control"
          value={currentUser?.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <button className="form-btn btn-primary" onClick={handleUserEdit}>
          Save Profile
        </button>
      </div>
    </form>
  )
}
