const Filters = ({ type, setType, rating, setRating, budget, setBudget}) => {
  return (
    <div className="flex gap-4 mb-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="restaurants">Restaurants</option>
        <option value="attractions">Attractions</option>
      </select>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Ratings</option>
        <option value="3">Above 3</option>
        <option value="4">Above 4</option>
        <option value="4.5">Above 4.5</option>
      </select>

      <select
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="border px-3 py-2 rounded"
      >
          <option value="">All Budgets</option>
  <option value="1">$ (Budget)</option>
  <option value="2">$$ (Mid-range)</option>
  <option value="3">$$$ (Luxury)</option>
      </select>
    </div>
  );
};

export default Filters;
