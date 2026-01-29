import { createClient as createBrowserClient } from '@supabase/supabase-js'

// Simple client for API routes
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

// Re-export for convenience
export { createClient as createBrowserClient } from './client'
export { createClient as createServerClient } from './server'
