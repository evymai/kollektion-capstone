export const getAllPhotocards = async () => {
  return await fetch(`http://localhost:8088/photocards?_expand=artist`).then(
    (response) => response.json()
  )
}

export const getUserPhotocards = async () => {
  return await fetch(
    `http://localhost:8088/userPhotocards?_expand=photocard`
  ).then((response) => response.json())
}

export const getUserPhotocardsByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/userPhotocards?_expand=photocard&userId=${userId}`
  ).then((response) => response.json())
}

export const deleteUserPhotocard = async (userPhotocardId) => {
  return await fetch(
    `http://localhost:8088/userPhotocards/${userPhotocardId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json())
}

export const addUserPhotocard = async (userPhotocard) => {
  return await fetch(`http://localhost:8088/userPhotocards/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPhotocard),
  }).then((response) => response.json())
}

export const addNewPhotocard = async (pc) => {
  return await fetch(`http://localhost:8088/photocards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pc),
  }).then((res) => res.json())
}
