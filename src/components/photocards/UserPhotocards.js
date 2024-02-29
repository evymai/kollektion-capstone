import { useEffect, useState } from "react"
import "./Photocard.css"
import {
  deleteUserPhotocard,
  getAllPhotocards,
  getUserPhotocardsByUserId,
} from "../../services/photocardService"
import { getAllArtists } from "../../services/artistService"

export const UserPhotocards = ({ currentUser }) => {
  const [currentUserPhotocards, setCurrentUserPhotocards] = useState([])
  const [allArtists, setAllArtist] = useState([])
  const [artistSelection, setArtistSelection] = useState(0)
  const [filteredPcs, setFilteredPcs] = useState([])
  const [pcSearch, setPcSearch] = useState("")

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


  useEffect(() => {
    if (parseInt(artistSelection) !== 0) {
      const artistPcs = currentUserPhotocards.filter(
        (userPc) =>
          parseInt(userPc.photocard.artistId) === parseInt(artistSelection)
      )
      setFilteredPcs(artistPcs)
    } else {
      setFilteredPcs(currentUserPhotocards)
    }
  }, [currentUserPhotocards, artistSelection])

  useEffect(() => {
    const searchResult = currentUserPhotocards.filter((userPc) =>
      userPc.photocard.name.toLowerCase().includes(pcSearch.toLowerCase())
    )
    setFilteredPcs(searchResult)
  }, [currentUserPhotocards, pcSearch])

  const handleRemoveFromCollection = async (userPhotocardId) => {
    await deleteUserPhotocard(userPhotocardId)
    render(currentUser.id)
  }

  const handleDropdownChange = (event) => {
    setArtistSelection(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    let searchInput = event.target.value
    setPcSearch(searchInput)
  }

  return (
    <div className="photocard-view">
      <h2>My Photocards</h2>
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

        <div className="search-bar-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search photocards..."
          value={pcSearch}
          onChange={handleSearchChange}
        />
      </div>
      </div>

      <div className="photocard-container">
        {filteredPcs.map((userPc) => {
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
