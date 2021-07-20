import React from 'react'
import { useParams, useLocation } from 'react-router'
import {Link} from 'react-router-dom'
import { getPokemon, any } from '../util/functions'
import MiniCard from './MiniCard'

export default function Pokemon() {
    let {state: item} = useLocation() // TODO: Factor out the unnecessary fetch
    console.log('item', item)
    let[pokemon, setPokemon] = React.useState({})
    let {id} = useParams()
    console.log(id)
    
    React.useEffect(() => {
        (async () => {
            var data_pokemon = await getPokemon()
            data_pokemon = data_pokemon.pokemon.find(item => {
                return item.id == id
            })
            setPokemon(data_pokemon)
        })()
    }, [id])
    let p = pokemon
    // let p
    // if(pokemon[0]) {
    //     p = pokemon[0]
    // } else {
    //     p = pokemon
    // }

    let personal = [
        new PokemonProperty('Name', p.name),
        new PokemonProperty('Num', p.num),
        new PokemonProperty('Type', p.type),
        new PokemonProperty('Weaknesses', p.weaknesses),
        new PokemonProperty('Height', p.height),
        new PokemonProperty('Weight', p.weight),
        new PokemonProperty('Candy', p.candy ? `${p.candy} (Count: ${p.candy_count ? p.candy_count : 0})` : null),
        new PokemonProperty('Egg', p.egg),
    ]
    let evolution = [
        new PokemonProperty('Previous Evolution', p.prev_evolution, 'col-sm-6'),
        new PokemonProperty('Next Evolution', p.next_evolution, 'col-sm-6'),
    ]
    let spawn = [
        new PokemonProperty('Average Spawns', p.avg_spawns),
        new PokemonProperty('Multipliers', p.multipliers),
        new PokemonProperty('Spawn Chance', p.spawn_chance),
        new PokemonProperty('Spawn Time', p.spawn_time),
    ]

    return (
        <React.Fragment>
            <div className="d-flex align-items-center mx-auto" style={{width: 'fit-content'}}>
                <div className="flex-shrink-0">
                    <img src={p.img} alt={p.name} className="mx-auto mb-4" />
                </div>
                <h1 className="flex-grow-1 ms-3">
                    Individual Pokemon: {p.name}
                </h1>
            </div>
            {details_section('Personal Details', personal)}
            {details_section('Evolution Details', evolution)}
            {details_section('Spawn Details', spawn)}
            <Link to='/'>
                <button className="btn btn-secondary">Return to search</button>
            </Link>
        </React.Fragment>
    )
}

function details_section(title, arr) {
    if(any(arr, (item, idx) => item.toJSX(idx))) {
        return (
            <React.Fragment>
                <h2>{title}</h2>
                <div className="card-container d-flex flex-wrap">
                    <div className="row" style={{width: '100%'}}>
                        {arr.map((item, idx) => item.toJSX(idx))}
                    </div>
                </div>
            </React.Fragment>
        )
    }
    return null
}

class PokemonProperty {
    constructor(name, value, sizeClass="col-sm-3") {
        this.name = name
        this.value = value
        this.sizeClass = sizeClass
    }

    toJSX(key) {
        if(this.value) {
            return <MiniCard key={key} title={this.name} content={this.value} sizeClass={this.sizeClass} />
        }
        return null
    }
}
