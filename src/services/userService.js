export const getUserByUsername = async (username) => {
  return await fetch(`http://localhost:8088/users?username=${username}`).then(
    (res) => res.json()
  )
}

export const createUser = (newUser) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
}
