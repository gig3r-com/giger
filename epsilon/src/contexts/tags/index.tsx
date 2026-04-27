'use client';
import * as React from 'react';

export type GlobalTag = { name: string };

type TagsCtx = {
  byName: Record<string, GlobalTag>;
  upsert: (t: GlobalTag) => void;
  remove: (name: string) => void;
  importMany: (arr: GlobalTag[]) => void;
  exportAll: () => GlobalTag[];
};

const Ctx = React.createContext<TagsCtx | undefined>(undefined);
const LS_KEY = 'global_tags_v1';

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [byName, setByName] = React.useState<Record<string, GlobalTag>>({});

  React.useEffect(() => { try { const raw = localStorage.getItem(LS_KEY); if (raw) setByName(JSON.parse(raw)); } catch {} }, []);
  React.useEffect(() => { try { localStorage.setItem(LS_KEY, JSON.stringify(byName)); } catch {} }, [byName]);

  const upsert = (t: GlobalTag) => setByName((s) => ({ ...s, [t.name]: t }));
  const remove = (n: string) => setByName((s) => { const m = { ...s }; delete m[n]; return m; });
  const importMany = (arr: GlobalTag[]) => setByName((s) => { const m = { ...s }; for (const t of arr) m[t.name] = t; return m; });
  const exportAll = () => Object.values(byName);

  return <Ctx.Provider value={{ byName, upsert, remove, importMany, exportAll }}>{children}</Ctx.Provider>;
}

export function useTags() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useTags must be used within TagsProvider');
  return ctx;
}
