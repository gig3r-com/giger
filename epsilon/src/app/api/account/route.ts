import { NextResponse } from 'next/server'
import { get, } from '@/services/api'

export async function GET() {
  const data = await get('Account/allAccounts');
  console.log('-------------------------------------------------', data)
  if (!Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid response.' }, { status: 502 })
  }
  const accounts = data.map(mapAccount);
  return NextResponse.json(accounts, { status: 200 });
}

function mapAccount(data: any) {
  console.log(data)
  return data;
}