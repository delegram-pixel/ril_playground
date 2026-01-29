import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sampleProducts } from '@/lib/sampleData'

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = await createClient()

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          owner:users!products_owner_id_fkey(id, name, email, avatar_url)
        `)
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          )
        }
        throw error
      }

      return NextResponse.json(transformProduct(data))
    }

    // Fallback to sample data
    const product = sampleProducts.find(p => p.id === id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = await createClient()

      const updateData = {}

      // Map camelCase to snake_case for all provided fields
      if (body.name !== undefined) updateData.name = body.name
      if (body.codename !== undefined) updateData.codename = body.codename
      if (body.tagline !== undefined) updateData.tagline = body.tagline
      if (body.category !== undefined) updateData.category = body.category
      if (body.problemStatement !== undefined) updateData.problem_statement = body.problemStatement
      if (body.targetUsers !== undefined) updateData.target_users = body.targetUsers
      if (body.localContext !== undefined) updateData.local_context = body.localContext
      if (body.solutionOverview !== undefined) updateData.solution_overview = body.solutionOverview
      if (body.keyDifferentiators !== undefined) updateData.key_differentiators = body.keyDifferentiators
      if (body.systemLogic !== undefined) updateData.system_logic = body.systemLogic
      if (body.status !== undefined) updateData.status = body.status
      if (body.startDate !== undefined) updateData.start_date = body.startDate
      if (body.heroImageUrl !== undefined) updateData.hero_image_url = body.heroImageUrl
      if (body.productUrl !== undefined) updateData.product_url = body.productUrl
      if (body.ctaLabel !== undefined) updateData.cta_label = body.ctaLabel
      if (body.usersReached !== undefined) updateData.users_reached = body.usersReached
      if (body.problemsSolved !== undefined) updateData.problems_solved = body.problemsSolved
      if (body.geographicReach !== undefined) updateData.geographic_reach = body.geographicReach
      if (body.country !== undefined) updateData.country = body.country
      if (body.region !== undefined) updateData.region = body.region
      if (body.impactScore !== undefined) updateData.impact_score = body.impactScore
      if (body.fundingStage !== undefined) updateData.funding_stage = body.fundingStage
      if (body.fundingAmount !== undefined) updateData.funding_amount = body.fundingAmount

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          owner:users!products_owner_id_fkey(id, name, email, avatar_url)
        `)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          )
        }
        throw error
      }

      // Update tech stack if provided
      if (body.techStack !== undefined) {
        // Delete existing tech stack
        await supabase
          .from('product_tech_stack')
          .delete()
          .eq('product_id', id)

        // Insert new tech stack
        if (body.techStack && body.techStack.trim()) {
          const technologies = body.techStack
            .split(',')
            .map(tech => tech.trim())
            .filter(tech => tech.length > 0)

          if (technologies.length > 0) {
            const techStackData = technologies.map(tech => ({
              product_id: id,
              technology: tech,
            }))

            await supabase
              .from('product_tech_stack')
              .insert(techStackData)
          }
        }
      }

      // Update media items if provided
      if (body.mediaItems !== undefined) {
        // Delete existing media
        await supabase
          .from('product_media')
          .delete()
          .eq('product_id', id)

        // Insert new media
        if (body.mediaItems && body.mediaItems.trim()) {
          const mediaUrls = body.mediaItems
            .split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0)

          if (mediaUrls.length > 0) {
            const mediaData = mediaUrls.map((url, index) => ({
              product_id: id,
              type: 'IMAGE',
              url: url,
              display_order: index,
            }))

            await supabase
              .from('product_media')
              .insert(mediaData)
          }
        }
      }

      // Update team members if provided
      if (body.teamMembers !== undefined) {
        // Delete existing team members
        await supabase
          .from('team_members')
          .delete()
          .eq('product_id', id)

        // Insert new team members
        if (body.teamMembers && body.teamMembers.trim()) {
          const members = body.teamMembers
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)

          if (members.length > 0) {
            for (const member of members) {
              const [name, role] = member.split('-').map(s => s.trim())
              if (name) {
                // Create or get user for team member
                let memberUserId
                const memberEmail = `${name.toLowerCase().replace(/\s+/g, '.')}@placeholder.com`

                const { data: existingMember } = await supabase
                  .from('users')
                  .select('id')
                  .eq('email', memberEmail)
                  .single()

                if (existingMember) {
                  memberUserId = existingMember.id
                } else {
                  const { data: newMember } = await supabase
                    .from('users')
                    .insert({
                      name: name,
                      email: memberEmail,
                      role: 'TEAM',
                    })
                    .select()
                    .single()

                  memberUserId = newMember?.id
                }

                if (memberUserId) {
                  await supabase
                    .from('team_members')
                    .insert({
                      product_id: id,
                      user_id: memberUserId,
                      role: role || 'Member',
                    })
                }
              }
            }
          }
        }
      }

      return NextResponse.json({
        message: 'Product updated successfully',
        product: transformProduct(data),
      })
    }

    // Fallback response for demo mode
    return NextResponse.json({
      message: 'Product updated successfully (demo mode - not persisted)',
      product: { id, ...body },
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = await createClient()

      // Soft delete by updating status to ARCHIVED
      const { data, error } = await supabase
        .from('products')
        .update({ status: 'ARCHIVED' })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          )
        }
        throw error
      }

      return NextResponse.json({
        message: 'Product archived successfully',
      })
    }

    // Fallback response for demo mode
    return NextResponse.json({
      message: 'Product archived successfully (demo mode - not persisted)',
    })
  } catch (error) {
    console.error('Error archiving product:', error)
    return NextResponse.json(
      { error: 'Failed to archive product' },
      { status: 500 }
    )
  }
}

// Transform Supabase snake_case to camelCase
function transformProduct(product) {
  return {
    id: product.id,
    name: product.name,
    codename: product.codename,
    tagline: product.tagline,
    category: product.category,
    problemStatement: product.problem_statement,
    targetUsers: product.target_users,
    localContext: product.local_context,
    solutionOverview: product.solution_overview,
    keyDifferentiators: product.key_differentiators,
    systemLogic: product.system_logic,
    status: product.status,
    startDate: product.start_date,
    lastUpdated: product.last_updated,
    createdAt: product.created_at,
    heroImageUrl: product.hero_image_url,
    productUrl: product.product_url,
    ctaLabel: product.cta_label,
    usersReached: product.users_reached,
    problemsSolved: product.problems_solved,
    geographicReach: product.geographic_reach,
    strategicNotes: product.strategic_notes,
    knownRisks: product.known_risks,
    ethicalConsiderations: product.ethical_considerations,
    integrationDependencies: product.integration_dependencies,
    fundingStatus: product.funding_status,
    owner: product.owner ? {
      id: product.owner.id,
      name: product.owner.name,
      email: product.owner.email,
      avatarUrl: product.owner.avatar_url,
    } : null,
  }
}
