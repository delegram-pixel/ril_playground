import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// In-memory store for votes (fallback when Supabase table doesn't exist)
let votesStore = []

async function trySupabase(operation) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, fallback: true }
  }

  try {
    const supabase = createClient()
    const result = await operation(supabase)

    if (result.error?.code === 'PGRST205' || result.error?.message?.includes('votes')) {
      return { success: false, fallback: true }
    }

    if (result.error) {
      throw result.error
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.log('Supabase unavailable, using in-memory storage:', error.message)
    return { success: false, fallback: true }
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Try Supabase first
    const result = await trySupabase(async (supabase) => {
      return await supabase
        .from('votes')
        .select('*')
        .eq('product_id', productId)
    })

    if (result.success) {
      const upvotes = (result.data || []).length

      return NextResponse.json({
        productId,
        upvotes
      })
    }

    // Fallback to in-memory
    const upvotes = votesStore.filter(v => v.productId === productId).length

    return NextResponse.json({
      productId,
      upvotes
    })
  } catch (error) {
    console.error('Error fetching votes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Try Supabase first
    const insertResult = await trySupabase(async (supabase) => {
      return await supabase
        .from('votes')
        .insert({
          product_id: productId,
          type: 'UPVOTE',
        })
        .select()
        .single()
    })

    if (insertResult.success) {
      const countResult = await trySupabase(async (supabase) => {
        return await supabase
          .from('votes')
          .select('*')
          .eq('product_id', productId)
      })

      if (countResult.success) {
        const upvotes = (countResult.data || []).length

        return NextResponse.json(
          {
            message: 'Vote submitted successfully',
            counts: { upvotes }
          },
          { status: 201 }
        )
      }
    }

    // Fallback to in-memory store
    const vote = {
      id: Date.now().toString(),
      productId,
      type: 'UPVOTE',
      createdAt: new Date().toISOString(),
    }

    votesStore.push(vote)

    const upvotes = votesStore.filter(v => v.productId === productId).length

    return NextResponse.json(
      {
        message: 'Vote submitted successfully',
        counts: { upvotes }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting vote:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
}
