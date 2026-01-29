import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { sampleProducts } from '@/lib/sampleData'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const country = searchParams.get('country')
    const fundingStage = searchParams.get('fundingStage')
    const techStack = searchParams.get('techStack') // comma-separated
    const minImpactScore = searchParams.get('minImpactScore')

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      let query = supabase
        .from('products')
        .select(`
          *,
          owner:users!products_owner_id_fkey(id, name, email, avatar_url)
        `)
        .order('last_updated', { ascending: false })

      if (category && category !== 'ALL') {
        query = query.eq('category', category)
      }

      if (status && status !== 'ALL') {
        query = query.eq('status', status)
      }

      if (country) {
        query = query.eq('country', country)
      }

      if (fundingStage) {
        query = query.eq('funding_stage', fundingStage)
      }

      if (minImpactScore) {
        query = query.gte('impact_score', parseInt(minImpactScore))
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`)
      }

      const { data, error } = await query

      if (error) throw error

      let products = data.map(transformProduct)

      // Tech stack filtering (requires join with product_tech_stack)
      if (techStack) {
        const techArray = techStack.split(',')
        const filteredProducts = []

        for (const product of products) {
          const { data: productTech } = await supabase
            .from('product_tech_stack')
            .select('technology')
            .eq('product_id', product.id)

          const productTechs = productTech?.map(t => t.technology) || []
          const hasAllTechs = techArray.every(tech =>
            productTechs.some(pt => pt.toLowerCase().includes(tech.toLowerCase()))
          )

          if (hasAllTechs) {
            filteredProducts.push(product)
          }
        }
        products = filteredProducts
      }

      return NextResponse.json(products)
    }

    // Fallback to sample data
    let products = [...sampleProducts]

    if (category && category !== 'ALL') {
      products = products.filter(p => p.category === category)
    }

    if (status && status !== 'ALL') {
      products = products.filter(p => p.status === status)
    }

    if (country) {
      products = products.filter(p => p.country === country)
    }

    if (fundingStage) {
      products = products.filter(p => p.fundingStage === fundingStage)
    }

    if (minImpactScore) {
      products = products.filter(p => p.impactScore >= parseInt(minImpactScore))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.tagline.toLowerCase().includes(searchLower)
      )
    }

    // Tech stack filtering (sample data)
    if (techStack) {
      const techArray = techStack.split(',')
      // Note: This would require adding tech stack data to sample products
      // For now, just return all products
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const required = ['name', 'tagline', 'category', 'status', 'problemStatement', 'targetUsers', 'localContext', 'solutionOverview', 'keyDifferentiators']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()

      // First, create or get the owner
      let ownerId = body.ownerId

      if (!ownerId && body.owner) {
        // Check if user exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('email', body.owner.email)
          .single()

        if (existingUser) {
          ownerId = existingUser.id
        } else {
          // Create new user
          const { data: newUser, error: userError } = await supabase
            .from('users')
            .insert({
              name: body.owner.name,
              email: body.owner.email,
              role: 'TEAM',
            })
            .select()
            .single()

          if (userError) throw userError
          ownerId = newUser.id
        }
      }

      const { data, error } = await supabase
        .from('products')
        .insert({
          name: body.name,
          codename: body.codename || null,
          tagline: body.tagline,
          category: body.category,
          problem_statement: body.problemStatement,
          target_users: body.targetUsers,
          local_context: body.localContext,
          solution_overview: body.solutionOverview,
          key_differentiators: body.keyDifferentiators,
          system_logic: body.systemLogic || null,
          status: body.status,
          start_date: body.startDate || new Date().toISOString(),
          hero_image_url: body.heroImageUrl || null,
          product_url: body.productUrl || null,
          cta_label: body.ctaLabel || 'Visit Site',
          owner_id: ownerId,
        })
        .select(`
          *,
          owner:users!products_owner_id_fkey(id, name, email, avatar_url)
        `)
        .single()

      if (error) throw error

      return NextResponse.json(
        { message: 'Product created successfully', product: transformProduct(data) },
        { status: 201 }
      )
    }

    // Fallback response for demo mode
    return NextResponse.json(
      { message: 'Product created successfully (demo mode - not persisted)', product: body },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
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
    country: product.country,
    region: product.region,
    impactScore: product.impact_score,
    fundingStage: product.funding_stage,
    fundingAmount: product.funding_amount,
    owner: product.owner ? {
      id: product.owner.id,
      name: product.owner.name,
      email: product.owner.email,
      avatarUrl: product.owner.avatar_url,
    } : null,
  }
}
