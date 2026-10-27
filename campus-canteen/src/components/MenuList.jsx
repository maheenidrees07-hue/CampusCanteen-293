import ItemCard from "./ItemCard";

export default function MenuList({ items, onAdd, favourites, onToggleFavourite }) {
  if (items.length === 0) {
    return <div className="empty-state"><span aria-hidden="true">🔎</span><h3>No items found</h3><p>Try another search or category.</p></div>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onAdd={onAdd}
          favourite={favourites.includes(item.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}