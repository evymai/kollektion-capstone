import { useState } from "react"
import { addNewArtist } from "../../services/artistService"
import { useNavigate } from "react-router-dom"
import "./ArtistForm.css"
export const NewArtistForm = () => {
  const [artistName, setArtistName] = useState("")
  const [imageFile, setImageFile] = useState("")
  const [artistBirthday, setArtistBirthday] = useState("")

  const navigate = useNavigate()

  const handleArtistChange = (event) => {
    setArtistName(event.target.value)
  }
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0])
  }
  const handleAddArtist = async () => {
    if (artistName && imageFile && artistBirthday) {
      const newArtist = {
        name: artistName,
        image: `/images/artists/${imageFile.name}`,
        birthday: artistBirthday,
      }
      navigate(`/artists`)
      await addNewArtist(newArtist)
    } else {
      alert("Please fill in all fields before adding an artist.")
    }
  }

  return (
    <div className="artist-form-container">
      <h2>New Artist</h2>

      <form>
        <div>
          <input type="file" name="filename" onChange={handleFileChange} />
        </div>
        <div>
          <label>Last & First Name: </label>
          <input
            type="text"
            placeholder="ex: Park Jisung"
            value={artistName}
            onChange={handleArtistChange}
          />
        </div>
        <div>
          <label>Birthday: </label>
          <input
            className="post-date-input"
            type="date"
            value={artistBirthday}
            min="1960-01-01"
            max="2024-01-01"
            onChange={(event) => {
              let artistBday = event.target.value
              setArtistBirthday(artistBday)
              console.log(`on change: ${artistBday}`)
            }}
          />
        </div>

        <button className="artist-form-button" onClick={handleAddArtist}>
          Add New Artist
        </button>
      </form>
    </div>
  )
}
