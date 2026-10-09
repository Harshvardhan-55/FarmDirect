import React from 'react';
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products, farmers, animals..." }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-12"
        placeholder={placeholder}
      />
    </div>
  );
}
