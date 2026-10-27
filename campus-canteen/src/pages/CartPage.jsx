import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, cartTotal, changeQuantity, removeItem } = useCart();

  return (
    <main className="page-container cart-page">
      <Link className="back-link" to="/">← Continue browsing</Link>
      <div className="section-heading cart-page-heading">
        <div><span className="eyebrow muted-eyebrow">ALMOST TIME TO EAT</span><h1>Your cart<span className="heading-period">.</span></h1></div>
        <span className="result-count">{items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
      </div>
      <Cart items={items} total={cartTotal} onChangeQuantity={changeQuantity} onRemove={removeItem} />
    </main>
  );
}