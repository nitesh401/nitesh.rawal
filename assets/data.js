// Content is taken from the previous portfolio (niteshrawal.is-a.dev) and from details
// Nitesh has stated directly. Nothing here is estimated or invented.
// Edit freely: the layout updates itself from this file.
const PROFILE = {
  name: 'Nitesh Rawal',
  role: 'Software Engineer II',
  title: 'Java Backend Developer',
  tag: 'Backend systems, microservices & the DevOps pipelines that ship them',
  location: 'Hyderabad, Telangana, India',
  employer: 'Deloitte USI',
  email: 'nitesh.rawal401@gmail.com',
  photo: 'assets/hero.jpg',
  links: {
    LinkedIn: 'https://www.linkedin.com/in/nitesh-rawal-50923b199/',
    GitHub: 'https://github.com/nitesh401',
    HackerRank: 'https://www.hackerrank.com/niteshrawal12',
    'The Blueprint Voyager': 'https://nitesh401.github.io/TheBlueprintVoyager/'
  },
  about: [
    "Hello, I'm Nitesh Rawal, a Java Backend Developer with 5 years of experience. I'm currently a Software Engineer II at Deloitte USI, working with Java, Spring Boot, Spring WebFlux, Spring AOP, Spring Security, Kafka, Keycloak (IAM), microservices, REST and GraphQL.",
    "I design workflows with BPMN (Camunda) and work with Oracle DB, PostgreSQL, MySQL and MongoDB. For delivery I use Jenkins CI/CD, Docker, Kubernetes (Helm) and Microsoft Azure.",
    "At Deloitte USI I'm focused on the Entitlement & Licensing Management platform. I work with cross-functional teams across the globe, follow agile practices on scrum Jira boards, and take part in peer code reviews and IP reviews with architects.",
    "I'm a proponent of Test-Driven Development. Unit tests are written in JUnit and Mockito with code coverage of up to 85%, and we keep a zero-Sonar-issue policy for delivery."
  ]
};

const CHAPTERS = [
  { yr: '2025', when: 'Apr 2025 — Present', role: 'Software Engineer II', org: 'Deloitte USI',
    pts: [
      'Java backend developer on the Entitlement & Licensing Management platform, built from scratch to replace a legacy JAX-RS system.',
      'Studied the legacy system, then wrote the design documents and flow diagrams and a technical design that splits the platform into 5 microservices plus one orchestration service.',
      'Owns the Entitlement service end to end (entitlement and contact REST APIs, calls to external systems) and the Ops service that stores failed notification messages for follow-up.',
      'Event logging service handling 100K+ events/day, with schema versioning and TTL-based retention.',
      'Ran a Claude Code proof of concept that gave a 70% efficiency gain, and wrote custom skills that enforce Google code style and JUnit naming conventions.'
    ],
    stack: ['Java 21', 'Spring Boot', 'Spring WebFlux', 'Microservices', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'] },
  { yr: '2023', when: 'Jul 2023 — Mar 2025', role: 'Software Engineer', org: 'CGI',
    pts: [
      'Java backend developer on Credit Studio, a credit management product for banking and insurance, used by US and UK institutions.',
      'Designed and built Camunda BPMN workflows with Spring Boot microservices, including Camunda delegates.',
      'Built GraphQL and REST APIs, and used WebClient and Kafka for communication between microservices.'
    ],
    stack: ['Java 17', 'Spring Boot', 'Microservices', 'Confluent Kafka', 'PostgreSQL', 'MongoDB', 'Camunda', 'BPMN', 'Keycloak', 'Docker', 'Kubernetes'] },
  { yr: '2021', when: 'Sep 2021 — Jul 2023', role: 'Associate Software Engineer', org: 'Techsophy',
    pts: [
      'Java backend engineer on Tasheer, a Saudi visa processing and travel platform, across the customer, agent and center portals.',
      'Built and extended REST APIs in Spring Boot, including passport validation, appointment booking and secure file upload.',
      'Resolved Sonar and vulnerability issues and wrote JUnit tests to raise coverage.'
    ],
    stack: ['Java 13', 'Spring Boot', 'Microservices', 'Apache Kafka', 'MySQL', 'Jenkins (CI/CD)'] },
  { yr: '2021', when: 'May 2021 — Aug 2021', role: 'Java Full Stack Intern', org: 'Techsophy',
    pts: [
      'Trained in Spring Boot and React.js, then built a full-stack project from scratch and presented a demo.',
      'Joined full time as an Associate Software Engineer after the internship.'
    ],
    stack: ['Java 8', 'Spring Boot', 'Spring Security', 'MySQL', 'JavaScript', 'React.js'] },
  { yr: '2019', when: 'Jul 2019 — Oct 2019', role: 'Java Trainee — Summer Internship', org: 'SSI Digital',
    pts: [ 'Hands-on training in Java application development.' ],
    stack: ['Java 8', 'JDBC', 'JSP', 'Servlet', 'Multithreading', 'HTML', 'CSS'] }
];

const PROJECTS = [
  { name: 'Entitlement Management System', sub: 'Deloitte USI', when: 'Apr 2025 — Present',
    what: 'Scalable microservices platform for role-based access control, licensing lifecycle management and fulfillment workflows. Built to support millions of entitlements, with event sourcing for audit compliance. Handles 100K+ events/day through an event logging service with schema versioning and TTL-based retention.',
    stack: ['Java', 'Spring Boot', 'Microservices', 'AWS SQS', 'Oracle DB'],
    note: 'Enterprise project. The code is proprietary to Deloitte USI.' },
  { name: 'Credit Studio', sub: 'CGI', when: 'Jul 2023 — Mar 2025',
    what: 'Enterprise credit management suite of 120+ microservices for major US and UK banking and insurance institutions, architected to handle 5K requests/sec at sub-500ms P99 latency. Camunda BPM orchestrates multi-step credit approval workflows with business-level process visibility.',
    stack: ['Java', 'Spring Boot', 'Microservices', 'Apache Kafka', 'Camunda BPM'],
    note: "Enterprise project. The code is proprietary to CGI's banking client." },
  { name: 'Tasheer — Saudi Visa & Travel Solution', sub: 'Techsophy', when: 'Sep 2021 — Jul 2023',
    what: 'Multi-tenant microservices platform for Tasheer, a Saudi visa processing and travel solution, with separate portals for customers, agents, centers and admin staff. Supports 500+ concurrent users with sub-second response times. Implemented cursor-based pagination, batch processing and validation logic for 120+ nationality-specific rules.',
    stack: ['Java', 'Spring Boot', 'Microservices', 'Apache Kafka', 'MySQL / PostgreSQL'],
    note: "Enterprise project. The code is proprietary to Techsophy's visa client." }
];

const PERSONAL_PROJECTS = [
  { name: 'AutoRemediate AI — Sonar & Snyk Findings Agent', sub: 'Personal project',
    d: 'An AI agent that analyzes and fixes findings reported by SonarQube and Snyk, automating parts of code-quality and security remediation.',
    stack: [],
    url: 'https://github.com/nitesh401/AutoRemediate-AI',
    articleUrl: 'https://dev.to/nitesh401/i-built-an-ai-agent-that-fixes-sonar-and-snyk-findings-3k41' },
  { name: 'Production Bug Minimal Reproduction Finder', sub: 'Personal project',
    d: 'Given a failing production request, it automatically finds the smallest subset of input and state that still reproduces the bug. It uses delta debugging (ddmin) with dependency-aware reduction (Tarjan SCC), caching and pruning, distributed over Kafka across five Spring Boot microservices around a Spring-free algorithm core.',
    stack: ['Java', 'Spring Boot', 'Apache Kafka', 'MySQL', 'Redis', 'Docker', 'Maven'],
    url: 'https://github.com/nitesh401/Production-Bug-Minimal-Reproduction-Finder' },
  { name: 'DispatchIQ — Real-time Delivery Dispatch Platform', sub: 'Personal project',
    d: 'Assigns every incoming delivery order to the right courier in real time using traffic-aware routing, without double-booking a courier, and keeps working when a dependency fails. Four Spring Boot services (courier, routing, order, API gateway) with an Angular UI, built on hand-written QuadTree, A*/Dijkstra, the Hungarian algorithm, a circuit breaker and a token-bucket rate limiter.',
    stack: ['Java 21', 'Spring Boot', 'Spring Cloud Gateway', 'Angular 17', 'H2 + JPA', 'Maven'],
    url: 'https://github.com/nitesh401/DispatchIQ-real-time-delivery-dispatch-platform' },
  { name: 'Open-Meteo', sub: 'learningdev',
    d: 'A Spring Boot sample that resolves a location to coordinates, fetches current weather from Open-Meteo, enriches the payload and stores the result in an in-memory H2 database, with a simple Bootstrap UI.',
    stack: ['Java', 'Spring Boot', 'Open-Meteo', 'H2 Database', 'Bootstrap'], url: 'https://github.com/nitesh401/Open-Meteo' },
  { name: 'NutriPlan — Personalized Diet & Nutrition App', sub: 'Personal project',
    d: 'A mobile app that walks the user through five steps (basic info, body measurements, activity, health and diet, and mandatory rules) and then generates a plan with daily calories, macros, water intake, safety guardrails and meals. The nutrition engine uses the Mifflin-St Jeor BMR formula and caps deficits and minimum calories for safety.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'NativeWind', 'Zustand', 'React Hook Form', 'Zod'],
    url: 'https://github.com/nitesh401/nutriplan' },
  { name: 'Isolation AI Game Agent', sub: 'Personal project',
    d: 'Isolation is a deterministic two-player game of perfect information: players alternate moving a piece, every visited cell becomes blocked, and the first player with no legal move loses. This agent plays it using adversarial search.',
    stack: ['Java', 'Java AWT & Spring', 'Alpha-Beta Pruning', 'Iterative Deepening Search', 'MiniMax'], url: 'https://github.com/nitesh401/IsolationAIgameAgent' },
  { name: 'Real-time Event Detection in Twitter', sub: 'Personal project',
    d: 'Detects real-world events from Twitter data using an entity-based approach. Tweets are cleaned, entities are extracted and filtered, similarity between entities is computed and filtered, an entity graph is built, and the graph is clustered and chained into events.',
    stack: ['Python', 'Entity extraction', 'Entity graph', 'Clustering', 'Twitter data'],
    url: 'https://github.com/nitesh401/RealTimeEventDetectionInTwitter' }
];

const EDUCATION = [
  { org: 'University of Hyderabad', deg: 'Master of Computer Applications', when: '2018 — 2021' },
  { org: 'Shri RGP Gujarati Professional Institute, Indore', deg: 'Bachelor of Computer Applications', when: '2014 — 2017' },
  { org: 'The New Green Field Public Academy, Indore', deg: '12th, C.B.S.E. Board (Physics, Chemistry, Maths)', when: '2013 — 2014' },
  { org: 'The New Green Field Public Academy, Indore', deg: '10th, C.B.S.E. Board', when: '2011 — 2012' }
];

// Same groups and self-assessed levels as the previous portfolio.
const SKILL_GROUPS = [
  { name: 'Programming', items: [['Java', 90]] },
  { name: 'Backend & Frameworks', items: [['Spring Boot', 90], ['Spring Security', 80], ['Spring MVC', 80], ['Spring WebFlux', 70], ['JUnit', 80]] },
  { name: 'Frontend', items: [['HTML', 80], ['JavaScript', 60], ['React.js', 40], ['CSS', 30]] },
  { name: 'Databases', items: [['MySQL', 90], ['PostgreSQL', 80], ['Oracle DB', 75]] },
  { name: 'Architecture & APIs', items: [['Microservices', 85], ['REST API', 85], ['Apache Kafka', 75], ['GraphQL', 50], ['Docker & Kubernetes', 65]] },
  { name: 'Tools & AI', items: [['IntelliJ IDEA', 90], ['Postman', 90], ['Git', 80], ['GitHub', 70], ['Claude Code', 70]] }
];
const SKILL_TAGS = ['Clean code', 'Security-minded', 'Test-driven', 'Delivery-focused'];

const AI_DEV = {
  title: 'Engineering faster with AI, without compromising quality',
  paras: [
    'I actively use Claude Code and GitHub Copilot as AI-assisted development tools to accelerate delivery, reduce repetitive engineering work, and move faster from technical design to production-ready implementation.',
    'I have hands-on experience running POCs with Claude Code and creating project-specific .skill definitions that capture reusable project context, conventions, workflows and engineering guidance. This lets AI-assisted development work with the needs of a specific codebase rather than relying only on generic prompts.',
    'I can adapt AI-assisted development to different kinds of engineering work — technical analysis and design, implementation, debugging, refactoring, testing, documentation and delivery — while keeping ownership of architecture, code quality, security, maintainability and production readiness.'
  ],
  pills: [
    ['Claude Code', 'POCs, agentic development workflows and project-specific .skill creation.'],
    ['GitHub Copilot', 'Faster implementation, exploration, refactoring and developer productivity.'],
    ['Production quality', 'AI accelerates delivery while engineering judgement, testing and quality gates remain human-owned.']
  ]
};

const HOBBY_QUOTE = 'Discipline in the gym. Competition on the field. Curiosity everywhere.';
const HOBBIES = [
  ['Gym', 'Fitness & strength training', true],
  ['Cricket', 'Playing & following the game', true],
  ['Travelling', 'Exploring new places', false],
  ['Music', 'Listening & discovering', false],
  ['Web Series', 'Movies & web series', false],
  ['Gaming', 'Casual gaming & fun', false]
];

const PROOF = [
  { k: 'Award', org: 'Deloitte USI', name: 'Spot Award', d: 'For end-to-end ownership of the Entitlement microservice and the Contact workflow.' },
  { k: 'Award', org: 'CGI', name: 'Bronze Award', d: 'For engineering delivery and client impact.' },
  { k: 'Certification', org: 'Udemy', name: 'Master Microservices with Spring Boot and Spring Cloud', d: '' },
  { k: 'Certification', org: 'Anthropic', name: 'Claude Code in Action', d: '' },
  { k: 'Certification', org: 'Anthropic', name: 'Claude 101', d: '' },
  { k: 'Certification', org: 'Anthropic', name: 'AI Fluency Framework and Foundations', d: '' }
];
