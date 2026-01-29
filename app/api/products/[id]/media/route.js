import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { getProductMedia } from '@/lib/sampleData'

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('product_media')
        .select('*')
        .eq('product_id', id)
        .order('display_order', { ascending: true })

      if (error) throw error

      return NextResponse.json(data)
    }

    // Fallback to sample data
    const media = getProductMedia(id)
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching product media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product media' },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.url) {
      return NextResponse.json(
        { error: 'type and url are required' },
        { status: 400 }
      )
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('product_media')
        .insert({
          product_id: id,
          type: body.type,
          url: body.url,
          title: body.title || null,
          description: body.description || null,
          thumbnail_url: body.thumbnailUrl || null,
          display_order: body.displayOrder || 0,
          is_hero: body.isHero || false,
        })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json(
        { message: 'Media added successfully', media: data },
        { status: 201 }
      )
    }

    // Fallback response for demo mode
    return NextResponse.json(
      { message: 'Media added successfully (demo mode - not persisted)', media: body },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding product media:', error)
    return NextResponse.json(
      { error: 'Failed to add product media' },
      { status: 500 }
    )
  }
}
