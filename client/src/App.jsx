import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from './router/Router'
import { getRoutes } from './router/routes'
import publicRoutes from './router/routes/PublicRoutes'
import { getUserInfo } from './store/reducers/authReducer'

function App() {
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)

  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  console.log(allRoutes)

  useEffect(() => {
    const routes = getRoutes()

    setAllRoutes([...allRoutes, routes])
  }, [])

  useEffect(() => {
    if (token) dispatch(getUserInfo())
  })

  return (
    <>
      <Router allRoutes={allRoutes} />
    </>
  )
}

export default App
