import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, MapPin } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { getFarmer, getProducts } from "../services/api";

export default function FarmerProfile() {
  const { id } = useParams();

  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFarmer = async () => {
      try {
        setLoading(true);
        setError("");

        const farmerData = await getFarmer(id);

        setFarmer(farmerData.farmer);

        const productData = await getProducts();

        const farmerProducts = (
          productData.products || []
        ).filter(
          (product) =>
            product.farmer?._id === id ||
            product.farmer === id
        );

        setProducts(farmerProducts);
      } catch (err) {
        console.error("FARMER PROFILE ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFarmer();
  }, [id]);

  if (loading) {
    return (
      <section className="container-page py-12">
        <div className="card p-10 text-center">
          Loading farmer profile...
        </div>
      </section>
    );
  }

  if (error || !farmer) {
    return (
      <section className="container-page py-12">
        <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
          {error || "Farmer not found"}
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-12">

      {/* PROFILE */}
      <div className="card overflow-hidden">

        <div className="h-36 bg-gradient-to-r from-farm-800 to-farm-500" />

        <div className="-mt-14 p-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">

            <div className="grid h-28 w-28 place-items-center rounded-3xl border-4 border-white bg-farm-100 text-5xl shadow-md">
              👨‍🌾
            </div>

            <div className="flex-1">

              <h1 className="text-3xl font-black">
                {farmer.name}
              </h1>

              <p className="mt-1 flex items-center gap-1 text-slate-500">
                <MapPin size={15} />
                FarmDirect Farmer
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {farmer.email}
              </p>

              <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-farm-700">
                <BadgeCheck size={16} />
                Registered Farmer
              </p>

            </div>

            <Link
              to="/messages"
              className="btn-primary"
            >
              Contact Farmer
            </Link>

          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">

            <div>
              <p className="text-sm text-slate-500">
                Farmer
              </p>

              <p className="font-bold">
                {farmer.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Products
              </p>

              <p className="font-bold">
                {products.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-bold break-all">
                {farmer.email}
              </p>
            </div>

          </div>

          <p className="mt-7 max-w-3xl leading-7 text-slate-600">
            This farmer is registered on FarmDirect and
            can list agricultural products directly for
            buyers.
          </p>

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="mt-12">

        <h2 className="section-title">
          Products from {farmer.name}
        </h2>

        {products.length === 0 ? (
          <p className="mt-7 text-slate-500">
            This farmer has no current products listed.
          </p>
        ) : (
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  id: product._id,
                }}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}
