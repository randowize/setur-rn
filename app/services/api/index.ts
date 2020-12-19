import firestore from "@models/firestore"

type User = {
  email: string
  password: string
}
export const save = async (user: User) => {
  const messageRef = firestore.collection("users")
  const result = await messageRef.add(user)
  return await result.get()
}

export * from "./api"
export * from "./api.types"
