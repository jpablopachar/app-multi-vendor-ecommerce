import { Navigate, Outlet } from 'react-router-dom'

const ProtectUser = () => {
  const userInfo = true

  if (userInfo) {
    return <Outlet />
  } else {
    return <Navigate to="/login" replace={true} />
  }
}

export default ProtectUser
