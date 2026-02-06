'use client';

import React, { use, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/components/modules/users';

export default function Layout({ params, children }: { params: Promise<{ userHandle?: string }>, children: ReactNode }) {
  // const router = useRouter();
  // const { usersByHandle, selected, setSelected } = useUsers();
  // const { userHandle } = use(params);
  //
  // React.useEffect(() => {
  //   if (!userHandle) {
  //     router.replace('/creator/users');
  //     return;
  //   }
  //
  //   if (userHandle === selected?.handle) return;
  //
  //   const user = usersByHandle[userHandle];
  //   if (!user) return;
  //   setSelected(user);
  // }, [userHandle, usersByHandle, selected?.handle, setSelected, router]);

  return children;
}
