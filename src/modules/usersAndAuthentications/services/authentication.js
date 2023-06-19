const setToken = () => {
  let token = null

  const loggedUser = window.localStorage.getItem('Manufacturing_logedUser')
  const user = JSON.parse(loggedUser)
  if (user) {
    token = `Bearer ${user.data.token}`
  }
  return token
}
export default setToken






