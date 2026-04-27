'use client';

import { useMemo, useEffect, useState, ReactNode, useCallback, use } from 'react';
import { ApiUser } from '@/app/api/mappers/user';
import {
  UsersByHandle,
  UserContextType,
  initialUserContext,
  UserContext,
} from './';
import { useParams } from 'next/navigation';

interface Props {
  children: ReactNode;
}

/* ───────────────── helpers ───────────────── */

function toUsersByHandle(list: ApiUser[]): UsersByHandle {
  return list.reduce<UsersByHandle>((acc, user) => {
    acc[user.handle] = user;
    return acc;
  }, {});
}

async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(input, { ...init, signal, cache: 'no-store' });
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${input} failed: ${res.status}`);
  return res.json();
}

/* ──────────────── provider ──────────────── */

export default function UserContextProvider({ children }: Props) {
  const rawParams = useParams() as unknown;
  const unwrappedParams =
    typeof (rawParams as any)?.then === 'function'
      ? use(rawParams as Promise<Record<string, string>>)
      : (rawParams as Record<string, string> | undefined);
  const urlHandle = unwrappedParams?.userHandle ?? null;

  const [usersByHandle, setUsersByHandle] = useState<UsersByHandle>(
    initialUserContext.usersByHandle
  );

  const [selected, setSelected] = useState<ApiUser | null>(
    initialUserContext.selected
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ─────────────── data loaders ─────────────── */

  const fetchUsers = useCallback(
    async (opts?: { signal?: AbortSignal }): Promise<ApiUser[] | null> => {
      try {
        setIsLoading(true);
        const data = await fetchJSON<{ users?: ApiUser[] }>(
          '/api/users',
          undefined,
          opts?.signal
        );
        const list = Array.isArray(data?.users) ? data.users! : [];
        setUsersByHandle(toUsersByHandle(list));
        return list;
      } catch (err: any) {
        if (err?.name !== 'AbortError') console.error('Failed to load users', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchUserByHandle = useCallback(
    async (handle: string, opts?: { signal?: AbortSignal }): Promise<ApiUser | null> => {
      if (!handle) return null;
      try {
        setIsLoading(true);
        const data = await fetchJSON<{ user?: ApiUser }>(
          `/api/users/${encodeURIComponent(handle)}`,
          undefined,
          opts?.signal
        );
        const user = data?.user ?? null;
        if (user) {
          setUsersByHandle(prev => ({ ...prev, [user.handle]: user }));
        }
        return user;
      } catch (err: any) {
        if (err?.name !== 'AbortError') console.error(`Failed to load user "${handle}"`, err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /* ─────────────── lifecycle ─────────────── */

  // Initial load
  useEffect(() => {
    const ctrl = new AbortController();
    fetchUsers({ signal: ctrl.signal });
    return () => ctrl.abort();
  }, [fetchUsers]);

  // Sync selection from URL; fetch single user if needed
  useEffect(() => {
    if (!urlHandle) return;

    const existing = usersByHandle[urlHandle];
    if (existing) {
      setSelected(existing);
      return;
    }

    const ctrl = new AbortController();
    fetchUserByHandle(urlHandle, { signal: ctrl.signal }).then(user => {
      if (user) setSelected(user);
    });
    return () => ctrl.abort();
  }, [urlHandle, usersByHandle, fetchUserByHandle]);

  /* ─────────────── context ─────────────── */

  const context: UserContextType = useMemo(
    () => ({
      fetch: fetchUsers,
      usersByHandle,
      selected,
      setSelected,
      isLoading,
    }),
    [fetchUsers, usersByHandle, selected, isLoading]
  );

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
