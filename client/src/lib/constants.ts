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
    flag: "🇬🇧"
  },
  {
    quote: "Great experience working with Ahsan. Exceeded my expectations, quick communication, and even handled a last-minute request without any hassle. Would recommend to anyone!",
    authorName: "aadaim_zampa2",
    authorRole: "Client",
    authorCompany: "Australia",
    country: "Australia",
    flag: "🇦🇺"
  },
  {
    quote: "Great communication and delivered exactly what was needed. Would hire again!",
    authorName: "wailiam_david12",
    authorRole: "Client",
    authorCompany: "United Kingdom",
    country: "United Kingdom",
    flag: "🇬🇧"
  },
  {
    quote: "Great experience! Fast delivery, clean Python script, and accurate CSV data extraction. Highly recommended.",
    authorName: "dayrlmak",
    authorRole: "Client",
    authorCompany: "United States",
    country: "United States",
    flag: "🇺🇸"
  },
  {
    quote: "Excellent approach and very professional work.",
    authorName: "Mmanglo777",
    authorRole: "Client",
    authorCompany: "United States",
    country: "United States",
    flag: "🇺🇸"
  }
];
