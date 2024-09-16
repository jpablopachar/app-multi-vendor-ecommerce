import { privateRoutes } from "./privateRoutes"
import ProtectUser from "./ProtectUser"

export const getRoutes = () => {
  /* privateRoutes.forEach((r) => {
    r.element = <ProtectUser route={r}>{r.element}</ProtectUser>
  }) */

  return {
    path: '/dashboard',
    element: <ProtectUser />,
    children: privateRoutes,
  }
}