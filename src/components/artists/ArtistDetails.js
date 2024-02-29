import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArtistById } from "../../services/artistService"
import {
  addUserPhotocard,
  deleteUserPhotocard,
  getPhotocardsByArtistId,
  getUserPhotocards,
} from "../../services/photocardService"

export const ArtistDetails = ({ currentUser }) => {
  const { artistId } = useParams()
  const [artist, setArtist] = useState({})
  const [artistPcs, setArtistPcs] = useState([])
  const [userPhotocards, setUserPhotocards] = useState([])

  const render = () => {
    getUserPhotocards().then((userPcsArr) => {
      setUserPhotocards(userPcsArr)
    })
  }

  useEffect(() => {
    render()
  }, [])

  useEffect(() => {
    getArtistById(artistId).then((artist) => {
      setArtist(artist)
    })
    getPhotocardsByArtistId(artistId).then((photocardArr) => {
      setArtistPcs(photocardArr)
    })
  }, [artistId])

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
    <div className="artist-details-container">
      <div className="artist-details" key={artist.id}>
        <div className="artist-info">
          <h2>{artist.name}</h2>
          <p>Birthday: {artist.birthday}</p>
        </div>
        <div className="details-img-container">
          <img
            src={artist.image}
            alt={`${artist.name} Photocard`}
            key={artist.id}
          />
        </div>
      </div>
      <div className="photocard-container">
        {artistPcs.map((photocard) => {
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
