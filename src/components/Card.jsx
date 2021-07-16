// import {Link} from 'react-router-dom'

export default function Card({item}) {
  return (
    <div className='card mb-2 me-2 shadow-sm col-md-3'>
      <div className="card-header fs-5 fw-bold">{/*<Link className='text-reset-bak' to={`/pokemon/${item.id}`}>*/}{item.name}{/*</Link>*/}</div>
      <img src={item.img} alt="" className="mx-auto" />
      <div className="col-md-3">
        <div className="card-body">
          <div className="card-text">
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
      </div>
    </div>
  )
}
