import { jwtDecode } from 'jwt-decode'

export const returnRole = (token: string | null) => {
  if (!token) return ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodeToken = jwtDecode(token) as any
  const expireTime = new Date(decodeToken.exp! * 1000)

  if (new Date() > expireTime) {
    localStorage.removeItem('accessToken')

    return ''
  } else {
    return decodeToken.role
  }
}