import Search from "../components/Search"
import Pokemon from '../components/Pokemon'

class Route {
  constructor(func, path, name, inNav=true) {
    this.func = func
    this.path = path
    this.name = name
    this.inNav = inNav
  }
}

const routes = [
  new Route(Search, '/', 'Search'),
  new Route(Pokemon, '/pokemon/:id', 'Individual Pokemon')
]

export default routes
