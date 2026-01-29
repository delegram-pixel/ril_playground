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
    country: 'Nigeria',
    region: 'West Africa',
    impactScore: 85,
    fundingStage: 'SEED',
    fundingAmount: 250000,
    ownerId: '1',
    owner: sampleUsers[0],
    team: [
      {
        name: 'Dr. Amina Okonkwo',
        role: 'Product Lead',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        name: 'Tayo Adebayo',
        role: 'Lead Engineer',
        avatarUrl: 'https://i.pravatar.cc/150?img=8',
      },
      {
        name: 'Grace Ojo',
        role: 'UX Designer',
        avatarUrl: 'https://i.pravatar.cc/150?img=9',
      },
    ],
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
    team: [
      {
        name: 'Chidi Nwosu',
        role: 'Project Manager',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      },
      {
        name: 'Lara Okafor',
        role: 'Community Lead',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
      },
    ],
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
    team: [
      {
        name: 'Zainab Ibrahim',
        role: 'AI Researcher',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
      },
      {
        name: 'Kofi Mensah',
        role: 'Frontend Dev',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        name: 'Amara Eze',
        role: 'Education Specialist',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    ],
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
    team: [
      {
        name: 'Dr. Amina Okonkwo',
        role: 'Strategy Lead',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        name: 'David Okafor',
        role: 'Operations',
        avatarUrl: 'https://i.pravatar.cc/150?img=15',
      },
    ],
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
    team: [
      {
        name: 'Chidi Nwosu',
        role: 'Finance Lead',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      },
      {
        name: 'Bisi Adeleke',
        role: 'Risk Analyst',
        avatarUrl: 'https://i.pravatar.cc/150?img=20',
      },
    ],
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
    team: [
      {
        name: 'Zainab Ibrahim',
        role: 'Research Lead',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
      },
      {
        name: 'Musa Abdullahi',
        role: 'IoT Engineer',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
      },
    ],
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

// Sample Media (Gallery)
export const sampleMedia = [
  // HealthBridge media
  {
    id: 'm1',
    productId: '1',
    type: 'SCREENSHOT',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300',
    title: 'Doctor Consultation Interface',
    description: 'Video consultation screen showing doctor and patient interaction',
    displayOrder: 1,
    isHero: true,
  },
  {
    id: 'm2',
    productId: '1',
    type: 'SCREENSHOT',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300',
    title: 'Patient Dashboard',
    description: 'Mobile app showing patient medical history and appointments',
    displayOrder: 2,
  },
  {
    id: 'm3',
    productId: '1',
    type: 'VIDEO',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'HealthBridge Platform Demo',
    description: '5-minute walkthrough of the telemedicine platform',
    displayOrder: 3,
  },
  {
    id: 'm4',
    productId: '1',
    type: 'DIAGRAM',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    title: 'System Architecture',
    description: 'Technical architecture showing offline-first design',
    displayOrder: 4,
  },
  // CivicPulse media
  {
    id: 'm5',
    productId: '2',
    type: 'SCREENSHOT',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300',
    title: 'Citizen Report Interface',
    description: 'Citizens can report issues via web or SMS',
    displayOrder: 1,
  },
  {
    id: 'm6',
    productId: '2',
    type: 'SCREENSHOT',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
    title: 'Public Dashboard',
    description: 'Transparent view of issue resolution rates',
    displayOrder: 2,
  },
  {
    id: 'm7',
    productId: '2',
    type: 'DIAGRAM',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    title: 'Data Flow',
    description: 'How citizen reports flow through the system',
    displayOrder: 3,
  },
  // EduLearn AI media
  {
    id: 'm8',
    productId: '3',
    type: 'SCREENSHOT',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
    title: 'Student Dashboard',
    description: 'Personalized learning path and progress tracking',
    displayOrder: 1,
  },
  {
    id: 'm9',
    productId: '3',
    type: 'VIDEO',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Adaptive Learning Demo',
    description: 'See how the AI adapts to student performance',
    displayOrder: 2,
  },
  {
    id: 'm10',
    productId: '3',
    type: 'SCREENSHOT',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300',
    title: 'Teacher Analytics',
    description: 'Real-time insights into class performance',
    displayOrder: 3,
  },
]

// Sample Links
export const sampleLinks = [
  // HealthBridge links
  {
    id: 'l1',
    productId: '1',
    type: 'LIVE',
    url: 'https://healthbridge.ng',
    label: 'Live Platform',
    description: 'Production telemedicine platform',
    displayOrder: 1,
  },
  {
    id: 'l2',
    productId: '1',
    type: 'DOCS',
    url: 'https://docs.healthbridge.ng',
    label: 'Documentation',
    description: 'User guides and API documentation',
    displayOrder: 2,
  },
  {
    id: 'l3',
    productId: '1',
    type: 'DEMO',
    url: 'https://demo.healthbridge.ng',
    label: 'Try Demo',
    description: 'Interactive demo environment',
    displayOrder: 3,
  },
  // CivicPulse links
  {
    id: 'l4',
    productId: '2',
    type: 'DEMO',
    url: 'https://demo.civicpulse.ng',
    label: 'Interactive Demo',
    description: 'Try the platform with sample data',
    displayOrder: 1,
  },
  {
    id: 'l5',
    productId: '2',
    type: 'GITHUB',
    url: 'https://github.com/civicpulse/platform',
    label: 'GitHub Repository',
    description: 'Open source codebase',
    displayOrder: 2,
  },
  {
    id: 'l6',
    productId: '2',
    type: 'DOCS',
    url: 'https://docs.civicpulse.ng',
    label: 'API Docs',
    description: 'Integration guide for governments',
    displayOrder: 3,
  },
  // AgriTrack links
  {
    id: 'l7',
    productId: '4',
    type: 'LIVE',
    url: 'https://agritrack.ng',
    label: 'Join Platform',
    description: 'Register as farmer or buyer',
    displayOrder: 1,
  },
  {
    id: 'l8',
    productId: '4',
    type: 'DOCS',
    url: 'https://help.agritrack.ng',
    label: 'Help Center',
    description: 'Guides and FAQs',
    displayOrder: 2,
  },
]

// Sample Changelog
export const sampleChangelog = [
  // HealthBridge changelog
  {
    id: 'c1',
    productId: '1',
    title: 'Platform Launch',
    description: 'Successfully launched telemedicine platform in Kano state with 50 doctors onboarded',
    version: '1.0.0',
    milestoneDate: new Date('2023-03-15'),
    category: 'milestone',
    isMajor: true,
  },
  {
    id: 'c2',
    productId: '1',
    title: 'USSD Support Added',
    description: 'Integrated USSD functionality for feature phones, expanding access to 2G users',
    version: '1.2.0',
    milestoneDate: new Date('2023-06-20'),
    category: 'feature',
    isMajor: true,
  },
  {
    id: 'c3',
    productId: '1',
    title: 'Offline Sync Enhancement',
    description: 'Improved offline-first architecture with better sync reliability',
    version: '1.3.5',
    milestoneDate: new Date('2023-09-10'),
    category: 'feature',
    isMajor: false,
  },
  {
    id: 'c4',
    productId: '1',
    title: 'Reached 10,000 Users',
    description: 'Milestone: Platform now serving over 10,000 patients across 3 states',
    version: null,
    milestoneDate: new Date('2023-12-01'),
    category: 'milestone',
    isMajor: true,
  },
  // CivicPulse changelog
  {
    id: 'c5',
    productId: '2',
    title: 'MVP Launch',
    description: 'Launched pilot program with Lagos State Government',
    version: '0.9.0',
    milestoneDate: new Date('2023-06-01'),
    category: 'milestone',
    isMajor: true,
  },
  {
    id: 'c6',
    productId: '2',
    title: 'WhatsApp Integration',
    description: 'Added WhatsApp as reporting channel using official API',
    version: '1.1.0',
    milestoneDate: new Date('2023-08-15'),
    category: 'feature',
    isMajor: false,
  },
  {
    id: 'c7',
    productId: '2',
    title: 'Public Dashboard Live',
    description: 'Launched public transparency dashboard showing resolution metrics',
    version: '1.2.0',
    milestoneDate: new Date('2023-11-20'),
    category: 'feature',
    isMajor: true,
  },
  // AgriTrack changelog
  {
    id: 'c8',
    productId: '4',
    title: 'Platform Launch',
    description: 'Launched marketplace connecting 500 farmers with buyers',
    version: '1.0.0',
    milestoneDate: new Date('2022-11-01'),
    category: 'milestone',
    isMajor: true,
  },
  {
    id: 'c9',
    productId: '4',
    title: 'Mobile Money Integration',
    description: 'Integrated with major mobile money providers for seamless payments',
    version: '1.3.0',
    milestoneDate: new Date('2023-04-10'),
    category: 'feature',
    isMajor: true,
  },
  {
    id: 'c10',
    productId: '4',
    title: 'Blockchain Traceability',
    description: 'Added blockchain-based supply chain tracking for premium produce',
    version: '2.0.0',
    milestoneDate: new Date('2023-10-15'),
    category: 'feature',
    isMajor: true,
  },
]

// Sample Tech Stack
export const sampleTechStack = [
  // HealthBridge tech
  { id: 't1', productId: '1', technology: 'React', category: 'frontend' },
  { id: 't2', productId: '1', technology: 'Next.js', category: 'frontend' },
  { id: 't3', productId: '1', technology: 'Node.js', category: 'backend' },
  { id: 't4', productId: '1', technology: 'PostgreSQL', category: 'database' },
  { id: 't5', productId: '1', technology: 'AWS', category: 'infrastructure' },
  { id: 't6', productId: '1', technology: 'Docker', category: 'infrastructure' },
  // CivicPulse tech
  { id: 't7', productId: '2', technology: 'Vue', category: 'frontend' },
  { id: 't8', productId: '2', technology: 'Python', category: 'backend' },
  { id: 't9', productId: '2', technology: 'Django', category: 'backend' },
  { id: 't10', productId: '2', technology: 'PostgreSQL', category: 'database' },
  { id: 't11', productId: '2', technology: 'Google Cloud', category: 'infrastructure' },
  { id: 't12', productId: '2', technology: 'TensorFlow', category: 'ai/ml' },
  // EduLearn tech
  { id: 't13', productId: '3', technology: 'React', category: 'frontend' },
  { id: 't14', productId: '3', technology: 'Python', category: 'backend' },
  { id: 't15', productId: '3', technology: 'FastAPI', category: 'backend' },
  { id: 't16', productId: '3', technology: 'MongoDB', category: 'database' },
  { id: 't17', productId: '3', technology: 'PyTorch', category: 'ai/ml' },
  { id: 't18', productId: '3', technology: 'OpenAI', category: 'ai/ml' },
  // AgriTrack tech
  { id: 't19', productId: '4', technology: 'React', category: 'frontend' },
  { id: 't20', productId: '4', technology: 'Node.js', category: 'backend' },
  { id: 't21', productId: '4', technology: 'MongoDB', category: 'database' },
  { id: 't22', productId: '4', technology: 'AWS', category: 'infrastructure' },
  { id: 't23', productId: '4', technology: 'Kubernetes', category: 'infrastructure' },
]

// Sample Related Products
export const sampleRelatedProducts = [
  // HealthBridge related
  {
    id: 'r1',
    productId: '1',
    relatedProductId: '2',
    relationshipType: 'complementary',
    description: 'CivicPulse can help track healthcare service quality issues',
  },
  {
    id: 'r2',
    productId: '1',
    relatedProductId: '3',
    relationshipType: 'complementary',
    description: 'EduLearn AI can provide health education content',
  },
  // CivicPulse related
  {
    id: 'r3',
    productId: '2',
    relatedProductId: '1',
    relationshipType: 'complementary',
    description: 'Healthcare feedback can be routed through CivicPulse',
  },
  {
    id: 'r4',
    productId: '2',
    relatedProductId: '6',
    relationshipType: 'similar',
    description: 'Both platforms focus on community engagement and monitoring',
  },
  // AgriTrack related
  {
    id: 'r5',
    productId: '4',
    relatedProductId: '5',
    relationshipType: 'complementary',
    description: 'PayFlow can provide financing to AgriTrack farmers',
  },
]

// Helper functions to get related data for a product
export function getProductMedia(productId) {
  return sampleMedia.filter((m) => m.productId === productId)
}

export function getProductLinks(productId) {
  return sampleLinks.filter((l) => l.productId === productId)
}

export function getProductChangelog(productId) {
  return sampleChangelog.filter((c) => c.productId === productId)
}

export function getProductTechStack(productId) {
  return sampleTechStack.filter((t) => t.productId === productId)
}

export function getProductRelated(productId) {
  return sampleRelatedProducts
    .filter((r) => r.productId === productId)
    .map((r) => ({
      ...r,
      relatedProduct: sampleProducts.find((p) => p.id === r.relatedProductId),
    }))
}
