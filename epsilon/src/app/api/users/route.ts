import { NextResponse, NextRequest } from 'next/server'
import { get, post } from '@/services/api'
import { mapUser } from '../mappers/user';

export async function GET() {
  const data = await get('User/private/all');
  if (!Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid response.' }, { status: 502 })
  }
  const users = data.map(mapUser);
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    // Forward to your upstream (e.g., /Profile)
    const data = await post('/User', payload);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Upstream error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    console.log('------payload', payload)
    // Forward to your upstream (e.g., /Profile)
    const data = await post('/User', payload);
    console.log('------data', data)
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.log('------err', err)
    return NextResponse.json(
      { error: err?.message || 'Upstream error' },
      { status: 500 }
    );
  }
}