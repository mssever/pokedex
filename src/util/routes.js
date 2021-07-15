import Search from "../components/Search"

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
]

export default routes
