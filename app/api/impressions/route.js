import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// Fallback in-memory store for when Supabase is not configured
let impressionsStore = []

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      let query = supabase
        .from('impressions')
        .select('*')

      if (productId) {
        query = query.eq('product_id', productId)
      }

      const { data, error } = await query

      if (error) throw error

      // Aggregate impressions by type for each product
      const aggregated = data.reduce((acc, imp) => {
        const key = `${imp.product_id}-${imp.type}`
        if (!acc[key]) {
          acc[key] = { productId: imp.product_id, type: imp.type, count: 0 }
        }
        acc[key].count++
        return acc
      }, {})

      return NextResponse.json(Object.values(aggregated))
    }

    // Fallback to in-memory
    const filtered = productId
      ? impressionsStore.filter(i => i.productId === productId)
      : impressionsStore

    return NextResponse.json(filtered)
  } catch (error) {
    console.error('Error fetching impressions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch impressions' },
      { status: 500 }
    )
  }
}

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

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('impressions')
        .insert({
          product_id: productId,
          type: type,
          explanation: explanation || null,
          anonymous: anonymous !== undefined ? anonymous : true,
          user_segment: 'public',
        })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json(
        { message: 'Impression submitted successfully', impression: data },
        { status: 201 }
      )
    }

    // Fallback to in-memory store
    const impression = {
      id: Date.now().toString(),
      productId,
      type,
      explanation: explanation || null,
      anonymous: anonymous !== undefined ? anonymous : true,
      userSegment: 'public',
      createdAt: new Date().toISOString(),
    }

    impressionsStore.push(impression)

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
