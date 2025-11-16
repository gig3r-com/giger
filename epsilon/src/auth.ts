import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginWithCredentials } from '@/services/api';
import { NextResponse } from 'next/server';
import { string } from 'yup';

// Shape returned by your upstream login
type UpstreamLoginOk = {
    status: 'ok';
    token: string; // apiToken
    user: {
        id: string;
        handle?: string | null;
        faction?: string | null;
        factionRankActual?: string | number | null;
        factionRankPublic?: string | number | null;
    };
};

type UpstreamLoginErr = {
    status: 'error' | 'fail';
    message: string;
};

type UpstreamLoginResp = UpstreamLoginOk | UpstreamLoginErr;

const mockLoginEnabled =
    process.env.NEXT_PUBLIC_ENABLE_MOCK_LOGIN === 'true' ||
    process.env.ENABLE_MOCK_LOGIN === 'true' ||
    process.env.NODE_ENV !== 'production';

type MockPersona = {
    username: string;
    password: string;
    profile: {
        id: string;
        handle: string | null;
        faction: string | null;
        factionRankActual: string | number | null;
        factionRankPublic: string | number | null;
        apiToken?: string;
    };
};

const mockPersonas: MockPersona[] = [
    {
        username: 'mock-operator',
        password: process.env.MOCK_OPERATOR_PASSWORD ?? 'mock-operator',
        profile: {
            id: 'mock-operator',
            handle: 'Dev Operator',
            faction: 'epsilon',
            factionRankActual: 'systems',
            factionRankPublic: 'operator',
            apiToken: 'mock-operator-token',
        },
    },
    {
        username: 'mock-police',
        password: process.env.MOCK_POLICE_PASSWORD ?? 'mock-police',
        profile: {
            id: 'mock-police',
            handle: 'OMG Liaison',
            faction: 'o_m_g',
            factionRankActual: 'investigator',
            factionRankPublic: 'officer',
            apiToken: 'mock-police-token',
        },
    },
];

const providers = [
    Credentials({
        id: 'credentials',
        name: 'Credentials',
        credentials: {
            username: { label: 'Username', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            const username = credentials?.username?.trim();
            const password = credentials?.password;

            if (!username || !password) {
                throw new Error('Missing username or password');
            }

            try {
                const response = (await loginWithCredentials(
                      username,
                      password
                )) as UpstreamLoginResp;

                if (response && response.status === 'ok') {
                    // Return exactly what you want to copy into the JWT on first sign-in
                    const u = response.user;
                    return {
                        id: u.id,
                        handle: u.handle ?? null,
                        faction: u.faction ?? null,
                        factionRankActual: u.factionRankActual ?? null,
                        factionRankPublic: u.factionRankPublic ?? null,
                        apiToken: response.token, // keep server-only ideally
                    };
                }

                // Upstream error:
                const msg =
                      (response as UpstreamLoginErr)?.message || 'Invalid credentials';
                throw new Error(msg);
            } catch (e) {
                throw new Error(e instanceof Error ? e.message : String(e));
            }
        },
    }),
    Credentials({
        id: 'police',
        name: 'Police',
        credentials: {
            username: { label: 'Username', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            const username = credentials?.username?.trim();
            const password = credentials?.password;

            if (!username || !password) {
                throw new Error('Missing username or password');
            }

            try {
                const response = (await loginWithCredentials(
                      username,
                      password
                )) as UpstreamLoginResp;

                if (response && response.status === 'ok') {
                    const u = response.user;
                    if (u.faction !== 'o_m_g') throw new Error('You don have access to this database');

                    return {
                        id: u.id,
                        handle: u.handle ?? null,
                        faction: u.faction ?? null,
                        factionRankActual: u.factionRankActual ?? null,
                        factionRankPublic: u.factionRankPublic ?? null,
                        apiToken: response.token, // keep server-only ideally
                    };
                }

                // Upstream error:
                const msg =
                      (response as UpstreamLoginErr)?.message || 'Invalid credentials';
                throw new Error(msg);
            } catch (e) {
                throw new Error(e instanceof Error ? e.message : String(e));
            }
        },
    }),
];

if (mockLoginEnabled) {
    providers.push(
        Credentials({
            id: 'mock',
            name: 'Mock Access',
            credentials: {
                username: { label: 'Persona', type: 'text' },
                password: { label: 'Passphrase', type: 'password' },
            },
            async authorize(credentials) {
                if (!mockLoginEnabled) throw new Error('Mock login disabled');

                const username = credentials?.username?.trim();
                const password = credentials?.password;

                if (!username || !password) {
                    throw new Error('Missing persona or passphrase');
                }

                const persona = mockPersonas.find(
                    (entry) => entry.username === username && entry.password === password
                );

                if (!persona) {
                    throw new Error('Mock credentials invalid');
                }

                return {
                    id: persona.profile.id,
                    handle: persona.profile.handle,
                    faction: persona.profile.faction,
                    factionRankActual: persona.profile.factionRankActual,
                    factionRankPublic: persona.profile.factionRankPublic,
                    apiToken: persona.profile.apiToken,
                };
            },
        })
    );
}

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    pages: { signIn: '/login' },
    session: { strategy: 'jwt' },
    providers,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // First sign-in: copy fields from user → token
            if (user) {
                token.id = (user as any).id as string;
                token.handle = (user as any).handle ?? null;
                token.faction = (user as any).faction ?? null;
                token.factionRankActual = (user as any).factionRankActual ?? null;
                token.factionRankPublic = (user as any).factionRankPublic ?? null;

                // Keep apiToken on the token (server-side). Only expose to client if you truly need it.
                token.apiToken = (user as any).apiToken as string | undefined;
            }

            // Optional: allow client-driven session update to tweak selected fields
            if (trigger === 'update' && session?.user) {
                const su = session.user as any;
                if (su.handle !== undefined) token.handle = su.handle;
                if (su.faction !== undefined) token.faction = su.faction;
                if (su.factionRankActual !== undefined)
                    token.factionRankActual = su.factionRankActual;
                if (su.factionRankPublic !== undefined)
                    token.factionRankPublic = su.factionRankPublic;
            }

            return token;
        },

        async session({ session, token }) {
            // ⚠️ Only expose non-sensitive data to the browser
            session.user = {
                ...session.user,
                id: (token as any).userId as string,
                handle: (token as any).handle ?? null,
                faction: (token as any).faction ?? null,
                factionRankActual: (token as any).factionRankActual ?? null,
                factionRankPublic: (token as any).factionRankPublic ?? null,
            };

            // If you truly need the apiToken client-side, expose it (not generally recommended)
            if ((token as any).apiToken) {
                (session as any).apiToken = (token as any).apiToken as string;
            }

            return session;
        },
    },
});
