import React, { Component } from 'react'
import {cmp} from '../util/compare'
import Card from './Card'

export default class Search extends Component {
  constructor() {
    super()
    this.weaknesses = []
    this.types = []
    this.state = { 
      pokemon: {pokemon: []},
      numPokemon: 0
    }

    this.filterList = this.filterList.bind(this)
  }

  filterList(evt) {
    //debugger
    //if(!evt instanceof KeyboardEvent || evt.key == 'Enter') {
    if(evt.type && evt.type == 'submit') {
      evt.preventDefault()
    }
    console.log('evt: ', evt)
    
    setTimeout(() => {
      //debugger
      
      let input = document.querySelector('#search-list');
      let query
      try {
        query = new RegExp(input.value, 'gi')
      } catch(e) {
        console.error(e)
        query = new RegExp('')
      }
      let data = this.fullData.pokemon.filter(item => query.test(item.name))
      this.setState({
        pokemon: {
          pokemon: data
        },
        numPokemon: data.length
      })
    }, 50)
  }

  async componentDidMount() {
    let pokemon_data = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    let response = await fetch(pokemon_data)
    this.fullData = await response.json()
    // console.log(this.fullData.pokemon)
    this.weaknesses = []
    this.fullData.pokemon.forEach(item => {
      item.weaknesses.forEach(weakness => {
        if(!this.weaknesses.includes(weakness)) {
          this.weaknesses.push(weakness)
        }
      })
    })
    this.types = []
    this.fullData.pokemon.forEach(item => {
      item.type.forEach(type => {
        if(!this.types.includes(type)) {
          this.types.push(type)
        }
      })
    });
    console.log({weaknesses: this.weaknesses, types: this.types})
    this.setState({
      pokemon: this.fullData,
      numPokemon: this.fullData.pokemon.length
    })
    // console.log('componentDidMount: this.fullData: ', this.fullData)
    document.querySelector('#search').addEventListener('submit', this.filterList)
    let search = document.querySelector('#search-list')
    search.addEventListener('change', this.filterList)
    search.addEventListener('keypress', this.filterList)
    //keypress doesn't capture backspace
    search.addEventListener('keydown', evt => {
      if(evt.key == 'Backspace') this.filterList(evt)
    })
  }

  render() {
    let pokemon = this.state.pokemon.pokemon.sort((a,b) => cmp(a.name, b.name))
    return (
      <React.Fragment>
        <h1>Pokedex</h1>
        <form id='search'>
          <label htmlFor='search-list' className='form-label'>Filter the list of Pokemon <b>The search query is a case-insensitive global regular expression,</b> because why not?</label>
          <input className='form-control' list='search-options' id='search-list' placeholder='Type to search by name...' />
          <div className="form-check form-check-inline">
            <p>Only include Pokemon of these types:</p>
            {this.weaknesses.map(weakness => (
              <React.Fragment key={weakness}>
                <input className="btn-check" type="checkbox" id={`weakness-${weakness}`} value={weakness} />
                <label htmlFor={`weakness-${weakness}`} className="btn btn-primary">{weakness}</label>
              </React.Fragment>
            ))}
          </div>
          <br />
          <button type="submit" className="btn btn-primary mb-3">Search</button>
        </form>
        <h2>Pokemon matching search criteria ({this.state.numPokemon})</h2>
        {pokemon.map(item => <Card key={item.key} item={item} />)}
      </React.Fragment>
    )
  }
}
