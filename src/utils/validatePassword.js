export const isStrongPassword = (password) => {
  const minLength = /.{8,}/
  const hasUpperCase = /[A-Z]/
  const hasLowerCase = /[a-z]/
  const hasNumber = /[0-9]/
  const hasSymbol = /[^A-Za-z0-9]/

  return (
    minLength.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasNumber.test(password) &&
    hasSymbol.test(password)
  )
}