// import {Link} from 'react-router-dom'

export default function Card({item}) {
  return (
    <div className='card mb-2 shadow-sm'>
      <div className="card-header fs-5 fw-bold">{/*<Link className='text-reset-bak' to={`/pokemon/${item.id}`}>*/}{item.name}{/*</Link>*/}</div>
      <div className="row g-0">
        <div className="col-md-4 img-wrapper">
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
    </div>
  )
}
