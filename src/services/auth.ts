import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { auth } from '@/lib/firebase'

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
}
