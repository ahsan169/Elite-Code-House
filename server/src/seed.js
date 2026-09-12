const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    await User.deleteMany({});
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@agency.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    const services = await Service.create([
      {
        title: 'MERN Web Development',
        description: 'Build scalable web applications using MongoDB, Express.js, React.js, and Node.js.',
        shortDescription: 'Full-stack web applications',
        icon: 'Globe',
        features: ['React.js & Next.js', 'Node.js & Express', 'MongoDB', 'REST APIs'],
        accentColor: '#7ddafc',
        order: 1
      },
      {
        title: 'SaaS Development',
        description: 'Complete SaaS platforms with authentication, subscriptions, and admin dashboards.',
        shortDescription: 'Complete SaaS platforms',
        icon: 'Layers',
        features: ['Authentication', 'Subscriptions', 'User Dashboards', 'Admin Panels'],
        accentColor: '#b7fe02',
        order: 2
      },
      {
        title: 'Mobile App Development',
        description: 'Cross-platform mobile applications using React Native for iOS and Android.',
        shortDescription: 'React Native mobile apps',
        icon: 'Smartphone',
        features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'],
        accentColor: '#edff75',
        order: 3
      },
      {
        title: 'AI-Powered Applications',
        description: 'Integrate AI and LLM APIs into your applications for intelligent features.',
        shortDescription: 'AI integrations',
        icon: 'Brain',
        features: ['AI Assistants', 'AI Chatbots', 'AI Analytics', 'Workflow Automation'],
        accentColor: '#fe86a6',
        order: 4
      },
      {
        title: 'E-commerce Development',
        description: 'Complete e-commerce solutions with product catalogs, payments, and inventory.',
        shortDescription: 'E-commerce solutions',
        icon: 'ShoppingCart',
        features: ['Product Catalogs', 'Payment Integration', 'Inventory Management', 'Order Processing'],
        accentColor: '#977bf2',
        order: 5
      }
    ]);
    console.log('Services seeded');

    const projects = await Project.create([
      {
        title: 'SaaS Dashboard Platform',
        description: 'A comprehensive SaaS dashboard with real-time analytics, user management, and subscription billing.',
        shortDescription: 'Analytics dashboard for SaaS businesses',
        category: 'saas',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        clientName: 'TechCorp',
        featured: true,
        order: 1
      },
      {
        title: 'E-commerce Mobile App',
        description: 'Cross-platform mobile application for a fashion e-commerce brand with AR try-on features.',
        shortDescription: 'Fashion e-commerce mobile app',
        category: 'mobile',
        technologies: ['React Native', 'Node.js', 'MongoDB'],
        clientName: 'FashionHub',
        featured: true,
        order: 2
      },
      {
        title: 'AI Content Platform',
        description: 'AI-powered content generation platform with GPT integration and team collaboration.',
        shortDescription: 'AI content generation platform',
        category: 'ai',
        technologies: ['Next.js', 'OpenAI', 'MongoDB', 'Tailwind'],
        clientName: 'ContentAI',
        featured: true,
        order: 3
      },
      {
        title: 'Healthcare Portal',
        description: 'Patient management portal with appointment scheduling, telemedicine, and health records.',
        shortDescription: 'Healthcare management portal',
        category: 'web',
        technologies: ['React', 'Express', 'MongoDB', 'WebRTC'],
        clientName: 'MedCare',
        featured: false,
        order: 4
      }
    ]);
    console.log('Projects seeded');

    const testimonials = await Testimonial.create([
      {
        quote: 'Outstanding development team. They delivered our SaaS platform on time and exceeded all expectations.',
        authorName: 'Sarah Johnson',
        authorRole: 'CEO',
        authorCompany: 'TechStart Inc',
        rating: 5,
        featured: true,
        order: 1
      },
      {
        quote: 'The mobile app they built for us has received amazing user feedback. Highly recommended!',
        authorName: 'Michael Chen',
        authorRole: 'Founder',
        authorCompany: 'AppVenture',
        rating: 5,
        featured: true,
        order: 2
      },
      {
        quote: 'Professional, responsive, and technically excellent. They understood our vision perfectly.',
        authorName: 'Emily Rodriguez',
        authorRole: 'CTO',
        authorCompany: 'DigitalFirst',
        rating: 5,
        featured: true,
        order: 3
      }
    ]);
    console.log('Testimonials seeded');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
