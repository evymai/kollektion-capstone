import { useEffect, useState } from "react"
import "./Photocard.css"
import { getAllPhotocards } from "../../services/photocardService"

export const Photocard = () => {
  const [allPhotocards, setAllPhotocards] = useState([])

  useEffect(() => {
    getAllPhotocards().then((photocardsArr) => {
      setAllPhotocards(photocardsArr)
    })
  }, [])

  return (
    <div className="photocard-container">
      {allPhotocards.map((photocard) => {
        return (
          <img
            src={photocard.image}
            alt={`${photocard.artist?.name} Photocard`}
            key={photocard.id}
          ></img>
        )
      })}
    </div>
  )
}
