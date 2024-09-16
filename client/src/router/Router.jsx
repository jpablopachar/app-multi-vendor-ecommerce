import { useRoutes } from 'react-router-dom'

const Router = ({allRoutes}) => {
  const routes = useRoutes([...allRoutes])

  console.log(routes);

  return routes
}

export default Router