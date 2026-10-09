import React from 'react';
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Rating from "./Rating";

export default function AnimalCard({ animal }) {
  const id = animal._id || animal.id;
  return (
    <article className="card overflow-hidden transition hover:-translate-y-1">
      <Link to={`/animals/${id}`}>
        {animal.image ? <img src={animal.image} alt={animal.name} className="h-56 w-full object-cover" /> : <div className="h-56 bg-farm-100" />}
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900">{animal.name}</h3>
            <p className="text-sm text-slate-500">{animal.breed}</p>
          </div>
          <Rating value={animal.rating} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-500">
          <span>Age: {animal.age}</span>
          <span>Gender: {animal.gender}</span>
          <span>Weight: {animal.weight}</span>
          <span className="flex items-center gap-1"><MapPin size={14} />{animal.location}</span>
        </div>
        <p className="mt-4 text-xl font-extrabold text-farm-700">â‚¹{animal.price.toLocaleString("en-IN")}</p>
        <Link to={`/animals/${id}`} className="btn-primary mt-4 w-full py-2.5">View Details</Link>
      </div>
    </article>
  );
}
