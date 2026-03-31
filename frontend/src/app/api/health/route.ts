const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/api/v1/health`);
  const data = await res.json();
  return Response.json(data);
}
