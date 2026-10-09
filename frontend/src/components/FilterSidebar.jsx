import React from 'react';
export default function FilterSidebar({ category, setCategory, location, setLocation, maxPrice, setMaxPrice, categories }) {
  return (
    <aside className="card h-fit p-5">
      <h3 className="mb-5 text-lg font-bold">Filters</h3>
      <label className="mb-2 block text-sm font-semibold">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="input mb-5">
        <option value="All">All categories</option>
        {categories.map((item) => <option key={item}>{item}</option>)}
      </select>

      <label className="mb-2 block text-sm font-semibold">Location</label>
      <input value={location} onChange={(e) => setLocation(e.target.value)} className="input mb-5" placeholder="e.g. Kolhapur" />

      <label className="mb-2 block text-sm font-semibold">Maximum price</label>
      <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input" placeholder="Any price" />
    </aside>
  );
}
