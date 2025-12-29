import { NextResponse, NextRequest } from 'next/server'
import { put } from '@/services/api'

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const payload = await req.json().catch(() => null);

  if (typeof payload === undefined) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 404 });
  }

  const data = await put(`User/${params.userId}/privateRecords`, payload);
  return NextResponse.json(data, { status: 200 });
}