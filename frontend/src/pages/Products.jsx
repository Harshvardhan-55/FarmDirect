import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import { getProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const [search, setSearch] = useState(""); const [category, setCategory] = useState("All"); const [location, setLocation] = useState(""); const [maxPrice, setMaxPrice] = useState("");
  useEffect(() => { getProducts().then(({ products }) => setProducts(products)).catch(e => setError(e.message)).finally(() => setLoading(false)); }, []);
  const categories = [...new Set(products.map(p => p.category))];
  const filtered = useMemo(() => products.filter(p => `${p.name} ${p.category} ${p.farmer?.name || ""}`.toLowerCase().includes(search.toLowerCase()) && (category === "All" || p.category === category) && (!location || p.location.toLowerCase().includes(location.toLowerCase())) && (!maxPrice || p.price <= Number(maxPrice))), [products, search, category, location, maxPrice]);
  return <section className="container-page py-12"><div className="mb-8"><p className="font-semibold text-farm-600">Marketplace</p><h1 className="section-title mt-1">Fresh farm products</h1><p className="mt-2 text-slate-500">Buy directly from verified local farmers.</p></div><div className="mb-6"><SearchBar value={search} onChange={setSearch} /></div><div className="grid gap-7 lg:grid-cols-[250px_1fr]"><FilterSidebar {...{ category, setCategory, location, setLocation, maxPrice, setMaxPrice, categories }} /><div><p className="mb-5 text-sm text-slate-500">{filtered.length} products found</p>{loading ? <p className="text-slate-500">Loading products...</p> : error ? <div className="card p-8 text-red-600">{error}</div> : filtered.length ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(product => <ProductCard key={product._id} product={product} />)}</div> : <div className="card p-12 text-center text-slate-500">No products are listed yet.</div>}</div></div></section>;
}
