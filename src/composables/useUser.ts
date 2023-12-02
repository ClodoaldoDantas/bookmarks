import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

const user = ref(auth.currentUser)

onAuthStateChanged(auth, (credentials) => {
  user.value = credentials
})

export const useUser = () => ({ user })
