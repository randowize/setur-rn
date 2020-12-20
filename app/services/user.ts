import firestore from '@modules/storage/firestore'

type User = {
  email: string
  password?: string
}
export const addUser = async (user: User) => {
  const messageRef = firestore.collection('users')
  const result = await messageRef.add(user)
  return await result.get()
}
