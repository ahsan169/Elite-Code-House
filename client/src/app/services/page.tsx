import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end MERN stack development solutions including web apps, SaaS platforms, mobile apps, AI applications, and e-commerce solutions."
};

const services = [
  {
    title: "MERN Web Development",
    description: "Build scalable web applications using MongoDB, Express.js, React.js, and Node.js. From single-page apps to complex enterprise solutions.",
    features: ["React.js & Next.js", "Node.js & Express", "MongoDB & Mongoose", "REST & GraphQL APIs", "Real-time Features", "Cloud Deployment"],
    accentColor: "#7ddafc",
    icon: "🌐"
  },
  {
    title: "SaaS Development",
    description: "Complete SaaS platforms with authentication, subscriptions, user management, and admin dashboards. Ready for scale.",
    features: ["User Authentication", "Subscription Billing", "Team Management", "Role-Based Access", "Analytics Dashboard", "API Integration"],
    accentColor: "#b7fe02",
    icon: "☁️"
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications using React Native. One codebase, native performance on iOS and Android.",
    features: ["React Native", "iOS & Android", "Push Notifications", "Offline Support", "Camera & Maps", "Payment Integration"],
    accentColor: "#edff75",
    icon: "📱"
  },
  {
    title: "AI-Powered Applications",
    description: "Integrate AI and LLM APIs into your applications. From chatbots to content generation and predictive analytics.",
    features: ["AI Assistants", "AI Chatbots", "AI Search", "Document Processing", "Recommendations", "Workflow Automation"],
    accentColor: "#fe86a6",
    icon: "🤖"
  },
  {
    title: "E-commerce Development",
    description: "Complete e-commerce solutions with product catalogs, shopping carts, checkout, payments, and inventory management.",
    features: ["Product Catalogs", "Shopping Cart", "Payment Gateway", "Order Management", "Inventory Tracking", "Admin Dashboard"],
    accentColor: "#977bf2",
    icon: "🛒"
  },
  {
    title: "Business Automation",
    description: "Automate your business workflows with custom integrations, scheduled processes, and intelligent automation.",
    features: ["Workflow Automation", "Email Automation", "Third-party APIs", "Scheduled Tasks", "Data Processing", "Custom Integrations"],
    accentColor: "#7ddafc",
    icon: "⚡"
  }
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Our{" "}
                <span className="italic font-serif text-primary-400 gradient-text">Services</span>
              </h1>
              <p className="text-xl text-white/60">
                End-to-end development solutions tailored to your business needs.
                From concept to deployment, we build digital products that scale.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 -mt-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="p-8 glass"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-white/70"
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: service.accentColor }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your{" "}
              <span className="italic font-serif text-primary-400 gradient-text">Project</span>?
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Let&apos;s discuss your requirements and see how we can help bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
            >
              Get a Free Quote
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
