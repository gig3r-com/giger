import { NextResponse, NextRequest,  } from 'next/server'
import { patch } from '@/services/api'

export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
  const payload = await req.json().catch(() => null);

  if (typeof payload === undefined) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 404 });
  }

  try {
    const data = await patch(`User/${params.userId}/userTypes?userTypes=${payload}`);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Upstream error' }, { status: 500 });
  }
}