// src/services/api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

type RequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
};

export async function apiRequest<T = unknown>({
  endpoint,
  method = "GET",
  body,
  headers = {},
  requiresAuth = true,
}: RequestOptions): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (requiresAuth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers: finalHeaders,
    credentials: "include",
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let data: unknown;
  if (isJson) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMessage =
      (data as { message?: string })?.message ||
      (data as { error?: string })?.error ||
      response.statusText ||
      "Something went wrong";
    throw new Error(errorMessage);
  }

  return data as T;
}