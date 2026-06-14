// src/lib/apiClient.ts

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

type RequestOptions = {
  headers?: HeadersInit;
};

class ApiClient {
  private attachAuthHeaders(): HeadersInit {
    const token = window.localStorage.getItem("utp-match-token");

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.attachAuthHeaders(),
        ...options?.headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  async post<T, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.attachAuthHeaders(),
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Error HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient();
