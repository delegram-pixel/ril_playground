-- Fix RLS policies to work with Supabase Auth
-- Run this in your Supabase SQL Editor

-- The existing policy requires auth.uid() which is correct
-- But we need to add a policy to allow authenticated users to insert into users table

-- Add INSERT policy for users table (currently missing)
CREATE POLICY "Authenticated users can create user records" ON users
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update user records
CREATE POLICY "Authenticated users can update user records" ON users
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Optional: If you want to restrict to only TEAM or LEADERSHIP roles
-- Uncomment and use this instead of the above policies:
/*
DROP POLICY IF EXISTS "Authenticated users can create products" ON products;
CREATE POLICY "Team and leadership can create products" ON products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('TEAM', 'LEADERSHIP')
    )
  );

DROP POLICY IF EXISTS "Users can update their own products" ON products;
CREATE POLICY "Team and leadership can update products" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('TEAM', 'LEADERSHIP')
    )
  );
*/
