import React, { Component } from 'react'
import {cmp} from '../util/compare'
import Card from './Card'

export default class Search extends Component {
  constructor() {
    super()
    this.weaknesses = []
    this.weaknessesChecked = {}
    this.weaknessesPokemon = {}
    this.types = []
    this.typesChecked = {}
    this.typesPokemon = {}
    this.state = { 
      pokemon: {pokemon: []},
      numPokemon: 0
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleSearch(evt) {
    if(evt.type && evt.type == 'submit') {
      evt.preventDefault()
    }
    console.log('evt: ', evt)
    
    setTimeout(() => {
      let input = document.querySelector('#search-list');
      let query
      try {
        // TODO: Fix regex or switch to substring matching
        query = new RegExp(input.value, 'gi')
      } catch(e) {
        console.error(e)
        query = new RegExp('')
      }
      let data = this.fullData.pokemon
        .filter(item => {
          for (let i=0; i<this.types.length; i++) {
            let t = this.types[i]
            if(this.typesChecked[t] && item.type.includes(t)) {
              return true
            }
          }
          return false
        })
        .filter(item => {
          for (let i=0; i<this.weaknesses.length; i++) {
            let w = this.weaknesses[i]
            if(this.weaknessesChecked[w] && item.weaknesses.includes(w)) {
              return true
            }
          }
          return false
        })
        .filter(item => query.test(item.name))
      this.setState({
        pokemon: {
          pokemon: data
        },
        numPokemon: data.length
      })
    }, 50)
  }

  handleFilter(evt) {
    console.log(evt.target)
    let target = evt.target
    setTimeout(() => {
      if (target.classList.contains('weakness')) {
        this.weaknessesChecked[target.value] = target.checked
        this.handleSearch(evt)
      } else if (target.classList.contains('type')) {
        this.typesChecked[target.value] = target.checked
        this.handleSearch(evt)
      }
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
          this.weaknessesChecked[weakness] = true
        }
        if(this.weaknessesPokemon[item.name]) {
          this.weaknessesPokemon[item.name].push(weakness)
        } else {
          this.weaknessesPokemon[item.name] = [weakness]
        }
      })
    })
    this.types = []
    this.fullData.pokemon.forEach(item => {
      item.type.forEach(type => {
        if(!this.types.includes(type)) {
          this.types.push(type)
          this.typesChecked[type] = true
        }
        if(this.typesPokemon[item.name]) {
          this.typesPokemon[item.name].push(type)
        } else {
          this.typesPokemon[item.name] = [type]
        }
      })
    });
    console.log({weaknesses: this.weaknesses, weaknessesChecked: this.weaknessesChecked, types: this.types, typesChecked: this.typesChecked})
    this.setState({
      pokemon: this.fullData,
      numPokemon: this.fullData.pokemon.length
    })
    document.querySelector('#search').addEventListener('submit', this.handleSearch)
    let search = document.querySelector('#search-list')
    search.addEventListener('change', this.handleSearch)
    search.addEventListener('keypress', this.handleSearch)
    //keypress doesn't capture backspace
    search.addEventListener('keydown', evt => {
      if(evt.key == 'Backspace') this.handleSearch(evt)
    })
    let weakness_checkboxes = document.querySelectorAll('.weakness')
    for(let i=0; i<weakness_checkboxes.length; i++) {
      weakness_checkboxes[i].addEventListener('change', this.handleFilter)
    }
    let types_checkboxes = document.querySelectorAll('.type')
    for(let i=0; i<types_checkboxes.length; i++) {
      types_checkboxes[i].addEventListener('change', this.handleFilter)
    }
  }

  render() {
    let pokemon = this.state.pokemon.pokemon.sort((a,b) => cmp(a.name.toLowerCase(), b.name.toLowerCase()))
    return (
      <React.Fragment>
        <h1>Pokedex</h1>
        <form id='search'>
          <label htmlFor='search-list' className='form-label'>Filter the list of Pokemon <b>The search query is a case-insensitive global regular expression,</b> because why not?</label>
          <input className='form-control' list='search-options' id='search-list' placeholder='Type to search by name...' />
          <div className="form-check form-check-inline">
            <p>Only include Pokemon of these types:</p>
            {this.types.sort().map(type => (
              <React.Fragment key={type}>
                <input className="btn-check type" type="checkbox" id={`type-${type}`} value={type} defaultChecked={this.typesChecked[type]} />
                <label htmlFor={`type-${type}`} className="btn btn-primary">{type}</label>
              </React.Fragment>
            ))}
          </div>
          <div className="form-check form-check-inline">
            <p>Only include Pokemon with these weaknesses:</p>
            {this.weaknesses.sort().map(weakness => (
              <React.Fragment key={weakness}>
                <input className="btn-check weakness" type="checkbox" id={`weakness-${weakness}`} value={weakness} defaultChecked={this.weaknessesChecked[weakness]} />
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
