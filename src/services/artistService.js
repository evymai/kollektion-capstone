export const getAllArtists = async () => {
  return await fetch(`http://localhost:8088/artists`).then((response) =>
    response.json()
  )
}

export const getArtistById = async (artistId) => {
  return await fetch(`http://localhost:8088/artists/${artistId}`).then(
    (response) => response.json()
  )
}

export const addNewArtist = async (artist) => {
  return await fetch(`http://localhost:8088/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  }).then((res) => res.json())
}
