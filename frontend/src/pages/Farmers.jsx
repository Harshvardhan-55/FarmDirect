import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FarmerCard from "../components/FarmerCard";

export default function Farmers() {
  const [search, setSearch] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/auth/farmers"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load farmers"
          );
        }

        console.log("DATABASE FARMERS:", data.farmers);

        setFarmers(data.farmers || []);
      } catch (err) {
        console.error("FARMERS ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const filteredFarmers = farmers.filter((farmer) =>
    `${farmer.name} ${farmer.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="container-page py-12">
      <div className="mb-8">
        <p className="font-semibold text-farm-600">
          Meet the producers
        </p>

        <h1 className="section-title mt-1">
          Farmers near you
        </h1>

        <p className="mt-2 text-slate-500">
          Discover farmers registered on FarmDirect.
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search farmer or email..."
      />

      {loading && (
        <div className="mt-10 text-center text-slate-500">
          Loading farmers...
        </div>
      )}

      {error && (
        <div className="mt-7 rounded-xl bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filteredFarmers.length === 0 && (
          <div className="mt-10 rounded-xl bg-slate-50 p-8 text-center">
            <h2 className="text-xl font-bold text-slate-700">
              No farmers found
            </h2>

            <p className="mt-2 text-slate-500">
              Register as a farmer to appear here.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredFarmers.length > 0 && (
          <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFarmers.map((farmer) => (
              <FarmerCard
                key={farmer._id}
                farmer={{
                  id: farmer._id,
                  name: farmer.name,
                  email: farmer.email,
                  location: "FarmDirect",
                  farmName: `${farmer.name}'s Farm`,
                }}
              />
            ))}
          </div>
        )}
    </section>
  );
}