import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input value="Goa" readOnly />
      <input value="Thu, 8 Jan 2026" readOnly />
      <input value="Fri, 9 Jan 2026" readOnly />
      <input value="1 Room, 2 Adults" readOnly />
      <button>SEARCH</button>
    </div>
  );
};

export default SearchBar;
