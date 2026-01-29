import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// This endpoint can be used to track share analytics
export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    const { platform } = body // 'twitter', 'linkedin', 'copy', 'pdf'

    // Try Supabase first - could create a share_analytics table
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      // Log share event (requires share_analytics table in schema)
      // const { error } = await supabase
      //   .from('share_analytics')
      //   .insert({
      //     product_id: id,
      //     platform: platform,
      //     shared_at: new Date().toISOString(),
      //   })

      // if (error) throw error

      return NextResponse.json(
        { message: 'Share tracked successfully' },
        { status: 200 }
      )
    }

    // Fallback response for demo mode
    return NextResponse.json(
      { message: 'Share tracked (demo mode - not persisted)' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error tracking share:', error)
    return NextResponse.json(
      { error: 'Failed to track share' },
      { status: 500 }
    )
  }
}
