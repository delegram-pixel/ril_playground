# Admin Authentication Setup Guide

## Problem Summary

The new product function wasn't sending data to Supabase because of **Row Level Security (RLS) policies** that required authentication, but the app had no authentication system in place.

### Root Cause
- Supabase RLS policy required `auth.uid() IS NOT NULL` to create products
- The app was using an anonymous client without any authentication
- Inserts were silently blocked by RLS, preventing data from being saved

## Solution Implemented

I've implemented **Supabase Email/Password Authentication** with the following components:

### 1. Authentication System
- ✅ Created `AuthContext` and `AuthProvider` for managing auth state
- ✅ Added authentication to root layout
- ✅ Created admin login page at `/admin/login`
- ✅ Updated governance page to require authentication
- ✅ Updated API routes to use server-side Supabase client with cookies

### 2. Database Changes Required
Run the SQL in `supabase/fix-rls-policies.sql` in your Supabase SQL Editor to add missing RLS policies for the users table.

## Setup Instructions

### Step 1: Update RLS Policies in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Run the SQL from `supabase/fix-rls-policies.sql`

### Step 2: Create Your First Admin User

You have two options:

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to **Authentication** > **Users** in your Supabase dashboard
2. Click **Add User** > **Create new user**
3. Enter your admin email and password
4. Click **Create user**
5. Go to **Table Editor** > **users** table
6. Find the row with your email
7. Set the `role` field to `TEAM` or `LEADERSHIP`

#### Option B: Using SQL
Run this in your Supabase SQL Editor (replace with your details):

```sql
-- Create auth user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourcompany.com',  -- Replace with your email
  crypt('your_password_here', gen_salt('bf')),  -- Replace with your password
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  ''
);

-- Create user record in public.users table
INSERT INTO public.users (id, email, name, role)
SELECT
  id,
  email,
  'Admin User',  -- Replace with your name
  'LEADERSHIP'
FROM auth.users
WHERE email = 'admin@yourcompany.com';  -- Replace with your email
```

### Step 3: Test the Authentication

1. Start your development server: `npm run dev`
2. Go to `/admin/login`
3. Sign in with your admin credentials
4. You should be redirected to `/governance`
5. Try creating a new product - it should now save to Supabase!

### Step 4: Verify Data is Saving

1. After creating a product, check your Supabase **Table Editor** > **products** table
2. You should see the new product record
3. The `owner_id` should match your user ID from the `users` table

## What Changed

### Files Modified
- [app/layout.js](app/layout.js) - Added AuthProvider
- [app/governance/page.js](app/governance/page.js) - Added auth check and logout button
- [app/api/products/route.js](app/api/products/route.js) - Updated to use server-side client
- [app/api/products/[id]/route.js](app/api/products/[id]/route.js) - Updated to use server-side client

### Files Created
- [contexts/AuthContext.js](contexts/AuthContext.js) - Authentication context and hooks
- [app/admin/login/page.js](app/admin/login/page.js) - Admin login page
- [supabase/fix-rls-policies.sql](supabase/fix-rls-policies.sql) - RLS policy fixes

## Security Notes

- The governance dashboard is now protected - only authenticated users can access it
- Product creation requires authentication (RLS enforces this at the database level)
- Passwords are securely hashed by Supabase Auth
- Sessions are managed via HTTP-only cookies

## Next Steps (Optional)

1. **Add role-based permissions**: Uncomment the role-checking policies in `fix-rls-policies.sql` to restrict access to TEAM/LEADERSHIP only
2. **Add password reset**: Implement forgot password functionality using Supabase Auth
3. **Invite system**: Create an invite flow for adding new admin users
4. **Audit logging**: Track who creates/updates products
