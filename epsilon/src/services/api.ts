import axios, { AxiosInstance } from 'axios'
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

/**
 * Shared Axios instance for server/client requests.
 * - Uses NEXT_PUBLIC_API_BASE_URL in the browser and API_BASE_URL on the server.
 * - Exposes a helper to set/clear the AuthToken header.
 */
const baseURL =
  typeof window === 'undefined'
    ? process.env.API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
    // Fail fast so misconfiguration is obvious during development
    // (in production you might want to log instead).
    console.warn('[api] baseURL is not defined. Did you set API_BASE_URL / NEXT_PUBLIC_API_BASE_URL?');
}

const api: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
});

/**
 * Set or clear the AuthToken header on the shared axios instance.
 */
export function setAuthToken(token?: string | null) {
    if (token) {
        (api.defaults.headers.common as { AuthToken: string }).AuthToken = token;
    } else {
        delete (api.defaults.headers.common as { AuthToken: string }).AuthToken;
    }
}

/**
 * Perform credentials login against the backend.
 * Returns the api token string (and sets it as default auth header for client-side calls).
 */
export async function loginWithCredentials(username: string, password: string): Promise<{ status: 'ok' | 'error', user: { handle:  string, }, token: string, message?: string }> {
    try {
        const { data } = await api.get<string>('/Login/giger', {
            params: { username, password },
        });
        if (typeof window !== 'undefined') {
            setAuthToken(data);
        }
        const profileResponse = await axios.get(
          `${baseURL}/User/private/byUsername`,
          { params: { userName: username }, headers: { AuthToken: data } }
        );
        return { status: 'ok', user: profileResponse.data, token: data, };
    } catch (e) {
        return { status: 'error', message: e };
    }
}

export default api;

export async function get(url: string): Promise<any> {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token: string = (session as { apiToken: string, }).apiToken;
    if (!token) {
        return NextResponse.json({ error: 'Missing API token' }, { status: 401 })
    }

    const upstreamUrl = `${process.env.API_BASE_URL}/${url}`;
    const upstream = await fetch(upstreamUrl, {
        method: "GET",
        headers: { AuthToken: token, },
        cache: "no-store",
    });

    const rawData = await upstream.json().catch(() => null);
    if (!rawData) {
        return NextResponse.json({ error: 'Invalid JSON from upstream' }, { status: 502 })
    }

    return rawData;
}
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  '';

const buildUrl = (path: string) =>
  path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

async function handleResponse(res: Response) {
    if (!res.ok) {
        // Try to extract a useful error message from JSON, otherwise use status text
        let message = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            message = data?.error || data?.message || message;
        } catch {
            // ignore JSON parse errors
        }
        throw new Error(message);
    }

    // 204 No Content or empty body
    if (res.status === 204) return null;

    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
}

/**
 * DELETE helper.
 * Usage:
 *   await del(`Conversation/${id}`);
 *   // or with options: await del(`Conversation/${id}`, { headers: { ... } });
 *   // if you need to send a JSON body (rare for DELETE), pass a stringified body in options.body
 */
export async function del(path: string, options: RequestInit = {}) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token: string = (session as { apiToken: string, }).apiToken;
    const url = buildUrl(path);
    const res = await fetch(url, {
        method: 'DELETE',
        // keep headers unobtrusive; only set JSON header if caller provides a body
        headers: {
            AuthToken: token
        },
    });
    return handleResponse(res);
}

export async function post(url: string, payload?: unknown): Promise<any> {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token: string = (session as { apiToken: string }).apiToken;
    if (!token) {
        return NextResponse.json({ error: 'Missing API token' }, { status: 401 });
    }

    const base = process.env.API_BASE_URL || '';
    const upstreamUrl = `${base}${url.startsWith('/') ? '' : '/'}${url}`;

    // If payload is FormData, let fetch set Content-Type; otherwise send JSON
    const isFormData =
      typeof FormData !== 'undefined' && payload instanceof FormData;

    const res = await fetch(upstreamUrl, {
        method: 'POST',
        headers: {
            AuthToken: token,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: isFormData ? (payload as FormData) : payload ? JSON.stringify(payload) : undefined,
        cache: 'no-store',
    });

    // Keep behavior similar to your GET: try to parse JSON, else fail
    const rawData = await res.json().catch(() => null);
    if (!rawData) {
        return NextResponse.json({ error: 'Invalid JSON from upstream' }, { status: 502 });
    }

    return rawData;
}

export async function patch(path: string, payload?: unknown): Promise<any> {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token: string = (session as { apiToken: string }).apiToken;
    if (!token) {
        return NextResponse.json({ error: 'Missing API token' }, { status: 401 });
    }

    const url = buildUrl(path);

    // If payload is FormData, let fetch set Content-Type; otherwise send JSON
    const isFormData =
      typeof FormData !== 'undefined' && payload instanceof FormData;

    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            AuthToken: token,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: isFormData
          ? (payload as FormData)
          : payload
            ? JSON.stringify(payload)
            : undefined,
        cache: 'no-store',
    });

    return handleResponse(res);
}

export async function put(path: string, payload?: unknown): Promise<any> {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token: string = (session as { apiToken: string }).apiToken;
    if (!token) {
        return NextResponse.json({ error: 'Missing API token' }, { status: 401 });
    }

    const url = buildUrl(path);

    // If payload is FormData, let fetch set Content-Type; otherwise send JSON
    const isFormData =
      typeof FormData !== 'undefined' && payload instanceof FormData;

    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            AuthToken: token,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: isFormData
          ? (payload as FormData)
          : payload
            ? JSON.stringify(payload)
            : undefined,
        cache: 'no-store',
    });

    return handleResponse(res);
}