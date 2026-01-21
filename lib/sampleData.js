export const sampleUsers = [
  {
    id: '1',
    name: 'Dr. Amina Okonkwo',
    email: 'amina@innovationlab.ng',
    role: 'TEAM',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Chidi Nwosu',
    email: 'chidi@innovationlab.ng',
    role: 'TEAM',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Zainab Ibrahim',
    email: 'zainab@innovationlab.ng',
    role: 'TEAM',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
]

export const sampleProducts = [
  {
    id: '1',
    name: 'HealthBridge Nigeria',
    codename: 'Project Phoenix',
    tagline: 'Connecting rural communities to quality healthcare through telemedicine',
    category: 'HEALTH_TECH',
    problemStatement:
      'Over 60% of Nigerians in rural areas lack access to quality healthcare due to distance, cost, and shortage of medical professionals.',
    targetUsers: 'Rural communities, primary healthcare centers, and medical practitioners',
    localContext:
      'Nigeria has less than 1 doctor per 5,000 people in rural areas. Poor road infrastructure makes emergency care nearly impossible in many regions.',
    solutionOverview:
      'A mobile-first telemedicine platform that connects patients in rural areas with doctors via video consultation, with offline-first capabilities for low-connectivity areas.',
    keyDifferentiators:
      'Offline-first architecture, integration with USSD for feature phones, local language support (Hausa, Yoruba, Igbo), and partnership with community health workers.',
    systemLogic:
      'Progressive web app with offline sync, SMS/USSD fallback, centralized patient records, and integration with state health management information systems.',
    status: 'LIVE',
    startDate: new Date('2023-03-15'),
    lastUpdated: new Date('2024-01-10'),
    heroImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    productUrl: 'https://healthbridge.ng',
    ctaLabel: 'Visit Platform',
    usersReached: 12500,
    problemsSolved: 8400,
    geographicReach: 'Kano, Kaduna, Sokoto states',
    strategicNotes: 'Potential for expansion to other West African countries',
    knownRisks: 'Dependency on government healthcare infrastructure',
    fundingStatus: 'Seed funded - $250K from Impact Ventures',
    ownerId: '1',
    owner: sampleUsers[0],
  },
  {
    id: '2',
    name: 'CivicPulse',
    codename: 'Project Democracy',
    tagline: 'Real-time citizen feedback system for local government accountability',
    category: 'CIVIC_TECH',
    problemStatement:
      'Citizens have no structured way to report issues or provide feedback to local governments, leading to lack of accountability and poor service delivery.',
    targetUsers: 'Citizens, local government officials, community leaders',
    localContext:
      'Nigerian local governments often lack digital infrastructure. Many citizens are skeptical of government responsiveness.',
    solutionOverview:
      'A multi-channel platform (web, SMS, WhatsApp) for citizens to report issues, track resolutions, and hold officials accountable through public dashboards.',
    keyDifferentiators:
      'Public transparency dashboard, automated routing to relevant departments, citizen satisfaction tracking, and gamification for government responsiveness.',
    systemLogic:
      'Multi-channel input aggregation, AI-powered categorization, workflow management for government officials, and public analytics dashboard.',
    status: 'MVP',
    startDate: new Date('2023-06-01'),
    lastUpdated: new Date('2024-01-15'),
    heroImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    productUrl: 'https://civicpulse.ng',
    ctaLabel: 'Try Demo',
    usersReached: 4200,
    problemsSolved: 1850,
    geographicReach: 'Lagos, Abuja (pilot)',
    strategicNotes: 'In discussions with 5 additional state governments',
    knownRisks: 'Political resistance from non-performing officials',
    fundingStatus: 'Grant-funded - €100K from EU Democracy Fund',
    ownerId: '2',
    owner: sampleUsers[1],
  },
  {
    id: '3',
    name: 'EduLearn AI',
    codename: 'Project Enlightenment',
    tagline: 'AI-powered personalized learning for Nigerian students',
    category: 'EDTECH',
    problemStatement:
      'One-size-fits-all education fails to account for different learning paces and styles, leading to poor outcomes and high dropout rates.',
    targetUsers: 'Primary and secondary school students, teachers, parents',
    localContext:
      'Nigerian classrooms have student-teacher ratios of 40:1 or higher. Limited resources for individualized attention.',
    solutionOverview:
      'Adaptive learning platform that uses AI to personalize lesson delivery, identify knowledge gaps, and provide targeted practice.',
    keyDifferentiators:
      'Aligned with Nigerian curriculum, works on low-end devices, offline content packs, and teacher dashboard for progress tracking.',
    systemLogic:
      'Machine learning models for student performance prediction, adaptive question generation, and spaced repetition algorithms.',
    status: 'IN_DEVELOPMENT',
    startDate: new Date('2023-09-01'),
    lastUpdated: new Date('2024-01-18'),
    heroImageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    productUrl: null,
    ctaLabel: null,
    usersReached: null,
    problemsSolved: null,
    geographicReach: 'Beta testing in Lagos schools',
    strategicNotes: 'Exploring partnerships with state education boards',
    knownRisks: 'Data privacy concerns, teacher adoption resistance',
    fundingStatus: 'Self-funded, seeking seed round',
    ownerId: '3',
    owner: sampleUsers[2],
  },
  {
    id: '4',
    name: 'AgriTrack Pro',
    codename: 'Project Harvest',
    tagline: 'Supply chain transparency for smallholder farmers',
    category: 'AGRITECH',
    problemStatement:
      'Smallholder farmers lose up to 40% of their income to middlemen and lack visibility into market prices and demand.',
    targetUsers: 'Smallholder farmers, cooperatives, buyers, logistics providers',
    localContext:
      'Nigeria is Africa\'s largest agricultural producer but farmers remain impoverished due to broken supply chains.',
    solutionOverview:
      'End-to-end supply chain platform connecting farmers directly to buyers, with transparent pricing, logistics coordination, and quality verification.',
    keyDifferentiators:
      'USSD support for feature phones, integration with farmer cooperatives, mobile money payments, and blockchain-based traceability.',
    systemLogic:
      'Marketplace with real-time pricing, logistics optimization algorithms, and blockchain for supply chain transparency.',
    status: 'LIVE',
    startDate: new Date('2022-11-01'),
    lastUpdated: new Date('2024-01-12'),
    heroImageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
    productUrl: 'https://agritrack.ng',
    ctaLabel: 'Join Platform',
    usersReached: 8500,
    problemsSolved: 6200,
    geographicReach: 'Niger, Benue, Oyo states',
    strategicNotes: 'Expansion to Ghana and Kenya planned for Q2',
    knownRisks: 'Dependent on mobile network coverage',
    fundingStatus: 'Series A funded - $1.2M from AgTech Ventures',
    ownerId: '1',
    owner: sampleUsers[0],
  },
  {
    id: '5',
    name: 'PayFlow Nigeria',
    codename: 'Project Inclusion',
    tagline: 'Micro-lending platform for informal sector workers',
    category: 'FINTECH',
    problemStatement:
      'Informal sector workers (60% of Nigerian workforce) have no access to formal credit due to lack of collateral and credit history.',
    targetUsers: 'Informal sector workers, small business owners, market traders',
    localContext:
      'Over 60 million Nigerians work in the informal sector but are excluded from formal financial services.',
    solutionOverview:
      'Alternative credit scoring using mobile money transaction history, social connections, and business performance to provide micro-loans.',
    keyDifferentiators:
      'No collateral required, instant approval via AI scoring, flexible repayment via mobile money, and financial literacy training.',
    systemLogic:
      'Machine learning credit scoring models, integration with mobile money providers, automated collections, and risk management algorithms.',
    status: 'EXPLORING',
    startDate: new Date('2023-11-15'),
    lastUpdated: new Date('2024-01-05'),
    heroImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    productUrl: null,
    ctaLabel: null,
    usersReached: null,
    problemsSolved: null,
    geographicReach: 'Research phase',
    strategicNotes: 'Requires CBN licensing - application in progress',
    knownRisks: 'Regulatory uncertainty, default risk management',
    fundingStatus: 'Pre-seed discussions ongoing',
    ownerId: '2',
    owner: sampleUsers[1],
  },
  {
    id: '6',
    name: 'ClimateWatch NG',
    codename: 'Project Earth',
    tagline: 'Community-driven climate monitoring and early warning system',
    category: 'CLIMATE_TECH',
    problemStatement:
      'Communities vulnerable to flooding and droughts lack access to localized climate data and early warning systems.',
    targetUsers: 'Rural and coastal communities, disaster response agencies, researchers',
    localContext:
      'Nigeria faces increasing climate impacts but national weather services lack local granularity and community reach.',
    solutionOverview:
      'Network of low-cost IoT sensors deployed in communities, combined with satellite data and ML models for hyperlocal climate monitoring and alerts.',
    keyDifferentiators:
      'Community-owned sensors, SMS-based alerts, integration with local radio, and crowdsourced impact reporting.',
    systemLogic:
      'IoT sensor network, satellite data integration, ML-based prediction models, and multi-channel alert distribution.',
    status: 'PAUSED',
    startDate: new Date('2023-04-01'),
    lastUpdated: new Date('2023-10-20'),
    heroImageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=1200&q=80',
    productUrl: null,
    ctaLabel: null,
    usersReached: null,
    problemsSolved: null,
    geographicReach: 'Pilot planned for Niger Delta',
    strategicNotes: 'Paused pending climate fund approval',
    knownRisks: 'Hardware maintenance in remote areas, connectivity challenges',
    fundingStatus: 'Awaiting Green Climate Fund decision',
    ownerId: '3',
    owner: sampleUsers[2],
  },
]

export const sampleImpressions = [
  // HealthBridge impressions
  { productId: '1', type: 'HIGH_POTENTIAL', count: 47 },
  { productId: '1', type: 'INSIGHTFUL', count: 32 },
  { productId: '1', type: 'INTERESTED_SPONSORING', count: 12 },
  { productId: '1', type: 'INTERESTED_PARTNERING', count: 18 },
  { productId: '1', type: 'CONCERNS', count: 5 },
  { productId: '1', type: 'SPECIFIC_EXPERTISE', count: 9 },

  // CivicPulse impressions
  { productId: '2', type: 'HIGH_POTENTIAL', count: 38 },
  { productId: '2', type: 'INSIGHTFUL', count: 28 },
  { productId: '2', type: 'INTERESTED_PARTNERING', count: 15 },
  { productId: '2', type: 'CONCERNS', count: 11 },
  { productId: '2', type: 'SPECIFIC_EXPERTISE', count: 7 },

  // EduLearn AI impressions
  { productId: '3', type: 'HIGH_POTENTIAL', count: 56 },
  { productId: '3', type: 'INSIGHTFUL', count: 41 },
  { productId: '3', type: 'INTERESTED_SPONSORING', count: 19 },
  { productId: '3', type: 'INTERESTED_PARTNERING', count: 22 },
  { productId: '3', type: 'SPECIFIC_EXPERTISE', count: 14 },

  // AgriTrack impressions
  { productId: '4', type: 'HIGH_POTENTIAL', count: 34 },
  { productId: '4', type: 'INTERESTED_SPONSORING', count: 8 },
  { productId: '4', type: 'INTERESTED_PARTNERING', count: 12 },

  // PayFlow impressions
  { productId: '5', type: 'CONCERNS', count: 18 },
  { productId: '5', type: 'INSIGHTFUL', count: 15 },
  { productId: '5', type: 'INTERESTED_SPONSORING', count: 6 },

  // ClimateWatch impressions
  { productId: '6', type: 'HIGH_POTENTIAL', count: 29 },
  { productId: '6', type: 'INTERESTED_PARTNERING', count: 11 },
  { productId: '6', type: 'SPECIFIC_EXPERTISE', count: 8 },
]
