export async function api(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `/api/${cleanEndpoint}`;
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized");
  }
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return null;
  }
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
}
