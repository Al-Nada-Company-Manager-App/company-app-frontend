import { getBackendUrl } from "@src/platform/storage";

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Default to JSON content type if not specified and not FormData
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const config = {
    ...options,
    headers,
  };

  const baseUrl = await getBackendUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Handle unauthorized - maybe redirect to login?
    // For now just clear token
    // localStorage.removeItem("authToken");
    // window.location.href = "/login";
  }

  return response;
};
