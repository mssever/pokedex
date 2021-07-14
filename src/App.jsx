import React, { Component } from 'react'
import {cmp} from './util/compare'
import 'bootstrap/dist/css/bootstrap.css'
import './App.scss';

export default class App extends Component {
  constructor() {
    super()
    this.state = { pokemon: {pokemon: []}}
  }

  filterList(evt) {
    evt.preventDefault()
    console.log(evt)
  }

  async componentDidMount() {
    let pokemon_data = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    let response = await fetch(pokemon_data)
    let data = await response.json()
    this.setState({pokemon: data})
    document.querySelector('#search').addEventListener('submit', this.filterList)
    document.querySelector('#search-list').addEventListener('change', this.filterList)
  }

  render() {
    let pokemon = this.state.pokemon.pokemon.sort((a,b) => cmp(a.name, b.name))
    return (
      <React.Fragment>
        <h1>Pokedex</h1>
        <form id='search'>
          <label htmlFor='search-list' className='form-label'>Filter the list of Pokemon</label>
          <input className='form-control' list='search-options' id='search-list' placeholder='Type to search by name...' />
          <datalist id='search-options'>
            {pokemon.map(item => <option key={item.id}>{item.name}</option>)}
          </datalist>
          <button type="submit" className="btn btn-primary mb-3">Search</button>
        </form>
        <h2>Pokemon matching search criteria</h2>
        {pokemon.map(item => (
          <div key={item.id} className='card mb-3' style={{maxWidth: '75%'}}>
            <div className="card-header">{item.name}</div>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.img} alt="" className="card-img card-img-top" />
              </div>
              <div className="col-md-8">
                
                <div className="card-body">
                  
                  <div className="card-text">
                    <div className="item">Num: {item.num}</div>
                    <div className="item">Type:
                      <ul className="list-group list-group-flush">
                        {item.type.map(type => <li key={type} className="list-group-item">{type}</li>)}
                      </ul>
                    </div>
                    <div className="item">Weaknesses:
                      <ul className="list-group list-group-flush">
                        {item.weaknesses.map(weakness => <li className="list-group-item" key={weakness}>{weakness}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>))}
      </React.Fragment>
    )
  }
}
