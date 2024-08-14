import { allNav } from './allNav.jsx'

export const getNav = (role) => {
  const finalNavs = []

  for (let i = 0; i < allNav.length; i++) {
    if (allNav[i].role === role) {
      finalNavs.push(allNav[i])
    }
  }

  return finalNavs
}
