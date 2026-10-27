import { Link } from "react-router-dom";

export default function Cart({ items, total, onChangeQuantity, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="empty-state cart-empty">
        <span aria-hidden="true">🛍️</span>
        <h2>Your cart is empty</h2>
        <p>Pick something tasty from today's menu.</p>
        <Link className="button" to="/">Explore the menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-items" aria-label="Items in your cart">
        {items.map((item) => (
          <article className="cart-row" key={item.id}>
            <div className="cart-food-icon" aria-hidden="true">{item.emoji}</div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Rs. {item.price} each</p>
              <button className="remove-link" type="button" onClick={() => onRemove(item.id)}>Remove</button>
            </div>
            <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
              <button type="button" onClick={() => onChangeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => onChangeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
            </div>
            <strong className="line-total">Rs. {item.price * item.quantity}</strong>
          </article>
        ))}
      </section>
      <aside className="order-summary">
        <h2>Order summary</h2>
        <div className="summary-line"><span>Items</span><span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
        <div className="summary-line"><span>Subtotal</span><span>Rs. {total}</span></div>
        <div className="summary-line"><span>Campus pickup</span><span>Free</span></div>
        <div className="summary-total"><span>Total</span><strong>Rs. {total}</strong></div>
        <button className="button checkout-button" type="button" onClick={() => window.alert("Demo order placed! This project does not process real payments.")}>Place demo order</button>
        <p className="fine-print">Demo only — no payment is collected.</p>
      </aside>
    </div>
  );
}