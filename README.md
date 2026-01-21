# Renaissance HAVEN

A Living Registry of Systems, Signals, and Solutions

## Overview

Renaissance HAVEN is a sophisticated public-private product directory and intelligence layer for an innovation lab. It serves as a living registry that tracks products, collects structured signals, and provides intelligence for decision-making.

### Key Features

- **Product Registry System** - Comprehensive profiles for all lab products
- **Structured Impression System** - Signal-based feedback instead of comments
- **Multi-Layered Access Control** - Public, Sponsor, and Internal governance views
- **Signal Intelligence** - Real-time analytics on community interest and patterns
- **Portfolio Management** - Internal governance dashboard with health monitoring
- **Framer Motion Animations** - Smooth, professional animations throughout

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Prisma (SQLite for development, PostgreSQL recommended for production)
- **Icons**: Lucide React
- **Authentication**: NextAuth.js (ready for implementation)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation

## Design Language

### Colors

- **Primary Blue**: #1E3A8A (institutional authority)
- **Light Brown**: #D4A574 (warm, approachable)
- **Teal Accent**: #0d9488 (subtle sophistication)
- **Status Colors**: Contextual, desaturated tones

### Typography

- **Font**: Inter (clean, modern, authoritative)
- **Style**: Systems-first, calm, professional

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Create the database
npx prisma db push

# (Optional) Seed with sample data - currently using in-memory sample data
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
renaissance-haven/
├── app/                          # Next.js App Router pages
│   ├── layout.js                 # Root layout with header/footer
│   ├── page.js                   # Homepage
│   ├── about/                    # About page
│   ├── products/                 # Product directory
│   │   ├── page.js              # Product list
│   │   └── [id]/page.js         # Product profile
│   ├── sponsors/                 # Sponsor information
│   └── governance/               # Internal dashboard
├── components/                   # Reusable React components
│   ├── layout/                  # Header, Footer
│   ├── home/                    # Homepage components
│   └── products/                # Product components
├── lib/                         # Utilities and data
│   └── sampleData.js           # Sample products and users
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma schema definition
└── public/                      # Static assets

```

## Pages

### Public Pages

1. **Homepage** (`/`) - Hero, portfolio stats, featured products, engagement pathways
2. **Products** (`/products`) - Filterable directory with search
3. **Product Profile** (`/products/[id]`) - Detailed product view with impressions
4. **About** (`/about`) - Mission, vision, values, and approach
5. **Sponsors** (`/sponsors`) - Partnership information and process

### Internal Pages

6. **Governance** (`/governance`) - Portfolio management dashboard (requires authentication in production)

## Key Components

### Product Components

- **ProductCard** - Display product in grid/list view
- **ProductFilters** - Search and filter interface
- **StatusBadge** - Visual status indicator
- **CategoryBadge** - Category label
- **ImpressionForm** - Structured feedback submission
- **ImpressionSummary** - Aggregate impression display

### Layout Components

- **Header** - Main navigation with mobile menu
- **Footer** - Site information and links

### Home Components

- **PortfolioStats** - Overview metrics
- **FeaturedProducts** - Recently updated products

## Impression System

Renaissance HAVEN uses structured signals instead of traditional comments:

### Impression Types

- 🧠 **Insightful** - Clever approach
- 🔥 **High Potential** - Could be big
- 🤝 **Interested in Partnering** - Want to collaborate
- 💰 **Interested in Sponsoring** - Want to fund
- ⚠️ **Concerns/Questions** - Questions or risks
- 🎯 **Specific Expertise** - Relevant expertise

### Features

- One-click submission with optional explanation (200 chars)
- Anonymous by default
- Aggregated display (counts per type)
- Geographic and segment tagging (ready for implementation)

## Sample Data

The platform currently uses in-memory sample data from `lib/sampleData.js`:

- 6 sample products across different categories
- 3 sample users
- Impression data for each product

To use real data, implement Prisma queries to replace the sample data imports.

## Governance Features

The internal dashboard includes:

- **Product Health Monitoring** - Automatic staleness detection (90+ days)
- **Ownership Tracking** - Alerts for products without owners
- **Status Management** - Ensure accurate product states
- **Portfolio Analytics** - Healthy, stale, and critical product counts
- **Governance Rules** - Enforced policies displayed

### Health States

- **Healthy** - Updated within 90 days, has owner
- **Stale** - Not updated in 90+ days
- **Critical** - Missing owner or critical issues

## Animations

Framer Motion is used throughout for:

- Page transitions and reveals
- Card hover effects
- Staggered list animations
- Modal animations
- Scroll-triggered animations (viewport detection)

All animations respect `prefers-reduced-motion`.

## Customization

### Adding New Products

Edit `lib/sampleData.js` to add products, or implement database operations:

```javascript
{
  id: 'unique-id',
  name: 'Product Name',
  tagline: 'One-line description',
  category: 'CIVIC_TECH', // or HEALTH_TECH, AI_INFRASTRUCTURE, etc.
  status: 'LIVE', // or EXPLORING, IN_DEVELOPMENT, MVP, PAUSED, ARCHIVED
  // ... other fields
}
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: { DEFAULT: '#1E3A8A' },
  brown: { DEFAULT: '#D4A574' },
  teal: { DEFAULT: '#0d9488' },
}
```

## Future Enhancements

### Phase 1 (Completed)
- ✅ Core product registry
- ✅ Structured impression system
- ✅ Public pages
- ✅ Governance dashboard
- ✅ Framer Motion animations

### Phase 2 (Recommended)
- [ ] NextAuth.js authentication
- [ ] Role-based access control (Public, Sponsor, Team, Leadership)
- [ ] Database integration (replace sample data)
- [ ] Sponsor dashboard with extended features
- [ ] Direct messaging between sponsors and product leads
- [ ] Email notifications

### Phase 3 (Advanced)
- [ ] Claude API integration for smart summaries
- [ ] Advanced signal analytics with charts
- [ ] Export functionality (CSV, PDF, JSON)
- [ ] Public API for programmatic access
- [ ] Version history for products
- [ ] Network graph visualization

## Production Deployment

### Recommended Stack

- **Hosting**: Vercel (optimal for Next.js)
- **Database**: PostgreSQL (Supabase, Neon, or AWS RDS)
- **File Storage**: Cloudflare R2 or AWS S3
- **CDN**: Cloudflare
- **Monitoring**: Sentry + Vercel Analytics
- **Email**: SendGrid or AWS SES

### Environment Variables

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth (when implemented)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-secret"

# File Upload (when implemented)
S3_BUCKET="your-bucket"
S3_ACCESS_KEY="your-key"
S3_SECRET_KEY="your-secret"
```

### Build

```bash
npm run build
npm start
```

## Contributing

This is an internal lab project. For suggestions or improvements, contact the Innovation Lab team.

## License

© 2024 Renaissance HAVEN. All rights reserved.

---

**Built with systems-first thinking, calm design, and institutional clarity.**
# ril_playground
