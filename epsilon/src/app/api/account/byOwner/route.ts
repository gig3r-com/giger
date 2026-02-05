import { NextRequest, NextResponse } from 'next/server';
import { get } from '@/services/api';


export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const owner = searchParams.get('owner');


    if (!owner) {
        return NextResponse.json({ error: 'Missing "owner" query param' }, { status: 400 });
    }


    try {
        const data = await get(`Account/byOwner?owner=${ encodeURIComponent(owner) }`);


        if (!Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid response.' }, { status: 502 });
        }


        const accounts = data;
        return NextResponse.json(accounts, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err?.message ?? 'Failed to fetch accounts' }, { status: 500 });
    }
}