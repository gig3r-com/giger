'use client';

import React, { useMemo } from 'react';
import { HeaderBar } from './PoliceTheme';
import { SessionDock } from '@/app/sector/police/_components/SessionDock';
import { beginSession, endSession, loadSessions, saveSessions } from '../_lib/sessionStore';
import { useSector } from '@/app/sector/sectorContext';
import { SearchConsole } from '@/app/sector/police/_components/SearchConsole';
import { redirect } from 'next/navigation';

const clereance = {
  'm1guel': 3,
  'nakajima': 2,
  'not_bruce': 2,
  'schmidt': 1,
  'the_han': 1,
  'nakage_900': 1,
};

function Content({ user, signOut }) {
  const { setToast } = useSector();
  const [sessions, setSessions] = React.useState<StoredSession[]>([]);
  const [sessionId, setSessionId] = React.useState<string>('');

  const officer = useMemo(() => ({
    name: user.handle,
    clearance: clereance[user.handle] ?? 1,
  }), [user]);

  React.useEffect(()=>{ setSessions(loadSessions()); }, []);
  React.useEffect(()=>{
    if (!user) return;
    const { session, all } = beginSession(loadSessions(), user.name, user.clearance);
    setSessions(all); saveSessions(all); setSessionId(session.id);
    setToast({ msg: `Logged in as ${user.name} (L${user.clearance})`, sev: 'success' });
    // end session on unload
    const cleanup = () => { setSessions(s => { const next = endSession(s, session.id); saveSessions(next); return next; }); };
    window.addEventListener('beforeunload', cleanup);
    return () => window.removeEventListener('beforeunload', cleanup);
  }, [user]);

  function log(message: string) {
    if (!sessionId) return;
    const next = sessions.map(s => s.id === sessionId
      ? { ...s, logs: [{ t: Date.now(), msg: message }, ...s.logs].slice(0,200) }
      : s
    );
    setSessions(next); saveSessions(next);
  }

  function handleLogout() {
    if (sessionId) {
      const next = endSession(sessions, sessionId);
      setSessions(next); saveSessions(next);
    }
    setSessionId('');
    setToast({ msg: 'Logged out', sev: 'info' });
    redirect('/sector/police/logout');
  }

  return (
    <>
      <HeaderBar />
      <SessionDock
        officer={ officer }
        sessions={ sessions }
        sessionId={ sessionId }
        onLog={ log }
        onLogout={ handleLogout }
      />
      <SearchConsole
        officer={ officer }
        onLog={ log }
      />
    </>
  );
}

export default Content;