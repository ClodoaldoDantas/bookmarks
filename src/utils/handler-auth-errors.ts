export function handleSignInError(code: string) {
  switch (code) {
    case 'auth/invalid-credential':
      return 'Credenciais inválidas'
    default:
      return 'Erro ao realizar login'
  }
}

export function handleSignUpError(code: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'E-mail inválido'
    case 'auth/weak-password':
      return 'Senha deve ter no mínimo de 6 caracteres'
    default:
      return 'Erro ao realizar o cadastro'
  }
}
