import { useEffect, useState } from "react"
import { addNewArtist, getAllArtists } from "../../services/artistService"
import { useNavigate } from "react-router-dom"
import "./PhotocardForm.css"
import { addNewPhotocard } from "../../services/photocardService"

export const NewPhotocardForm = () => {
  const [allArtists, setAllArtist] = useState([])
  const [photocardName, setPhotocardName] = useState("")
  const [imageFile, setImageFile] = useState("")
  const [chosenArtistId, setChosenArtistId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getAllArtists().then((artistsArr) => setAllArtist(artistsArr))
  }, [])

  const handleNameChange = (event) => {
    setPhotocardName(event.target.value)
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0])
  }

  const handleArtistChange = (event) => {
    setChosenArtistId(event.target.value)
  }

  const handleAddPhotocard = async () => {
    if (photocardName && imageFile && chosenArtistId) {
      const newPc = {
        name: photocardName,
        image: `/images/photocards/${imageFile.name}`,
        artistId: chosenArtistId,
      }
      addNewPhotocard(newPc)
      navigate("/photocards")
    } else {
      alert("Please fill in all fields before adding a photocard.")
    }
  }

  return (
    <div className="photocard-form-container">
      <h2>New Photocard</h2>

      <form>
        <select
          id="topic-dropdown"
          className="dropdown"
          onChange={handleArtistChange}
        >
          <option className="artist" value="0">
            Select an artist...
          </option>
          {allArtists.map((artist) => {
            return (
              <option className="artist" value={artist.id} key={artist.id}>
                {artist.name}
              </option>
            )
          })}
        </select>
        <div>
          <input type="file" name="filename" onChange={handleFileChange} />
        </div>
        <div>
          <label>Photocard Name: </label>
          <input
            type="text"
            placeholder="ex: ISTJ Mumo pob"
            value={photocardName}
            onChange={handleNameChange}
          />
        </div>
        <button onClick={handleAddPhotocard}>Add New Photocard</button>
      </form>
    </div>
  )
}
