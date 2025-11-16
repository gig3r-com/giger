import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({
        id: session.user?.id,
        name: session.user?.name,
        role: (session as any).user?.role ?? 'user',
    })
}
