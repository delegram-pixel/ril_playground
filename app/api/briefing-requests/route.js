import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// Fallback in-memory store for when Supabase is not configured
let briefingRequestsStore = []

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      let query = supabase
        .from('briefing_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error } = await query

      if (error) throw error

      return NextResponse.json(data)
    }

    // Fallback to in-memory
    const filtered = status
      ? briefingRequestsStore.filter(r => r.status === status)
      : briefingRequestsStore

    return NextResponse.json(filtered)
  } catch (error) {
    console.error('Error fetching briefing requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch briefing requests' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { productId, name, email, organization, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('briefing_requests')
        .insert({
          product_id: productId || null,
          name,
          email,
          organization: organization || null,
          message,
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json(
        { message: 'Briefing request submitted successfully', briefingRequest: data },
        { status: 201 }
      )
    }

    // Fallback to in-memory store
    const briefingRequest = {
      id: Date.now().toString(),
      productId: productId || null,
      name,
      email,
      organization: organization || null,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    briefingRequestsStore.push(briefingRequest)

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
