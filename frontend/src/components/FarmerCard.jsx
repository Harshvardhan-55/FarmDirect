import React from 'react';
import { Link } from "react-router-dom";
import { BadgeCheck, MapPin } from "lucide-react";
import Rating from "./Rating";

export default function FarmerCard({ farmer }) {
  return (
    <article className="card p-6">
      <div className="flex items-center gap-4">
        {farmer.image ? <img src={farmer.image} alt={farmer.name} className="h-16 w-16 rounded-2xl object-cover" /> : <div className="grid h-16 w-16 place-items-center rounded-2xl bg-farm-100 text-2xl">👨‍🌾</div>}
        <div>
          <h3 className="font-bold text-slate-900">{farmer.name}</h3>
          {farmer.verified && <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-farm-700"><BadgeCheck size={15} /> Verified Farmer</p>}
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1 text-sm text-slate-500"><MapPin size={15} /> {farmer.location}</p>
      <div className="mt-3 flex items-center justify-between">
        <Rating value={farmer.rating} reviews={farmer.reviews} />
        <span className="text-sm text-slate-500">{farmer.orders} orders</span>
      </div>
      <Link to={`/farmers/${farmer.id}`} className="btn-secondary mt-5 w-full">View Profile</Link>
    </article>
  );
}
