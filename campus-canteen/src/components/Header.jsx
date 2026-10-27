import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label="Campus Canteen home">
          <span className="brand-mark" aria-hidden="true">☕</span>
          <span>Campus<span className="brand-light"> Canteen</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/cart" className="cart-link">
            <span aria-hidden="true">🛒</span> Cart
            <span className="cart-count" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}