import { Link } from "react-router-dom"

export default function MiniCard({title, content, sizeClass}) {
  if(content.map && content[0].name && content[0].num) { // evolutions
    content = (
      <ul className="list-group list-group-flush">
        {content.map((item, idx) => {
          return (
            <li key={idx} className="list-group-item">
              <Link to={`/pokemon/${item.num*1}`}>{item.name} ({item.num})</Link>
            </li>
          )
        })}
      </ul>
    )
  } else if(content.map) { // other array content
    content = (
      <ul className="list-group list-group-flush">
        {content.map((item, idx) => <li key={idx} className="list-group-item">{item}</li>)}
      </ul>
    )
  }
  
  return (
    <div className={sizeClass}>
      <div className="card mb-2 me-2">
        <div className="card-header fw-bold">{title}</div>
        <div className="card-text">{content}</div>
      </div>
    </div>
  )
}
