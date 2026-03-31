const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchHealth() {
  const res = await fetch(`${API_URL}/api/v1/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/v1/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: string) {
  const res = await fetch(`${API_URL}/api/v1/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
}) {
  const res = await fetch(`${API_URL}/api/v1/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}
