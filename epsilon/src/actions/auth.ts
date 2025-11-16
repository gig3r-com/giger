'use server'

import { signOut, signIn, auth } from '@/auth'
import { AuthError } from 'next-auth';

export async function signOutAction(redirectTo = '/login') {
  await signOut({ redirectTo })
}

export async function login(formData: FormData) {
  'use server';
  try {
    return await signIn('credentials', formData);
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.type ?? 'AuthError' };
    }
    throw err;
  }
}

export async function _login(username, password) {
  'use server';
  try {
    await signIn('credentials', { username, password, redirect: false });
    const session = await auth();
    return { faction: session?.user?.faction ?? null };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.type ?? 'AuthError' };
    }
    throw err;
  }
}


export async function loginPoliceman(username: string, password: string) {
  try {
    await signIn('police', {
      username,
      password,
      redirectTo: '/sector/police/database',
    });
    return { ok: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.type === 'CredentialsSignin'
          ? 'Invalid credentials'
          : 'Authentication error' };
    }
    throw err;
  }
}