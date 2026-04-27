type Id = string;

export type PrivateRecord = {
  id: Id;
  title: string;
  description: string;
};

type ReqOpts = { signal?: AbortSignal };

/** Minimal fetch wrapper: JSON in/out, helpful errors, abort-safe */
async function request<T>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...(init.headers ?? {}),
      },
      ...init,
    });

    // Error -> throw with parsed server message if possible
    if (!res.ok) {
      let details: unknown = undefined;
      try {
        details =
          res.headers.get("content-type")?.includes("application/json")
            ? await res.json()
            : await res.text();
      } catch {
        /* ignore parse errors */
      }
      const error = new Error(
        `Request failed: ${res.status} ${res.statusText}`
      ) as Error & { details?: unknown; status?: number };
      error.status = res.status;
      error.details = details;
      throw error;
    }

    // No content
    if (res.status === 204) return undefined as unknown as T;

    // Parse JSON when advertised; else return text
    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    return (isJson ? await res.json() : await res.text()) as T;
  } catch (err: any) {
    // Silently ignore aborted requests like your original code
    if (err?.name === "AbortError") return undefined as unknown as T;
    // Let callers decide how to surface errors
    console.error("privateRecordsApi request error:", err);
    throw err;
  }
}

/** GET /api/users/:userId/privateRecords */
export function fetch(userId: Id, opts?: ReqOpts): Promise<PrivateRecord[]> {
  return request<PrivateRecord[]>(
    `/api/users/${userId}/privateRecords`,
    { method: 'GET', signal: opts?.signal }
  );
}

/** POST /api/users/:userId/privateRecords */
export function add(userId: Id, record: PrivateRecord, opts?: ReqOpts): Promise<PrivateRecord> {
  return request<PrivateRecord>(
    `/api/users/${userId}/privateRecords`,
    { method: 'POST', body: JSON.stringify(record), signal: opts?.signal }
  );
}

/** PUT /api/users/:userId/privateRecords/:id */
export function edit(
  userId: Id,
  record: PrivateRecord,
  opts?: ReqOpts
): Promise<PrivateRecord> {
  const { id, ...payload } = record;
  return request<PrivateRecord>(
    `/api/users/${userId}/privateRecords/${id}`,
    { method: "PUT", body: JSON.stringify(payload), signal: opts?.signal }
  );
}

/** DELETE /api/users/:userId/privateRecords/:id */
export function remove(
  userId: Id,
  recordId: Id,
  opts?: ReqOpts
): Promise<void> {
  return request<void>(
    `/api/users/${userId}/privateRecords/${recordId}`,
    { method: "DELETE", signal: opts?.signal }
  );
}
