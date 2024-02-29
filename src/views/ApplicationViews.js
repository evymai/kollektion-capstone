import { Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { NavBar } from "../components/nav/NavBar"
import { Photocards } from "../components/photocards/Photocards"
import { UserPhotocards } from "../components/photocards/UserPhotocards"
import { ArtistList } from "../components/artists/ArtistList"
import { ArtistDetails } from "../components/artists/ArtistDetails"
import { NewArtistForm } from "../components/artists/NewArtistForm"
import { NewPhotocardForm } from "../components/photocards/NewPhotocardForm"
import { UpdateUser } from "../components/users/UpdateUser"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localKollektUser = localStorage.getItem("kollektion_user")
    const kollektUserObject = JSON.parse(localKollektUser)

    setCurrentUser(kollektUserObject)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Photocards currentUser={currentUser} />} />
        <Route
          path="photocards"
          element={<Photocards currentUser={currentUser} />}
        />
        <Route
          path="myPhotocards"
          element={<UserPhotocards currentUser={currentUser} />}
        />
        <Route path="artists">
          <Route index element={<ArtistList />} />
          <Route
            path=":artistId"
            element={<ArtistDetails currentUser={currentUser} />}
          />
        </Route>
        <Route path="newArtist" element={<NewArtistForm />} />
        <Route path="newPhotocard" element={<NewPhotocardForm />} />
        <Route path="editProfile" element={<UpdateUser currentUser={currentUser}/>} />
      </Route>
    </Routes>
  )
}
