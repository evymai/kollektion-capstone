import { useEffect, useState } from "react"
import "./Photocard.css"
import {
  deleteUserPhotocard,
  getUserPhotocardsByUserId,
} from "../../services/photocardService"
import { getAllArtists } from "../../services/artistService"

export const UserPhotocards = ({ currentUser }) => {
  const [currentUserPhotocards, setCurrentUserPhotocards] = useState([])
  const [allArtists, setAllArtist] = useState([])

  const render = (currentUserId) => {
    getUserPhotocardsByUserId(currentUserId).then((userPcsArr) => {
      setCurrentUserPhotocards(userPcsArr)
    })
  }

  useEffect(() => {
    getAllArtists().then((artistsArr) => {
      setAllArtist(artistsArr)
    })
  }, [])

  useEffect(() => {
    render(currentUser.id)
  }, [currentUser.id])

  const handleRemoveFromCollection = async (userPhotocardId) => {
    await deleteUserPhotocard(userPhotocardId)
    render(currentUser.id)
  }

  return (
    <div className="photocard-view">
      <h2>My Photocards</h2>
      <div className="photocard-container">
        {currentUserPhotocards.map((userPc) => {
          const artist = allArtists.find(
            (artist) => artist.id === parseInt(userPc.photocard.artistId)
          )
          return (
            <div className="photocard-card" key={userPc.id}>
              <img
                src={userPc.photocard.image}
                alt={`${userPc.photocard.name} Photocard`}
                key={userPc.photocard.id}
              />
              <div className="photocard-name">{userPc.photocard.name}</div>

              <div>{artist?.name}</div>

              <div className="owned-icons icon">
                <i
                  className="fa-regular fa-circle-xmark"
                  onClick={() => handleRemoveFromCollection(userPc.id)}
                ></i>
                <i
                  className="fa-solid fa-circle-xmark"
                  id="hoverState"
                  onClick={() => handleRemoveFromCollection(userPc.id)}
                ></i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
