"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

const heroSlides = [
  {
    title: "We Build",
    accent: "Digital Products",
    subtitle: "That Scale",
    description: "Premium MERN stack development for startups and ambitious businesses."
  },
  {
    title: "Crafting",
    accent: "SaaS Platforms",
    subtitle: "For The Future",
    description: "End-to-end SaaS development from idea to production."
  },
  {
    title: "Building",
    accent: "AI-Powered Apps",
    subtitle: "With Intelligence",
    description: "Integrating AI capabilities into modern web applications."
  }
];

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Full-Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    color: "#7ddafc"
  },
  {
    name: "Sarah Williams",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    color: "#977bf2"
  },
  {
    name: "Michael Chen",
    role: "Backend Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    color: "#b7fe02"
  },
  {
    name: "Emily Davis",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    color: "#fe86a6"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-dark-300 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-purple/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent-purple/8 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="flex flex-col justify-center py-24 lg:py-0">
            <div className="relative h-[180px] md:h-[200px]">
              {heroSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 15
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                    {slide.title}
                    <br />
                    <span className="italic font-serif text-primary-400 gradient-text font-normal">{slide.accent}</span>
                    <br />
                    {slide.subtitle}
                  </h1>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-md mt-6 mb-8 leading-relaxed"
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Start Your Project
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  View Our Work
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center h-[600px]">
            <div className="relative w-full h-full">
              {/* Background decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.03]"
              />

               {/* Main image - Large */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute top-[15%] left-[10%] z-20"
              >
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ backgroundColor: teamMembers[0].color }}
                  />
                  <div className="relative w-44 h-52 rounded-3xl overflow-hidden border-2 border-white/10">
                    <img
                      src={teamMembers[0].image}
                      alt={teamMembers[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

               {/* Second image - Large (mirrors first) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="absolute top-[15%] right-[10%] z-30"
              >
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ backgroundColor: teamMembers[1].color }}
                  />
                  <div className="relative w-44 h-52 rounded-3xl overflow-hidden border-2 border-white/10">
                    <img
                      src={teamMembers[1].image}
                      alt={teamMembers[1].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

               {/* Third image - Small */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="absolute bottom-[20%] left-[5%] z-10"
              >
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ backgroundColor: teamMembers[2].color }}
                  />
                  <div className="relative w-32 h-40 rounded-3xl overflow-hidden border-2 border-white/10">
                    <img
                      src={teamMembers[2].image}
                      alt={teamMembers[2].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

               {/* Fourth image - Small (mirrors third) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="absolute bottom-[20%] right-[22%] z-20"
              >
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ backgroundColor: teamMembers[3].color }}
                  />
                  <div className="relative w-32 h-40 rounded-3xl overflow-hidden border-2 border-white/10">
                    <img
                      src={teamMembers[3].image}
                      alt={teamMembers[3].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "w-8 bg-primary-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
