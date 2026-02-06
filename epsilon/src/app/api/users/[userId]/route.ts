import { NextResponse, NextRequest } from 'next/server'
import { get, post } from '@/services/api'
import { mapUser } from '../../mappers/user';

export async function PUT(req: NextRequest, params) {
  console.log('-----------------PUT---------------------')
  const payload = await req.json().catch(() => null);
  console.log('-----payload', payload);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const data = await post(`/User/${params.userId}`, payload);
    console.log('-----data', data);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.log('-----err', err);
    return NextResponse.json(
      { error: err?.message || 'Upstream error' },
      { status: 500 }
    );
  }
}