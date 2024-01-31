export const getAllPhotocards = () => {
  return fetch(`http://localhost:8088/photocards?_expand=artist`).then((response) =>
    response.json()
  )
}
