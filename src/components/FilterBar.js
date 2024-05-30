import "../styles/FilterBar.css";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <button>Product Type</button>
      <button>Price</button>
      <button>Review</button>
      <button>Color</button>
      <button>Material</button>
      <button>Offer</button>
      <button>All Filters</button>
      <div className="sort-by">
        <label>Sort by</label>
        <select>
          <option>Popularity</option>
          <option>Price</option>
          <option>Rating</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
