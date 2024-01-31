import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import { useEffect, useState } from "react"
import { Photocard } from "../components/photocards/Photocard"
import { NavBar } from "../components/nav/NavBar"

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
        <Route index element={<Photocard />} />
        <Route path="photocards" element={<Photocard />}/>
      </Route>

      </Routes>

  )
}
