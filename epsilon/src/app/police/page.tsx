'use client';

import React from 'react';
import { PoliceThemeProvider, RootScreen, HeaderBar } from './_components/PoliceTheme';
import { LoginCard } from './_components/LoginCard';
import { SessionDock } from './_components/SessionDock';
import { SearchConsole } from './_components/SearchConsole';
import { StoredSession } from './_lib/types';
import { beginSession, endSession, loadSessions, saveSessions } from './_lib/sessionStore';
import { useSector } from '@/app/sector/sectorContext';

export default function PolicePage() {
  const [officer, setOfficer] = React.useState<{ name: string; clearance: 1|2|3|4|5 } | null>(null);
  const [sessions, setSessions] = React.useState<StoredSession[]>([]);
  const [sessionId, setSessionId] = React.useState<string>('');
  const { setToast } = useSector();

  React.useEffect(()=>{ setSessions(loadSessions()); }, []);

  function handleLogin(o: { name: string; clearance: 1|2|3|4|5 }) {
    const { session, all } = beginSession(loadSessions(), o.name, o.clearance);
    setOfficer(o);
    setSessions(all);
    setSessionId(session.id);
    saveSessions(all);
    setToast({ msg: `Logged in as ${o.name} (L${o.clearance})`, sev: 'success' });
  }

  function log(message: string) {
    if (!sessionId) return;
    const next = sessions.map(s => s.id === sessionId
      ? { ...s, logs: [{ t: Date.now(), msg: message }, ...s.logs].slice(0,200) }
      : s
    );
    setSessions(next);
    saveSessions(next);
  }

  function handleLogout() {
    if (sessionId) {
      const next = endSession(sessions, sessionId);
      setSessions(next);
      saveSessions(next);
    }
    setOfficer(null);
    setSessionId('');
    setToast({ msg: 'Logged out', sev: 'info' });
  }

  return (
    <PoliceThemeProvider>
      <RootScreen>
        <HeaderBar />
        {officer && (
          <SessionDock
            officer={officer}
            sessions={sessions}
            sessionId={sessionId}
            onLog={log}
            onLogout={handleLogout}
          />
        )}

        {!officer ? (
          <LoginCard onLogin={handleLogin} />
        ) : (
          <SearchConsole
            officer={officer}
            onLog={log}
          />
        )}
      </RootScreen>
    </PoliceThemeProvider>
  );
}
