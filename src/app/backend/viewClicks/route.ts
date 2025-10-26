import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
console.log('backend req came ')
  try {
    const data = await req.json()
    const { channelName } = data
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    console.log(`cahnnelName: ${channelName} got a viewer click!`)
    console.log(' viewer IP:', ip, 
        'UserAgent:', userAgent)

    // Here you would save to DB us  (for now, console log is fine)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
