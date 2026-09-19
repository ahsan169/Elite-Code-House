"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

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
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

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

        <section className="py-12 bg-dark-200">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="group glass cursor-pointer overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-dark-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60"
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
