'use client';
import { createContext, useContext } from 'react';
import { ApiUser } from '@/app/api/mappers/user';

export type UsersByHandle = Record<string, ApiUser>;

export interface UserContextType {
  isLoading: boolean;
  usersByHandle: UsersByHandle;
  setSelected: (value: (((prevState: (ApiUser | null)) => (ApiUser | null)) | ApiUser | null)) => void;
  fetch: (opts?: { signal?: AbortSignal }) => Promise<ApiUser[] | null>;
  selected: ApiUser | null
}

export const initialUserContext: UserContextType = {
  isLoading: false,
  usersByHandle: {},
  setSelected: () => { return },
  fetch: async (opts?: { signal?: AbortSignal }) => { return },
  selected: null,
};

export const UserContext = createContext<UserContextType>(initialUserContext);

export function useUsers() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUsers must be used within UserContextProvider');
  return ctx;
}
