import React from 'react';
import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="container-page py-24 text-center"><p className="text-7xl font-black text-farm-200">404</p><h1 className="mt-4 text-3xl font-black">Page not found</h1><Link to="/" className="btn-primary mt-6">Back Home</Link></section>;
}
