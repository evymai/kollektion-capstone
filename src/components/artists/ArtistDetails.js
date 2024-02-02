import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArtistById } from "../../services/artistService"

export const ArtistDetails = () => {
  const { artistId } = useParams()
  const [artist, setArtist] = useState({})

  useEffect(() => {
    getArtistById(artistId).then((artist) => {
      setArtist(artist)
    })
  }, [artistId])

  return (
    <div className="artist-details-container">
      <h2>{artist.name}</h2>
      <div className="artist-card" key={artist.id}>
        <div className="details-img-container">
          <img
            src={artist.image}
            alt={`${artist.name} Photocard`}
            key={artist.id}
          />
        </div>
        
      </div>
    </div>
  )
}
