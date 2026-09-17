export const SITE_NAME = "Elite Code House";
export const SITE_DESCRIPTION = "Premium MERN stack development agency. We build scalable web applications, SaaS platforms, AI-powered products, and React Native mobile apps.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const SERVICES = [
  {
    title: "MERN Web Development",
    description: "Build scalable web applications using MongoDB, Express.js, React.js, and Node.js.",
    icon: "Globe",
    accentColor: "#7ddafc",
    features: ["React.js & Next.js", "Node.js & Express", "MongoDB", "REST APIs"]
  },
  {
    title: "SaaS Development",
    description: "Complete SaaS platforms with authentication, subscriptions, and admin dashboards.",
    icon: "Layers",
    accentColor: "#b7fe02",
    features: ["Authentication", "Subscriptions", "User Dashboards", "Admin Panels"]
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications using React Native for iOS and Android.",
    icon: "Smartphone",
    accentColor: "#edff75",
    features: ["React Native", "iOS & Android", "Push Notifications", "Offline Support"]
  },
  {
    title: "AI-Powered Applications",
    description: "Integrate AI and LLM APIs into your applications for intelligent features.",
    icon: "Brain",
    accentColor: "#fe86a6",
    features: ["AI Assistants", "AI Chatbots", "AI Analytics", "Workflow Automation"]
  },
  {
    title: "E-commerce Development",
    description: "Complete e-commerce solutions with product catalogs, payments, and inventory.",
    icon: "ShoppingCart",
    accentColor: "#977bf2",
    features: ["Product Catalogs", "Payment Integration", "Inventory Management", "Order Processing"]
  },
  {
    title: "WordPress Development",
    description: "Custom WordPress sites and themes with WooCommerce integration, plugin development, and performance optimization.",
    icon: "WordPress",
    accentColor: "#38BDF8",
    features: ["Custom Themes", "WooCommerce", "Plugin Development"]
  },
  {
    title: "Framer Development",
    description: "High-converting, animated landing pages and marketing sites built in Framer with CMS integration and responsive design.",
    icon: "Framer",
    accentColor: "#A855F7",
    features: ["Landing Pages", "CMS Integration", "Animations"]
  },
  {
    title: "Webflow Development",
    description: "Pixel-perfect, no-code websites built in Webflow with custom interactions, CMS collections, and SEO-ready structure.",
    icon: "Webflow",
    accentColor: "#F43F5E",
    features: ["Custom Interactions", "CMS Collections", "SEO Optimized"]
  }
];

export const STATS = [
  { value: 300, suffix: "+", label: "Projects Delivered" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Support Available" }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We understand your business goals, target users, and technical requirements to create a comprehensive roadmap."
  },
  {
    step: "02",
    title: "Design & Development",
    description: "Our team builds your product using modern MERN stack technologies with clean, scalable code."
  },
  {
    step: "03",
    title: "Testing & Deployment",
    description: "Rigorous testing followed by seamless deployment to production with ongoing support."
  }
];

export const TESTIMONIALS = [
  {
    quote: "One of the best experiences I've had on Fiverr. He understood the assignment quickly, suggested a practical approach and delivered quality work before the deadline. I would confidently recommend him to anyone.",
    authorName: "laxotoni",
    authorRole: "Client",
    authorCompany: "United Kingdom",
    country: "United Kingdom",
    countryCode: "gb",
    flag: "🇬🇧"
  },
  {
    quote: "Great experience working with Ahsan. Exceeded my expectations, quick communication, and even handled a last-minute request without any hassle. Would recommend to anyone!",
    authorName: "aadaim_zampa2",
    authorRole: "Client",
    authorCompany: "Australia",
    country: "Australia",
    countryCode: "au",
    flag: "🇦🇺"
  },
  {
    quote: "Great communication and delivered exactly what was needed. Would hire again!",
    authorName: "wailiam_david12",
    authorRole: "Client",
    authorCompany: "United Kingdom",
    country: "United Kingdom",
    countryCode: "gb",
    flag: "🇬🇧"
  },
  {
    quote: "Great experience! Fast delivery, clean Python script, and accurate CSV data extraction. Highly recommended.",
    authorName: "dayrlmak",
    authorRole: "Client",
    authorCompany: "United States",
    country: "United States",
    countryCode: "us",
    flag: "🇺🇸"
  },
  {
    quote: "Excellent approach and very professional work.",
    authorName: "Mmanglo777",
    authorRole: "Client",
    authorCompany: "United States",
    country: "United States",
    countryCode: "us",
    flag: "🇺🇸"
  }
];

export const PORTFOLIO_PROJECTS = [
  {
    title: "AI Finance Dashboard",
    category: "ai",
    description: "Smart financial dashboard with AI-powered insights, cash flow analysis, and spending category breakdowns.",
    technologies: ["React", "Node.js", "AI/ML", "Charts"],
    image: "/portfolio/securebank.png",
  },
  {
    title: "SecureBank Mobile",
    category: "mobile",
    description: "Full-featured mobile banking app with account management, transactions, and fund transfers.",
    technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
    image: "/portfolio/housing-prediction.png",
  },
  {
    title: "LeadGen Pro",
    category: "saas",
    description: "Company research and lead generation tool with advanced search, enrichment, and bulk export capabilities.",
    technologies: ["React", "Express", "MongoDB", "REST API"],
    image: "/portfolio/flight-prediction.png",
  },
  {
    title: "Apex Manufacturing CRM",
    category: "saas",
    description: "Sales pipeline management with Kanban view, quote generation, and opportunity tracking for manufacturers.",
    technologies: ["React", "Node.js", "MongoDB", "WebSocket"],
    image: "/portfolio/asset-library.png",
  },
  {
    title: "Housing Price Prediction",
    category: "ai",
    description: "ML-powered housing price prediction dashboard comparing Linear Regression, Decision Tree, Random Forest, and XGBoost models.",
    technologies: ["Python", "TensorFlow", "React", "D3.js"],
    image: "/portfolio/ai-finance.png",
  },
  {
    title: "Flight Delay Prediction",
    category: "ai",
    description: "Machine learning app predicting flight delays with probability analysis and performance overview charts.",
    technologies: ["Python", "Scikit-learn", "React", "Recharts"],
    image: "/portfolio/leadgen-pro.png",
  },
  {
    title: "D.CC Restaurant Management",
    category: "saas",
    description: "Restaurant operations dashboard with real-time order tracking, table management, revenue analytics, and top-dish performance insights.",
    technologies: ["React", "Dashboard UI", "Analytics"],
    image: "/portfolio/dcc-dashboard.png",
  },
  {
    title: "Dr Dental Clinic Website",
    category: "web",
    description: "Modern dental clinic marketing site with service booking, treatment breakdowns, and a clean patient-first layout.",
    technologies: ["Next.js", "Booking System", "Responsive Design"],
    image: "/portfolio/dr-dental.png",
  },
  {
    title: "PAF Token Platform",
    category: "web",
    description: "Crypto token platform with roadmap visualization, referral system, and whitepaper integration.",
    technologies: ["Next.js", "Web3.js", "Solidity", "Tailwind"],
    image: "/portfolio/paf-token-platform.png",
  },
  {
    title: "Asset Library",
    category: "web",
    description: "Document management system with categorization, tagging, and organization-level access control.",
    technologies: ["React", "Node.js", "MongoDB", "File Upload"],
    image: "/portfolio/apex-manufacturing.png",
  },
  {
    title: "WP/WC Sync API",
    category: "web",
    description: "Multi-language API middleware for WordPress & WooCommerce with i18n JSON support and template transformation.",
    technologies: ["Node.js", "Express", "WordPress API", "i18n"],
    image: "/portfolio/wpwc-sync-api.png",
  },
  {
    title: "LearnLoop E-Learning Platform",
    category: "web",
    description: "Online learning platform landing page with coaching session booking, live help prompts, and a warm, approachable brand identity.",
    technologies: ["React", "Landing Page", "UX Design"],
    image: "/portfolio/learnloop.png",
  },
  {
    title: "Mobile App Platform",
    category: "mobile",
    description: "Modern e-commerce mobile application with product browsing, advanced filtering, and personalized discovery features.",
    technologies: ["React Native", "Node.js", "MongoDB", "Redux"],
    image: "/portfolio/paf-token.png",
  }
];
