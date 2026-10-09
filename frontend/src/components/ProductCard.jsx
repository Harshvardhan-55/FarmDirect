import React from 'react';
import { Link } from "react-router-dom";
import { MapPin, ShoppingCart } from "lucide-react";
import Rating from "./Rating";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const id = product._id || product.id;

  return (
    <article className="card overflow-hidden transition hover:-translate-y-1">
      <Link to={`/products/${id}`} className="block">
        {product.image ? <img src={product.image} alt={product.name} className="h-52 w-full object-cover" /> : <div className="h-52 bg-farm-100" />}
      </Link>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.category}</p>
          </div>
          <Rating value={product.rating} reviews={product.reviews} />
        </div>
        <p className="mb-2 text-xl font-extrabold text-farm-700">â‚¹{product.price}<span className="text-sm font-medium text-slate-400">/{product.unit}</span></p>
        <p className="mb-4 flex items-center gap-1 text-sm text-slate-500"><MapPin size={15} /> {product.location}</p>
        <div className="flex gap-2">
          <Link to={`/products/${id}`} className="btn-secondary flex-1 py-2.5">View</Link>
          <button onClick={() => addToCart(product)} className="btn-primary flex-1 py-2.5">
            <ShoppingCart size={16} className="mr-1" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
