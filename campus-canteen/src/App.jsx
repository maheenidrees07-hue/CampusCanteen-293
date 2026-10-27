import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import CartPage from "./pages/CartPage";

function NotFound() {
  return <main className="page-container not-found"><h1>Page not found</h1><p>That page isn't on today's menu.</p><a className="button" href="/">Back to menu</a></main>;
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}