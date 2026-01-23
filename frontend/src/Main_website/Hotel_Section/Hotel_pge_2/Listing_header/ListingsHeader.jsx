import "./ListingsHeader.css";

const ListingsHeader = () => {
  return (
    <div className="listings-header">
      <h2>2509 Properties in Goa</h2>

      <div className="sort-tabs">
        <span className="active">Popularity</span>
        <span>Price (Low to High)</span>
        <span>Price (High to Low)</span>
        <span>User Rating</span>
        <span>Lowest Price & Best Rated</span>
      </div>
    </div>
  );
};

export default ListingsHeader;
