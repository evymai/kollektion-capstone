import { useEffect, useState } from "react"
import "./Photocard.css"
import {
  addUserPhotocard,
  deleteUserPhotocard,
  getAllPhotocards,
  getUserPhotocards,
} from "../../services/photocardService"
import { useNavigate } from "react-router-dom"
import { getAllArtists } from "../../services/artistService"

export const Photocards = ({ currentUser }) => {
  const [allPhotocards, setAllPhotocards] = useState([])
  const [userPhotocards, setUserPhotocards] = useState([])
  const [artistSelection, setArtistSelection] = useState(0)
  const [allArtists, setAllArtist] = useState([])
  const [filteredPcs, setFilteredPcs] = useState([])

  const navigate = useNavigate()

  const render = async () => {
    await getUserPhotocards().then((userPcsArr) => {
      setUserPhotocards(userPcsArr)
    })
    getAllPhotocards().then((photocardsArr) => {
      setAllPhotocards(photocardsArr)
    })
  }

  useEffect(() => {
    render()
    getAllArtists().then((artistArr) => {
      setAllArtist(artistArr)
    })
  }, [])

  useEffect(() => {
    if (parseInt(artistSelection) !== 0) {
      const artistPcs = allPhotocards.filter(
        (pc) => parseInt(pc.artistId) === parseInt(artistSelection)
      )
      setFilteredPcs(artistPcs)
    } else {
      setFilteredPcs(allPhotocards)
    }
  }, [allPhotocards, artistSelection])

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

  const handleDropdownChange = (event) => {
    setArtistSelection(event.target.value)
  }

  return (
    <div className="photocard-view">
      <h2>Photocards</h2>
      <div className="options-container">
        <div className="dropdown-container">
          <select
            id="artist-dropdown"
            className="dropdown"
            onChange={handleDropdownChange}
          >
            <option className="artist-name" value="0">
              Sort by Artist
            </option>
            {allArtists.map((artistObj) => {
              return (
                <option
                  className="artist"
                  value={artistObj.id}
                  key={artistObj.id}
                >
                  {artistObj.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/newPhotocard`)
            }}
          >
            New PC
          </button>
        </div>
      </div>
      <div className="photocard-container">
        {filteredPcs.map((photocard) => {
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
