import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    let isActive = true;
    async function loadItem() {
      try {
        const response = await fetch("/menu.json");
        if (!response.ok) throw new Error("Could not load menu data.");
        const menu = await response.json();
        const found = menu.find((menuItem) => String(menuItem.id) === id);
        if (!found) throw new Error("That menu item could not be found.");
        if (isActive) setItem(found);
      } catch (err) {
        if (isActive) setError(err.message);
      } finally {
        if (isActive) setLoading(false);
      }
    }
    loadItem();
    return () => { isActive = false; };
  }, [id]);

  if (loading) return <main className="page-container"><div className="message-state"><span className="spinner" aria-hidden="true"></span><p>Loading item…</p></div></main>;
  if (error) return <main className="page-container"><div className="error-state" role="alert"><h2>Unable to open item</h2><p>{error}</p><Link className="button" to="/">Back to menu</Link></div></main>;

  return (
    <main className="page-container details-page">
      <Link className="back-link" to="/">← Back to menu</Link>
      <article className="details-card">
        <div className="details-art" aria-hidden="true"><span>{item.emoji}</span><div className="details-art-circle"></div></div>
        <div className="details-copy">
          <span className="category-tag detail-tag">{item.category}</span>
          <h1>{item.name}</h1>
          <p className="details-description">{item.description}</p>
          <div className="details-price">Rs. {item.price}</div>
          <p className="availability"><span className="status-dot"></span> Available today</p>
          <button className="button" type="button" onClick={() => addToCart(item)}>+ Add to cart</button>
        </div>
      </article>
    </main>
  );
}