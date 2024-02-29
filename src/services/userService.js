export const getUserByUsername = async (username) => {
  return await fetch(`http://localhost:8088/users?username=${username}`).then(
    (res) => res.json()
  )
}

export const createUser = async (newUser) => {
  return await fetch(`http://localhost:8088/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
}

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then(
    (response) => response.json()
  )
}

export const editUserInfo = (user) => {
  return fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}