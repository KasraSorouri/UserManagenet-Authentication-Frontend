import { useState, createContext, useContext } from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userValueAndSet = useContext(UserContext)
  return userValueAndSet[0]
}

export const useUserSet = () => {
  const userValueAndSet = useContext(UserContext)
  return userValueAndSet[1]
}

export default UserContext