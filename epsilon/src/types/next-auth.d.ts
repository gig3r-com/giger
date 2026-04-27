import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      handle?: string | null;
      faction?: string | null;
      factionRankActual?: string | number | null;
      factionRankPublic?: string | number | null;
    };
    apiToken?: string; // only if you expose it intentionally
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    handle?: string | null;
    faction?: string | null;
    factionRankActual?: string | number | null;
    factionRankPublic?: string | number | null;
    apiToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    handle?: string | null;
    faction?: string | null;
    factionRankActual?: string | number | null;
    factionRankPublic?: string | number | null;
    apiToken?: string; // keep server-only if possible
  }
}
