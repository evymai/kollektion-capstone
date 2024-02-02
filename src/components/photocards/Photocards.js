import { useEffect, useState } from "react"
import "./Photocard.css"
import {
  addUserPhotocard,
  deleteUserPhotocard,
  getAllPhotocards,
  getUserPhotocards,
} from "../../services/photocardService"
import { useNavigate } from "react-router-dom"

export const Photocards = ({ currentUser }) => {
  const [allPhotocards, setAllPhotocards] = useState([])
  const [userPhotocards, setUserPhotocards] = useState([])
  const navigate = useNavigate()

  const render = () => {
    getUserPhotocards().then((userPcsArr) => {
      setUserPhotocards(userPcsArr)
    })
  }

  useEffect(() => {
    render()
    getAllPhotocards().then((photocardsArr) => {
      setAllPhotocards(photocardsArr)
    })
  }, [])

  const handleRemoveFromCollection = async (photocardId) => {
    const matchingUserPhotocard = userPhotocards.find(
      (userPc) =>
        userPc.userId === currentUser.id && userPc.photocardId === photocardId
    )
    const userPhotocardId = matchingUserPhotocard
      ? matchingUserPhotocard.id
      : null
    await deleteUserPhotocard(userPhotocardId)
    render()
  }

  const handleAddToCollection = async (currentPhotocardId) => {
    const newUserPc = {
      photocardId: currentPhotocardId,
      userId: currentUser.id,
    }
    await addUserPhotocard(newUserPc)
    render()
  }

  return (
    <div className="photocard-view">
      <h2>Photocards</h2>
      <div className="options-container">
        <button
          onClick={() => {
            navigate(`/newPhotocard`)
          }}
        >
          Add New Photocard
        </button>
      </div>
      <div className="photocard-container">
        {allPhotocards.map((photocard) => {
          const isInUserCollection = userPhotocards.some(
            (userPc) =>
              userPc.photocardId === photocard.id &&
              userPc.userId === currentUser?.id
          )
          return (
            <div className="photocard-card" key={photocard.id}>
              <img
                src={photocard.image}
                alt={`${photocard.name} Photocard`}
                key={photocard.id}
              />
              <div className="photocard-name">{photocard.name}</div>
              <div>{photocard.artist?.name}</div>
              {isInUserCollection ? (
                <div className="icon">
                  <i
                    className="fa-regular fa-circle-check"
                    id="hoverState"
                    onClick={() => handleRemoveFromCollection(photocard.id)}
                  ></i>
                  <i
                    className="fa-solid fa-circle-check"
                    onClick={() => handleRemoveFromCollection(photocard.id)}
                  ></i>
                </div>
              ) : (
                <div className="icon">
                  <i
                    className="fa-regular fa-circle-check"
                    onClick={() => handleAddToCollection(photocard.id)}
                  ></i>
                  <i
                    className="fa-solid fa-circle-check"
                    id="hoverState"
                    onClick={() => handleAddToCollection(photocard.id)}
                  ></i>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
