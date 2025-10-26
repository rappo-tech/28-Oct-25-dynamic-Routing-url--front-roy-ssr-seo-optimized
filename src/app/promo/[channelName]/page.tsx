import { redirect } from 'next/navigation'
export default async function ViewerRedirect({
  params,
}: {
  params: Promise<{ channelName: string }>
}) {
  const { channelName } = await params

  // Get the REAL client info from the incoming request
  const { headers } = await import('next/headers')
  const headersList = await headers()
  const clientIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const clientUserAgent = headersList.get('user-agent') || 'unknown'

  try {
    await fetch("http://localhost:3000/backend/viewClicks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",// Pass the real client info
        "x-forwarded-for": clientIp,
        "user-agent": clientUserAgent,
      },
      body: JSON.stringify({ channelName }),
      cache: "no-store",
    })
  } catch (error) {
    console.error('❌ Fetch error:', error)
  }

  redirect('https://www.makemytrip.com')
}