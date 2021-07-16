import Search from "../components/Search"
import Pokemon from '../components/Pokemon'

class Route {
  constructor(func, path, name, data={}) {
    this.func = func
    this.path = path
    this.name = name
    this.data = data
  }
}

const routes = [
  new Route(Search, '/', 'Search'),
  new Route(Pokemon, '/pokemon/:id', 'Individual Pokemon')
]

export default routes
