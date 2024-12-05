import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

export async function POST(request: Request) {
  const data = await request.json()
  console.log('Fetching link token...');
  return NextResponse.json({ received: data })
} 