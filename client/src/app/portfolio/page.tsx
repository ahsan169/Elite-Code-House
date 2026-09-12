"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const projects = [
  {
    title: "SaaS Dashboard Platform",
    category: "saas",
    description: "Comprehensive analytics dashboard for SaaS businesses with real-time data visualization.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#7ddafc"
  },
  {
    title: "E-commerce Mobile App",
    category: "mobile",
    description: "Cross-platform fashion e-commerce app with AR try-on features.",
    technologies: ["React Native", "Node.js", "MongoDB"],
    color: "#b7fe02"
  },
  {
    title: "AI Content Platform",
    category: "ai",
    description: "AI-powered content generation platform with GPT integration.",
    technologies: ["Next.js", "OpenAI", "MongoDB"],
    color: "#fe86a6"
  },
  {
    title: "Healthcare Portal",
    category: "web",
    description: "Patient management portal with appointment scheduling and telemedicine.",
    technologies: ["React", "Express", "MongoDB", "WebRTC"],
    color: "#977bf2"
  },
  {
    title: "Food Delivery App",
    category: "mobile",
    description: "On-demand food delivery application with real-time tracking.",
    technologies: ["React Native", "Node.js", "MongoDB", "Maps"],
    color: "#edff75"
  },
  {
    title: "Real Estate Platform",
    category: "web",
    description: "Property listing platform with advanced search and virtual tours.",
    technologies: ["Next.js", "Express", "MongoDB"],
    color: "#7ddafc"
  }
];

const categories = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "SaaS", value: "saas" },
  { label: "AI", value: "ai" }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Our{" "}
                <span className="italic font-serif text-primary-400">Portfolio</span>
              </h1>
              <p className="text-xl text-white/60">
                A showcase of projects we&apos;ve delivered for clients across various industries.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-dark-200 sticky top-20 z-30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? "bg-primary-500 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="h-48"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`
                    }}
                  />
                  <div className="p-6">
                    <span
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to See Your Project{" "}
              <span className="italic font-serif text-primary-400">Here</span>?
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Let&apos;s work together to build something amazing.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
