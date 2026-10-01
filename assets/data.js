// All content sourced from Nitesh's resume + his previous portfolio
// (niteshrawal.is-a.dev). Edit freely — nothing else in the site needs to
// change when this data changes.
const PROFILE = {
  name: 'Nitesh Rawal',
  role: 'Software Engineer II',
  tag: 'Backend systems, microservices & the DevOps pipelines that ship them',
  location: 'Hyderabad, Telangana, India',
  email: 'nitesh.rawal401@gmail.com',
  photo: 'assets/hero.jpg',
  blurb: "I design and operate backend systems for banking and enterprise platforms — Spring Boot services, event-driven pipelines, and the CI/CD, containers and observability stack that keep them healthy in production. I'm also hands-on with AI-assisted development: running Claude Code POCs, writing project-specific skill definitions, and using it to move faster from design to production without handing off architecture or code-quality decisions.",
  links: {
    LinkedIn: 'https://www.linkedin.com/in/nitesh-rawal-50923b199/',
    GitHub: 'https://github.com/nitesh401',
    Instagram: 'https://instagram.com/nitesh.rawal',
    HackerRank: 'https://www.hackerrank.com/niteshrawal12',
    'The Blueprint Voyager': 'https://nitesh401.github.io/TheBlueprintVoyager/'
  },
  stats: [
    { n: 5, suffix: '+', l: 'years in production backend systems' },
    { n: 120, suffix: '+', l: 'microservices shipped at scale (CGI)' },
    { n: 100, suffix: 'K+', l: 'events/day on a system I architected' },
    { n: 78, suffix: '%', l: 'fewer auth bugs after a Keycloak rollout' }
  ]
};

const CHAPTERS = [
  { yr: '2025', when: 'Apr 2025 — Present', role: 'Software Engineer II', org: 'Deloitte USI',
    pts: [
      'Architected the Event Logging Service: 100K+ events/day from 8 microservices, with schema versioning and TTL purging for 35% lower storage cost.',
      'Built Entitlement-Service resilience — retry, backoff, circuit breaker — taking inter-service failures from 2.3% to 0.4% and P99 latency down 180ms.',
      'Owns Entitlement Ops end-to-end, including the REST APIs that capture dead-letter-queue notification failures for monitoring and recovery.',
      'Mentors 2 junior developers, guides a 4-person team with ADRs, and runs Claude Code POCs and project-specific skill definitions for AI-assisted delivery.'
    ],
    stack: ['Java 21', 'Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'] },
  { yr: '2023', when: 'Jul 2023 — Mar 2025', role: 'Software Engineer', org: 'CGI',
    pts: [
      'Credit Studio — 120+ microservices for US/UK banks: cut P99 latency by 43% (280ms) and raised throughput from 2K to 5K req/sec.',
      'Built the Camunda BPM layer for credit approvals so business teams can monitor and step into workflows via Camunda Cockpit.',
      'Kafka partitioning cut message latency from 350ms to 80ms; Keycloak + OAuth2 cut authentication bugs by 78%.',
      'Found a Kafka consumer memory leak with Java Flight Recorder (heap 3GB → 1.2GB, GC pauses 200ms → 20ms); Jenkins pipeline time fell from 18 to 6 minutes.'
    ],
    stack: ['Java 17', 'Spring Cloud', 'Kafka', 'Camunda BPM', 'Keycloak', 'MongoDB', 'Jenkins', 'Kubernetes'] },
  { yr: '2021', when: 'Sep 2021 — Jul 2023', role: 'Associate Software Engineer', org: 'Techsophy',
    pts: [
      'Built 15+ REST services for Tasheer, a multi-tenant Saudi visa and travel platform, with cursor-based pagination (60% less memory than offset).',
      'Raised test coverage from 40% to 80% with JUnit, Mockito and Testcontainers — production bugs fell 35%.',
      'Cut passport batch validation from 250ms to 60ms using reactive streams across 120+ nationality rules.',
      'Fixed 23 high-priority SonarQube vulnerabilities, taking technical debt from 60 days to 5, and sped a reporting query from 8s to 1.2s over 1M+ records.'
    ],
    stack: ['Java 13', 'Spring Boot', 'MySQL', 'Apache Kafka', 'Jenkins', 'SonarQube'] },
  { yr: '2021', when: 'May 2021 — Aug 2021', role: 'Java Full-Stack Intern', org: 'Techsophy',
    pts: [
      'Built DemoBank: Spring Boot backend, React frontend, JWT authentication with role-based access control.',
      'Delivered 8 REST endpoints with validation and transaction retry logic at 75% test coverage.',
      'Designed the relational schema and used Spring Data JPA transactions with ACID compliance.',
      'Converted to a full-time offer at the end of the internship.'
    ],
    stack: ['Java 8', 'Spring Boot', 'Spring Security', 'React.js', 'MySQL'] },
  { yr: '2019', when: 'Jul 2019 — Oct 2019', role: 'Java Trainee — Summer Internship', org: 'SSI Digital',
    pts: [
      'Hands-on training in core Java application development.',
      'Worked with JDBC, JSP and Servlets to build and persist simple multi-page applications.',
      'First exposure to multithreading fundamentals alongside HTML/CSS front ends.'
    ],
    stack: ['Java 8', 'JDBC', 'JSP', 'Servlet', 'Multithreading'] }
];

const PROJECTS = [
  { id: 'ems', name: 'Entitlement Management', sub: 'Event-sourced access-control platform', when: 'Apr 2025 — Present', role: 'Software Engineer II, Deloitte USI',
    what: 'Microservices platform for role-based access control, licensing lifecycle and fulfillment workflows, built on event sourcing for audit compliance.',
    hits: ['Designed to support millions of entitlements.', 'Event Logging Service: 100K+ events/day, schema versioning, eventual consistency, TTL retention.', '35% storage-cost reduction through TTL-based purging.'],
    stack: ['Java 21', 'Spring Boot', 'Spring WebFlux', 'PostgreSQL', 'Kafka', 'AWS SQS', 'Docker', 'Kubernetes'] },
  { id: 'cs', name: 'Credit Studio', sub: 'Banking & insurance credit management', when: 'Jul 2023 — Mar 2025', role: 'Software Engineer, CGI',
    what: 'Enterprise credit-management suite — 120+ microservices serving major US and UK banking institutions.',
    hits: ['Built for 5K req/sec at P99 < 500ms.', 'Camunda BPM orchestration with business-level process visibility.', 'Central Keycloak rollout cut authentication-related bugs by 78%.'],
    stack: ['Java 17', 'Spring Cloud', 'Apache Kafka', 'Camunda BPM', 'Keycloak', 'Docker', 'Kubernetes'] },
  { id: 'tasheer', name: 'Tasheer', sub: 'Saudi visa & travel platform', when: 'Sep 2021 — Jul 2023', role: 'Associate Software Engineer, Techsophy',
    what: 'Multi-tenant microservices platform with separate portals for customers, agents, centers and administrative staff.',
    hits: ['Designed for 500+ concurrent users with sub-second responses.', '15+ REST APIs with cursor pagination, batch processing and event-driven notifications.', 'Form validation across 120+ nationality-specific rules.'],
    stack: ['Java', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Apache Kafka'] }
];

const PERSONAL_PROJECTS = [
  { name: 'Open-Meteo', sub: 'Weather lookup service', d: 'Spring Boot sample that resolves a location to coordinates, fetches current weather from Open-Meteo, enriches the payload, and stores it in an in-memory H2 database behind a simple Bootstrap UI.', stack: ['Spring Boot', 'Open-Meteo', 'H2 Database', 'Bootstrap'], url: 'https://github.com/nitesh401/Open-Meteo' },
  { name: 'Healthcare Rules Management System', sub: 'Rules engine', d: 'Uploads rules from an Excel file and exposes operations to retrieve and manage them — built to explore rules-engine design outside of work.', stack: ['Java', 'Spring Boot', 'H2 DB', 'JUnit', 'Maven'], url: 'https://github.com/nitesh401/RMS' },
  { name: 'Isolation AI Game Agent', sub: 'Game-playing AI', d: 'A deterministic two-player game of perfect information, solved with adversarial search — Minimax with alpha-beta pruning and iterative deepening.', stack: ['Java', 'Java AWT', 'Minimax', 'Alpha-Beta Pruning', 'Iterative Deepening'], url: 'https://github.com/nitesh401/IsolationAIgameAgent' }
];

const EDUCATION = [
  { org: 'University of Hyderabad', deg: 'Master of Computer Applications', when: '2018 — 2021' },
  { org: 'Shri RGP Gujarati Professional Institute, Indore', deg: 'Bachelor of Computer Applications', when: '2014 — 2017' },
  { org: 'The New Green Field Public Academy, Indore', deg: '12th, C.B.S.E. (Physics, Chemistry, Maths)', when: '2013 — 2014' },
  { org: 'The New Green Field Public Academy, Indore', deg: '10th, C.B.S.E.', when: '2011 — 2012' }
];

// Grouped for a "platform" narrative — backend language/framework depth,
// data & messaging, the DevOps/reliability layer, and AI-assisted delivery.
const STACK = {
  'Language & Framework': [
    ['Java', 'All roles · Streams, concurrency, design patterns'],
    ['Spring Boot', 'Every role since 2021 · REST & microservices'],
    ['Spring WebFlux / WebClient', 'CGI, Deloitte · Reactive, non-blocking I/O'],
    ['Spring Security / Spring MVC', 'DemoBank, platform APIs · Auth & web layer'],
    ['Spring Cloud', 'CGI · Service discovery & API gateway']
  ],
  'Data & Messaging': [
    ['PostgreSQL / Oracle DB', 'Deloitte, CGI · TTL purging, query optimisation'],
    ['MySQL / MongoDB', 'Techsophy, CGI · Relational + document stores'],
    ['Apache Kafka', 'CGI, Techsophy · Partitioning, consumer-leak fixes'],
    ['GraphQL / REST', 'Deloitte · API design across services'],
    ['Camunda BPM', 'CGI · Credit-approval orchestration']
  ],
  'Platform & DevOps': [
    ['Docker & Kubernetes (Helm)', 'CGI, Deloitte · Containerised every service'],
    ['Jenkins CI/CD', 'CGI, Techsophy · Pipeline time cut from 18 to 6 minutes'],
    ['Keycloak / OAuth2', 'CGI · 78% fewer auth bugs across 120+ services'],
    ['Microsoft Azure', 'Deloitte · Cloud deployment'],
    ['SonarQube', 'Techsophy · Debt from 60 days to 5']
  ],
  'AI-Assisted Delivery': [
    ['Claude Code', 'Deloitte · POCs, agentic workflows, project-specific .skill definitions'],
    ['GitHub Copilot', 'Faster implementation, exploration and refactoring'],
    ['Java Flight Recorder', 'CGI · Heap 3GB → 1.2GB, GC pauses 200ms → 20ms'],
    ['Testcontainers, JUnit, Mockito', 'All roles · Coverage up to 85%, zero-SonarQube-issue policy']
  ]
};

// Skill meters — self-assessed proficiency, shown as gauges.
const SKILLS = [
  ['Java', 90], ['Spring Boot', 90], ['Microservices', 85], ['REST API', 85],
  ['Spring Security', 80], ['Spring MVC', 80], ['MySQL', 90], ['PostgreSQL', 80],
  ['Apache Kafka', 75], ['Oracle DB', 75], ['Docker & Kubernetes', 65],
  ['Spring WebFlux', 70], ['GraphQL', 50]
];

const HOBBIES = [
  ['Gym', 'Fitness & strength training'],
  ['Cricket', 'Playing & following the game'],
  ['Travelling', 'Exploring new places'],
  ['Music', 'Listening & discovering'],
  ['Web Series', 'Movies & shows'],
  ['Gaming', 'Casual gaming & fun']
];

const PROOF = [
  { k: 'Award', org: 'Deloitte USI', name: 'Spot Award', d: 'End-to-end ownership of the Entitlement microservice and Contact workflow within the modernization program.' },
  { k: 'Award', org: 'CGI', name: 'Bronze Award', d: 'Exceptional results and measurable client impact through high-quality engineering and timely delivery.' },
  { k: 'Certification', org: 'Udemy', name: 'Master Microservices with Spring Boot & Spring Cloud', d: '' },
  { k: 'Certification', org: 'Anthropic', name: 'Claude Code in Action', d: '' },
  { k: 'Certification', org: 'Anthropic', name: 'Claude 101', d: '' },
  { k: 'Certification', org: 'Anthropic', name: 'AI Fluency Framework and Foundations', d: '' }
];
