import React from 'react';
import { Star } from "lucide-react";

export default function Rating({ value = 4.8, reviews = 0 }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star size={15} className="fill-yellow-400 text-yellow-400" />
      <span className="font-semibold">{value}</span>
      {reviews > 0 && <span className="text-slate-400">({reviews})</span>}
    </span>
  );
}
