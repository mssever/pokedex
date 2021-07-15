class Route {
  constructor(func, path, name) {
    this.func = func
    this.path = path
    this.name = name
    this.inNav = inNav
  }
}

const routes = [
  new Route(() => <h1>Home</h1>, '/', 'Home'),
]

export default routes
