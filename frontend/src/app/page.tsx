"use client";

import { useEffect, useState } from "react";
import { fetchHealth, fetchProducts, createProduct } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: string;
}

export default function Home() {
  const [health, setHealth] = useState<string>("checking...");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    fetchHealth()
      .then((data) => setHealth(data.status))
      .catch(() => setHealth("unreachable"));

    fetchProducts()
      .then((data) => setProducts(data.data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await createProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
    });
    setProducts([result.data, ...products]);
    setForm({ name: "", description: "", price: "" });
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40 }}>
      <h1>ECS Fargate Demo App</h1>

      <section
        style={{
          padding: 16,
          background: health === "healthy" ? "#d4edda" : "#f8d7da",
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <strong>Backend Status:</strong> {health}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: 8, flex: 1 }}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            style={{ padding: 8, flex: 2 }}
          />
          <input
            placeholder="Price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            style={{ padding: 8, width: 100 }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            Add
          </button>
        </form>
      </section>

      <section>
        <h2>Products ({products.length})</h2>
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {products.map((p) => (
              <li
                key={p.id}
                style={{
                  padding: 16,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <strong>{p.name}</strong> - ${p.price}
                <br />
                <small>{p.description}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
