-- Renaissance HAVEN Database Schema for Supabase
-- Run this in the Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('PUBLIC', 'SPONSOR', 'TEAM', 'LEADERSHIP');
CREATE TYPE product_status AS ENUM ('EXPLORING', 'IN_DEVELOPMENT', 'MVP', 'LIVE', 'PAUSED', 'ARCHIVED');
CREATE TYPE product_category AS ENUM ('CIVIC_TECH', 'HEALTH_TECH', 'AI_INFRASTRUCTURE', 'FINTECH', 'EDTECH', 'AGRITECH', 'CLIMATE_TECH', 'OTHER');
CREATE TYPE impression_type AS ENUM ('INSIGHTFUL', 'HIGH_POTENTIAL', 'INTERESTED_PARTNERING', 'INTERESTED_SPONSORING', 'CONCERNS', 'SPECIFIC_EXPERTISE');
CREATE TYPE media_type AS ENUM ('IMAGE', 'VIDEO', 'DIAGRAM', 'SCREENSHOT');
CREATE TYPE link_type AS ENUM ('LIVE', 'DEMO', 'GITHUB', 'DOCS', 'OTHER');
CREATE TYPE funding_stage AS ENUM ('PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C', 'BOOTSTRAPPED', 'GRANT_FUNDED', 'NOT_SEEKING');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role DEFAULT 'PUBLIC',
  avatar_url TEXT,
  organization TEXT,
  bio TEXT,
  expertise TEXT[],
  linkedin_url TEXT,
  title TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  codename TEXT,
  tagline TEXT NOT NULL,
  category product_category NOT NULL,
  problem_statement TEXT NOT NULL,
  target_users TEXT NOT NULL,
  local_context TEXT NOT NULL,
  solution_overview TEXT NOT NULL,
  key_differentiators TEXT NOT NULL,
  system_logic TEXT,
  status product_status NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Display fields
  hero_image_url TEXT,
  product_url TEXT,
  cta_label TEXT DEFAULT 'Visit Site',

  -- Metrics
  users_reached INTEGER,
  problems_solved INTEGER,
  geographic_reach TEXT,

  -- Private fields (stored as JSON for flexibility)
  strategic_notes TEXT,
  known_risks TEXT,
  ethical_considerations TEXT,
  integration_dependencies TEXT,
  funding_status TEXT,

  -- New fields for Phase 1
  country TEXT,
  region TEXT,
  impact_score INTEGER CHECK (impact_score >= 0 AND impact_score <= 100),
  funding_stage funding_stage,
  funding_amount DECIMAL(15, 2),

  -- Owner relationship
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT
);

-- Team members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- lead, member, partner
  contribution TEXT,
  joined_date TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(product_id, user_id)
);

-- Impressions table
CREATE TABLE impressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type impression_type NOT NULL,
  explanation TEXT,
  anonymous BOOLEAN DEFAULT TRUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_segment TEXT,
  geography TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Briefing requests table
CREATE TABLE briefing_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, scheduled, completed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product media table (gallery images, videos, diagrams)
CREATE TABLE product_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type media_type NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT FALSE,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product links table (multiple URLs per product)
CREATE TABLE product_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type link_type NOT NULL,
  url TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product changelog table (timeline of updates/milestones)
CREATE TABLE product_changelog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  version TEXT,
  milestone_date TIMESTAMPTZ NOT NULL,
  category TEXT, -- feature, bugfix, milestone, announcement
  is_major BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product tech stack table (technologies used)
CREATE TABLE product_tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  technology TEXT NOT NULL,
  category TEXT, -- frontend, backend, database, infrastructure, ai/ml
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(product_id, technology)
);

-- Related products table (product relationships)
CREATE TABLE related_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  relationship_type TEXT, -- complementary, similar, dependency
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(product_id, related_product_id),
  CHECK (product_id != related_product_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_owner ON products(owner_id);
CREATE INDEX idx_products_country ON products(country);
CREATE INDEX idx_products_funding_stage ON products(funding_stage);
CREATE INDEX idx_impressions_product ON impressions(product_id);
CREATE INDEX idx_impressions_type ON impressions(type);
CREATE INDEX idx_briefing_requests_status ON briefing_requests(status);
CREATE INDEX idx_product_media_product ON product_media(product_id);
CREATE INDEX idx_product_media_type ON product_media(type);
CREATE INDEX idx_product_links_product ON product_links(product_id);
CREATE INDEX idx_product_links_type ON product_links(type);
CREATE INDEX idx_product_changelog_product ON product_changelog(product_id);
CREATE INDEX idx_product_changelog_date ON product_changelog(milestone_date);
CREATE INDEX idx_product_tech_stack_product ON product_tech_stack(product_id);
CREATE INDEX idx_product_tech_stack_technology ON product_tech_stack(technology);
CREATE INDEX idx_related_products_product ON related_products(product_id);
CREATE INDEX idx_related_products_related ON related_products(related_product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply updated_at trigger to products (uses last_updated)
CREATE OR REPLACE FUNCTION update_product_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_last_updated
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_product_last_updated();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefing_requests ENABLE ROW LEVEL SECURITY;

-- Public read access for products (everyone can view products)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Authenticated users can insert products
CREATE POLICY "Authenticated users can create products" ON products
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Owners can update their products
CREATE POLICY "Users can update their own products" ON products
  FOR UPDATE USING (owner_id = auth.uid());

-- Public read access for impressions (aggregated view)
CREATE POLICY "Impressions are viewable by everyone" ON impressions
  FOR SELECT USING (true);

-- Anyone can create impressions (including anonymous)
CREATE POLICY "Anyone can create impressions" ON impressions
  FOR INSERT WITH CHECK (true);

-- Briefing requests - users can create
CREATE POLICY "Anyone can create briefing requests" ON briefing_requests
  FOR INSERT WITH CHECK (true);

-- Users can view their own briefing requests
CREATE POLICY "Users can view their own briefing requests" ON briefing_requests
  FOR SELECT USING (email = auth.email() OR user_id = auth.uid());

-- Users can read their own profile
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (id = auth.uid());

-- Public read for user names (for product owner display)
CREATE POLICY "Public can view user names" ON users
  FOR SELECT USING (true);

-- Team members - public read
CREATE POLICY "Team members are viewable by everyone" ON team_members
  FOR SELECT USING (true);

-- Enable RLS on new tables
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_changelog ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_products ENABLE ROW LEVEL SECURITY;

-- Product media policies
CREATE POLICY "Product media is viewable by everyone" ON product_media
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create product media" ON product_media
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Product owners can update their product media" ON product_media
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_media.product_id
      AND products.owner_id = auth.uid()
    )
  );

CREATE POLICY "Product owners can delete their product media" ON product_media
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_media.product_id
      AND products.owner_id = auth.uid()
    )
  );

-- Product links policies
CREATE POLICY "Product links are viewable by everyone" ON product_links
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create product links" ON product_links
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Product owners can update their product links" ON product_links
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_links.product_id
      AND products.owner_id = auth.uid()
    )
  );

CREATE POLICY "Product owners can delete their product links" ON product_links
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_links.product_id
      AND products.owner_id = auth.uid()
    )
  );

-- Product changelog policies
CREATE POLICY "Product changelog is viewable by everyone" ON product_changelog
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create changelog entries" ON product_changelog
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Product owners can update their changelog" ON product_changelog
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_changelog.product_id
      AND products.owner_id = auth.uid()
    )
  );

CREATE POLICY "Product owners can delete their changelog" ON product_changelog
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_changelog.product_id
      AND products.owner_id = auth.uid()
    )
  );

-- Product tech stack policies
CREATE POLICY "Product tech stack is viewable by everyone" ON product_tech_stack
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can add tech stack" ON product_tech_stack
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Product owners can update their tech stack" ON product_tech_stack
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_tech_stack.product_id
      AND products.owner_id = auth.uid()
    )
  );

CREATE POLICY "Product owners can delete their tech stack" ON product_tech_stack
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_tech_stack.product_id
      AND products.owner_id = auth.uid()
    )
  );

-- Related products policies
CREATE POLICY "Related products are viewable by everyone" ON related_products
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create related products" ON related_products
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Product owners can update their related products" ON related_products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = related_products.product_id
      AND products.owner_id = auth.uid()
    )
  );

CREATE POLICY "Product owners can delete their related products" ON related_products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = related_products.product_id
      AND products.owner_id = auth.uid()
    )
  );
