import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

    const supabase = await createClient()

    // Get total upvote count
    const { count, error } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('product_id', productId)

    if (error) throw error

    // Check if the current user has voted
    let hasVoted = false
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: existingVote } = await supabase
        .from('votes')
        .select('id')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .maybeSingle()

      hasVoted = !!existingVote
    }

    return NextResponse.json({
      productId,
      upvotes: count || 0,
      hasVoted,
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

    const supabase = await createClient()

    // Require authentication
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to vote' },
        { status: 401 }
      )
    }

    // Ensure user exists in public users table
    const { error: upsertError } = await supabase
      .from('users')
      .upsert(
        { id: user.id, email: user.email, name: user.user_metadata?.name || user.email },
        { onConflict: 'id', ignoreDuplicates: true }
      )

    if (upsertError) throw upsertError

    // Check if user already voted on this product
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existingVote) {
      // Already voted — remove the vote (toggle off)
      const { error: deleteError } = await supabase
        .from('votes')
        .delete()
        .eq('id', existingVote.id)

      if (deleteError) throw deleteError
    } else {
      // Not voted yet — add the vote
      const { error: insertError } = await supabase
        .from('votes')
        .insert({ product_id: productId, user_id: user.id })

      if (insertError) throw insertError
    }

    // Return updated count
    const { count, error: countError } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('product_id', productId)

    if (countError) throw countError

    return NextResponse.json({
      message: existingVote ? 'Vote removed' : 'Vote submitted',
      counts: { upvotes: count || 0 },
      hasVoted: !existingVote,
    })
  } catch (error) {
    console.error('Error submitting vote:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
}
