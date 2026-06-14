const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

type RequestOptions = {
  headers?: HeadersInit;
  query?: Record<string, string | number | boolean | null | undefined>;
};

class ApiClient {
  private buildUrl(path: string, query?: RequestOptions["query"]): string {
    const url = new URL(`${API_BASE_URL}${path}`);

    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    return url.toString();
  }

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
    const response = await fetch(this.buildUrl(path, options?.query), {
      method: "GET",
      headers: {
        ...DEFAULT_HEADERS,
        ...this.attachAuthHeaders(),
        ...options?.headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  async post<T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions,
  ): Promise<T> {
    const response = await fetch(this.buildUrl(path, options?.query), {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        ...this.attachAuthHeaders(),
        ...options?.headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async patch<T, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions,
  ): Promise<T> {
    const response = await fetch(this.buildUrl(path, options?.query), {
      method: "PATCH",
      headers: {
        ...DEFAULT_HEADERS,
        ...this.attachAuthHeaders(),
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const text = await response.text();
      let message: string;

      try {
        const json = JSON.parse(text) as {
          error?: { message?: string; code?: string };
        };
        message = json.error?.message ?? json.error?.code ?? text;
      } catch {
        message = text;
      }

      throw new Error(message || `Error HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient();
