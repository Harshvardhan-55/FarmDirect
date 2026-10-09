import React from 'react';
import { Link } from "react-router-dom";
import { Sprout, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
            <Sprout /> FarmDirect
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Connecting farmers directly with buyers for fresher products, fairer prices, and stronger local communities.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-white">Marketplace</h3>
          <div className="space-y-3 text-sm">
            <Link className="block hover:text-white" to="/products">Farm Products</Link>
            <Link className="block hover:text-white" to="/animals">Livestock</Link>
            <Link className="block hover:text-white" to="/farmers">Farmers</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-white">Company</h3>
          <div className="space-y-3 text-sm">
            <a href="#how-it-works" className="block hover:text-white">How It Works</a>
            <a href="#about" className="block hover:text-white">About Us</a>
            <a href="mailto:hello@farmdirect.example" className="block hover:text-white">Support</a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-white">Contact</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex gap-2"><MapPin size={17} /> Maharashtra, India</p>
            <p className="flex gap-2"><Phone size={17} /> +91 90000 00000</p>
            <p className="flex gap-2"><Mail size={17} /> hello@farmdirect.example</p>
          </div>
          <div className="mt-5 flex gap-3">
            <span className="rounded-lg bg-white/10 p-2"><Facebook size={17} /></span>
            <span className="rounded-lg bg-white/10 p-2"><Instagram size={17} /></span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} FarmDirect. All rights reserved.
      </div>
    </footer>
  );
}
