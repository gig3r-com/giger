'use client';
import React, { useEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';

import { UserForm } from '@/modules/users';
import TemplateProvider from '@/modules/users/configs/TemplateProvider';
import { UserList, useUsers } from '@/components/modules/users';

type Params = { userHandle?: string };

function Page() {
  const router = useRouter();
  const { userHandle } = useParams<Params>();
  const { selected, setSelected } = useUsers();

  // Refs to coordinate one-time hydration & avoid races with URL syncing.
  const hydratedFromUrlRef = useRef(false);
  const hydratingRef = useRef(false);

  // 1) ONE-TIME hydration from the URL -> app state (with fetch + failure redirect)
  useEffect(() => {
    if (hydratedFromUrlRef.current) return;

    const controller = new AbortController();
    const run = async () => {
      hydratedFromUrlRef.current = true;

      // No URL handle? Nothing to hydrate.
      if (!userHandle) return;

      // If already have a selection, skip fetching.
      if (selected) return;

      hydratingRef.current = true;
      try {
        // Replace this with your real data-source (context action, RPC, etc.)
        // If your backend returns 404 for unknown handles, this will catch it.
        const res = await fetch(`/api/users/${encodeURIComponent(userHandle)}`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!res.ok) {
          // Fetch failed (404/500/etc) -> clear selection and go to the list root
          setSelected(null as any);
          router.replace('/users/list');
          return;
        }

        const user = await res.json();

        // If your store expects an object:
        setSelected(user);

        // If your store expects just the handle, use:
        // setSelected(user.handle as any);
      } catch {
        // Network / abort -> also fail-safe to list root
        setSelected(null as any);
        router.replace('/users/list');
      } finally {
        hydratingRef.current = false;
      }
    };

    run();
    return () => controller.abort();
  }, [userHandle, selected, setSelected, router]);

  // 2) App state -> URL (source of truth is `selected` AFTER hydration)
  useEffect(() => {
    // Don't sync the URL while we're still hydrating from it.
    if (hydratingRef.current) return;

    // If we have a selected user, keep the URL in sync.
    if (selected) {
      const handle =
        typeof selected === 'string' ? selected : selected.handle;

      if (userHandle !== handle) {
        router.replace(`/users/list/${handle}`);
      }
      return;
    }

    // No selection (e.g., user cleared, or hydration failed earlier) —
    // if we're on a handle route, normalize back to the list root.
    if (userHandle) {
      router.replace('/users/list');
    }
  }, [selected, userHandle, router]);

  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Stack spacing={2} sx={{ width: 400, flexShrink: 0 }}>
        <TemplateProvider />
        <UserList />
      </Stack>
      <UserForm />
    </Stack>
  );
}

export default Page;
