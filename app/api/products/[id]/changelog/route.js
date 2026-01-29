import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { getProductChangelog } from '@/lib/sampleData'

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('product_changelog')
        .select('*')
        .eq('product_id', id)
        .order('milestone_date', { ascending: false })

      if (error) throw error

      return NextResponse.json(data)
    }

    // Fallback to sample data
    const changelog = getProductChangelog(id)
    return NextResponse.json(changelog)
  } catch (error) {
    console.error('Error fetching product changelog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product changelog' },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.milestoneDate) {
      return NextResponse.json(
        { error: 'title, description, and milestoneDate are required' },
        { status: 400 }
      )
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('product_changelog')
        .insert({
          product_id: id,
          title: body.title,
          description: body.description,
          version: body.version || null,
          milestone_date: body.milestoneDate,
          category: body.category || null,
          is_major: body.isMajor || false,
        })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json(
        { message: 'Changelog entry added successfully', entry: data },
        { status: 201 }
      )
    }

    // Fallback response for demo mode
    return NextResponse.json(
      { message: 'Changelog entry added successfully (demo mode - not persisted)', entry: body },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding changelog entry:', error)
    return NextResponse.json(
      { error: 'Failed to add changelog entry' },
      { status: 500 }
    )
  }
}
