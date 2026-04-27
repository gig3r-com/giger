import React, { ReactNode } from 'react';
import { UserModuleContextProvider } from '@/modules/users';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <UserModuleContextProvider>
      { children }
    </UserModuleContextProvider>
  )
}
