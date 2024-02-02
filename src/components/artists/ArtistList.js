import { useEffect, useState } from "react"
import { getAllArtists } from "../../services/artistService"
import "./Artist.css"
import { Link, useNavigate } from "react-router-dom"

export const ArtistList = () => {
  const [allArtists, setAllArtist] = useState([])
  const navigate = useNavigate()

  const render = () => {
    getAllArtists().then((artistsArr) => {
      setAllArtist(artistsArr)
    })
  }

  useEffect(() => {
    render()
  }, [])

  return (
    <div className="artist-view">
      <h2>Artists</h2>
      <div className="options-container">
        <button
          onClick={() => {
            navigate(`/newArtist`)
          }}
        >
          Add New Artist
        </button>
      </div>
      <div className="artist-container">
        {allArtists.map((artist) => {
          return (
            // <Link to={`/artists/${artist.id}`}>
            <div className="artist-card" key={artist.id}>
              <div className="artist-img-container">
                <img
                  src={artist.image}
                  alt={`${artist.name} Photocard`}
                  key={artist.id}
                />
              </div>
              <div>{artist.name}</div>
            </div>
            // </Link>
          )
        })}
      </div>
    </div>
  )
}
