const API_BASE_URL = "http://localhost:8080/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("accessToken");

  console.log("API REQUEST:", `${API_BASE_URL}${endpoint}`);
  console.log("TOKEN EXISTS:", !!token);

  const headers = new Headers(options.headers);

  if (token) {
    headers.set(
      "Authorization",
      token.startsWith("Bearer ") ? token : `Bearer ${token}`,
    );
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  console.log("API RESPONSE:", endpoint, response.status);

  if (!response.ok) {
    const message = await response.text();

    throw Object.assign(
      new Error(message || `Request failed: ${response.status}`),
      { status: response.status },
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
