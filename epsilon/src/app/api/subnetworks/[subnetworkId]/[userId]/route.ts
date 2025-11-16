import { NextRequest, NextResponse } from 'next/server';
import { post } from '@/services/api'

export async function PUT(
  req: NextRequest,
  { params }: { params: { subnetworkId: string, userId: string } }
) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const data = await post(`/Networks/subnetwork/users?subnetworkId=${params.subnetworkId}&userId=${params.userId}`, body);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Upstream error' },
      { status: 500 }
    );
  }
}