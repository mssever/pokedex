import React from 'react'
import { useParams } from 'react-router'

export default function Pokemon(props) {
    let {id} = useParams()
    return (
        <React.Fragment>
            <h1>Individual Pokemon: {id}</h1>
        </React.Fragment>
    )
}
