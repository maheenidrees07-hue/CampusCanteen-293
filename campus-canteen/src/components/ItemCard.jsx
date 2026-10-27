import { Link } from "react-router-dom";

export default function ItemCard({ item, onAdd, favourite, onToggleFavourite }) {
  return (
    <article className="item-card">
      <div className="food-art" aria-hidden="true">
        <span className="food-emoji">{item.emoji}</span>
        <span className="category-tag">{item.category}</span>
        <button
          className={`favourite-button ${favourite ? "is-favourite" : ""}`}
          type="button"
          onClick={() => onToggleFavourite(item.id)}
          aria-label={favourite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
          aria-pressed={favourite}
        >{favourite ? "♥" : "♡"}</button>
      </div>
      <div className="item-card-content">
        <div className="item-card-heading">
          <h3><Link to={`/item/${item.id}`}>{item.name}</Link></h3>
          <strong className="price">Rs. {item.price}</strong>
        </div>
        <p>{item.description}</p>
        <div className="card-actions">
          <Link className="text-link" to={`/item/${item.id}`}>View details <span aria-hidden="true">→</span></Link>
          <button className="button button-small" type="button" onClick={() => onAdd(item)}>+ Add</button>
        </div>
      </div>
    </article>
  );
}