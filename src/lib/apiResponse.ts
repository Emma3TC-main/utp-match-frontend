export function unwrapData<T = unknown>(json: unknown): T {
  if (!json || typeof json !== "object") {
    return json as T;
  }

  const record = json as Record<string, unknown>;
  return ("data" in record ? record.data : json) as T;
}

export function unwrapKey<T = unknown>(json: unknown, key: string): T {
  const data = unwrapData<Record<string, unknown> | unknown>(json);

  if (!data || typeof data !== "object") {
    return data as T;
  }

  const record = data as Record<string, unknown>;
  return (key in record ? record[key] : data) as T;
}

export function unwrapItems<T = unknown>(json: unknown): T[] {
  const data = unwrapData<Record<string, unknown> | unknown[]>(json);

  if (Array.isArray(data)) {
    return data as T[];
  }

  if (data && typeof data === "object") {
    const items = (data as Record<string, unknown>).items;
    return Array.isArray(items) ? (items as T[]) : [];
  }

  return [];
}
