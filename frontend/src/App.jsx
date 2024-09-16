/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import Router from './router/Router'
import { getRoutes } from './router/routes'
import publicRoutes from './router/routes/PublicRoutes'

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  useEffect(() => {
    const routes = getRoutes()

    setAllRoutes([...allRoutes, routes])
  }, [])

  return (
    <>
      <Router allRoutes={allRoutes} />
    </>
  )
}

export default App
