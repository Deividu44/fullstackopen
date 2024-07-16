import { useState } from 'react'

export const useUser = () => {
  const [value, setValue] = useState(null)

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setValue(null)
  }

  const logUser = (user) => {
    setValue(user)
  }

  return {
    value,
    logUser,
    logout
  }
}
