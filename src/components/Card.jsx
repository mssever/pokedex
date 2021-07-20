import {Link} from 'react-router-dom'

export default function Card({item}) {
  return (
    <div className='card mb-2 me-2 shadow-sm col-md-3'>
      <div className="card-header fs-5 fw-bold"><Link className='text-reset text-decoration-none' to={`/pokemon/${item.id}`}>{item.name}</Link></div>
      <Link className="item mx-auto" to={{
        pathname: `/pokemon/${item.id}`,
        state: item
      }}><img src={item.img} alt="" /></Link>
      <div className="card-text">
          <Link className='item' to={`/pokemon/${item.id}`}>
            <button className="btn btn-primary mt-2 fw-bold mx-auto">Details</button>
          </Link>
          <div className="item">Num: {item.num}</div>
          <div className="item">Type(s):
            <ul className="list-group list-group-flush">
              {item.type.map(type => <li key={type} className="list-group-item">{type}</li>)}
            </ul>
          </div>
          <div className="item">Weakness(es):
            <ul className="list-group list-group-flush">
              {item.weaknesses.map(weakness => <li className="list-group-item" key={weakness}>{weakness}</li>)}
            </ul>
          </div>
      </div>
    </div>
  )
}
