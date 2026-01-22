import { NextResponse } from 'next/server'
import { addBriefingRequest } from '@/lib/store'

export async function POST(request) {
  try {
    const body = await request.json()
    const { productId, name, email, organization, message } = body

    if (!productId || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Product ID, name, email, and message are required' },
        { status: 400 }
      )
    }

    const briefingRequest = addBriefingRequest({
      productId,
      name,
      email,
      organization: organization || null,
      message,
    })

    return NextResponse.json(
      { message: 'Briefing request submitted successfully', briefingRequest },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting briefing request:', error)
    return NextResponse.json(
      { error: 'Failed to submit briefing request' },
      { status: 500 }
    )
  }
}
