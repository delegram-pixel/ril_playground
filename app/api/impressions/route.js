import { NextResponse } from 'next/server'
import { addImpression } from '@/lib/store'

export async function POST(request) {
  try {
    const body = await request.json()
    const { productId, type, explanation, anonymous } = body

    if (!productId || !type) {
      return NextResponse.json(
        { error: 'Product ID and type are required' },
        { status: 400 }
      )
    }

    const impression = addImpression({
      productId,
      type,
      explanation: explanation || null,
      anonymous: anonymous !== undefined ? anonymous : true,
      userSegment: 'public',
    })

    return NextResponse.json(
      { message: 'Impression submitted successfully', impression },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting impression:', error)
    return NextResponse.json(
      { error: 'Failed to submit impression' },
      { status: 500 }
    )
  }
}
