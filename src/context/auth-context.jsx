import { createContext } from 'react'

export const AuthContext = createContext({
  isLoggedin: false,
  isSuperUser: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
})
