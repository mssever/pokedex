import React from 'react'
import { useParams } from 'react-router'
import {Link} from 'react-router-dom'
import { getPokemon } from '../util/net'

export default function Pokemon() {
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
    let p
    if(pokemon[0]) {
        p = pokemon[0]
    } else {
        p = pokemon
    }

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
            <div className="card-container d-flex flex-wrap"><div className="row">
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Name</div>
                    <div className="card-text">{p.name}</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Num</div>
                    <div className="card-text">{p.num}</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Average Spawns</div>
                    <div className="card-text">{p.avg_spawns}</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Candy</div>
                    <div className="card-text">{p.candy} (count: {p.candy_count ? p.candy_count : 0})</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Egg</div>
                    <div className="card-text">{p.egg}</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Height</div>
                    <div className="card-text">{p.height}</div>
                </div></div>
                { (()=>{
                    if(p.multipliers) {
                        return (
                            <div class="col-sm-3"><div className="card mb-2 me-2">
                                <div className="card-header fw-bold">Multipliers</div>
                                <div className="card-text">
                                    <ul className="list-group list-group-flush">
                                        {p.multipliers.map((item, idx) => <li className="list-group-item" key={idx}>{item}</li>)}
                                    </ul>
                                </div>
                            </div></div>
                        )
                    }
                })()}
                { (()=>{
                    if(p.next_evolution) {
                        return (
                            <div class="col-sm-3"><div className="card mb-2 me-2">
                                <div className="card-header fw-bold">Next Evolution</div>
                                <div className="card-text">
                                    <ul className="list-group list-group-flush">
                                        {p.next_evolution.map((item, idx) => {
                                            return (
                                                <li className="list-group-item" key={idx}>
                                                    <Link to={`/pokemon/${item.num*1}`}>
                                                        {item.name} (num {item.num})
                                                    </Link>
                                                </li>
                                            )
                                            })}
                                    </ul>
                                </div>
                            </div></div>
                        )
                    }
                })()}
                { (()=>{
                    if(p.prev_evolution) {
                        return (
                            <div class="col-sm-3"><div className="card mb-2 me-2">
                                <div className="card-header fw-bold">Previous Evolution</div>
                                <div className="card-text">
                                    <ul className="list-group list-group-flush">
                                        {p.prev_evolution.map((item, idx) => {
                                            return (
                                                <li className="list-group-item" key={idx}>
                                                    <Link to={`/pokemon/${item.num*1}`}>
                                                        {item.name} (num {item.num})
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div></div>
                        )
                    }
                })()}
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Spawn Chance</div>
                    <div className="card-text">{p.spawn_chance}</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Spawn Time</div>
                    <div className="card-text">{p.spawn_time}</div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Type</div>
                    <div className="card-text">
                        <ul className="list-group list-group-flush">
                            {(()=>{
                                if(p.type) {
                                    return p.type.map((item, idx) => <li className="list-group-item" key={idx}>{item}</li>)
                                }
                            })()}
                        </ul>
                    </div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Weaknesses</div>
                    <div className="card-text">
                        <ul className="list-group list-group-flush">
                            {(()=>{
                                if(p.weaknesses) {
                                    return p.weaknesses.map((item, idx) => {
                                        return (
                                            <li className="list-group-item" key={idx}>
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            })()}
                        </ul>
                    </div>
                </div></div>
                <div class="col-sm-3"><div className="card mb-2 me-2">
                    <div className="card-header fw-bold">Weight</div>
                    <div className="card-text">{p.weight}</div>
                </div></div>
            </div></div>
            <Link to='/'>
                <button className="btn btn-secondary">Return to search</button>
            </Link>
        </React.Fragment>
    )
}
