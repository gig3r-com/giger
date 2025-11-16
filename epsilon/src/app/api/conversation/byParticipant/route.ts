// app/api/conversation/byParticipant/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { get } from '@/services/api'
import { mapConversation } from '../../mappers/conversation'


export const dynamic = 'force-dynamic'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const participant = searchParams.get('participant')


  if (!participant) {
    return NextResponse.json({ error: 'Missing "participant" query param' }, { status: 400 })
  }


  try {
    const data = await get(`Conversation/byParticipant?participant=${encodeURIComponent(participant)}`)


    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid response.' }, { status: 502 })
    }


    const conversations = data.map(mapConversation)
    return NextResponse.json({ conversations }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to fetch conversations' }, { status: 500 })
  }
}