'use client';
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

export type GlobalParticipant = {
  handle: string;
  color?: string;
};

type ParticipantsCtx = {
  byHandle: Record<string, GlobalParticipant>;
  upsert: (p: GlobalParticipant) => void;
  remove: (handle: string) => void;
  setColor: (handle: string, color: string) => void;
  importMany: (arr: GlobalParticipant[]) => void;
  exportAll: () => GlobalParticipant[];
};

const Ctx = createContext<ParticipantsCtx | undefined>(undefined);
const LS_KEY = 'global_participants_v1';

export function ParticipantsProvider({ children }: { children: React.ReactNode }) {
  const [byHandle, setByHandle] = useState<Record<string, GlobalParticipant>>({});

  useEffect(() => { try { const raw = localStorage.getItem(LS_KEY); if (raw) setByHandle(JSON.parse(raw)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem(LS_KEY, JSON.stringify(byHandle)); } catch {} }, [byHandle]);

  const upsert = useCallback((p: GlobalParticipant) => setByHandle((s) => ({ ...s, [p.handle]: { ...(s[p.handle] ?? {}), ...p } })), []);
  const remove = useCallback((h: string) => setByHandle((s) => { const n={...s}; delete n[h]; return n; }), []);
  const setColor = useCallback((h: string, color: string) => setByHandle((s) => ({ ...s, [h]: { ...(s[h] ?? { handle: h }), color } })), []);
  const importMany = useCallback((arr: GlobalParticipant[]) => setByHandle((s) => {
    const n = { ...s }; for (const p of arr) n[p.handle] = { ...(n[p.handle] ?? {}), ...p }; return n;
  }), []);
  const exportAll = useCallback(() => Object.values(byHandle), [byHandle]);

  const value = useMemo(() => ({ byHandle, upsert, remove, setColor, importMany, exportAll }), [byHandle, upsert, remove, setColor, importMany, exportAll]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useParticipants() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useParticipants must be used within ParticipantsProvider');
  return ctx;
}
