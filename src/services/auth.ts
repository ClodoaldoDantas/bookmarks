import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { auth, storage } from '@/lib/firebase'

interface RegisterParams {
  name: string
  email: string
  password: string
}

type LoginParams = Omit<RegisterParams, 'name'>

export const authService = {
  register: async ({ name, email, password }: RegisterParams) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await updateProfile(userCredential.user, { displayName: name })
  },

  login: async ({ email, password }: LoginParams) => {
    await signInWithEmailAndPassword(auth, email, password)
  },

  updateUserName: async (user: User, name: string) => {
    await updateProfile(user, { displayName: name })
  },

  uploadImage: async (user: User, file: File) => {
    const imageRef = ref(storage, `users/${user.uid}/${file.name}`)

    const snapshot = await uploadBytes(imageRef, file)
    const fullPath = snapshot.ref.fullPath

    const imageUrl = await getDownloadURL(ref(storage, fullPath))

    await updateProfile(user, { photoURL: imageUrl })

    return {
      imageUrl,
    }
  },
}
