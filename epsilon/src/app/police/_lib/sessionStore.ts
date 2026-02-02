import { StoredSession } from './types';

const KEY = 'police_sessions_v4';

export function loadSessions(): StoredSession[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

export function saveSessions(s: StoredSession[]) {
  try { localStorage.setItem(KEY, JSON.stringify(s.slice(-25))); } catch {}
}

export function beginSession(existing: StoredSession[], officer: string, clearance: 1|2|3|4|5) {
  const session: StoredSession = {
    id: `${Date.now()}-${officer}`,
    officer, clearance,
    start: Date.now(),
    logs: []
  };
  const all = [...existing, session];
  return { session, all };
}

export function endSession(existing: StoredSession[], id: string) {
  return existing.map(s => s.id === id ? { ...s, end: Date.now() } : s);
}
