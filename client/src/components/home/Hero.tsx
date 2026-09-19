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
    name: "Ahsan",
    role: "Founder",
    image: "/portfolio/team-member.png",
    placeholder: false
  },
  {
    name: "Wasif",
    role: "Co-Founder",
    image: "/portfolio/cofounder.png",
    placeholder: false
  },
  {
    name: "Coming Soon",
    role: "",
    image: "",
    placeholder: true
  },
  {
    name: "Coming Soon",
    role: "",
    image: "",
    placeholder: true
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
    <section className="relative min-h-screen flex items-center bg-dark-300 overflow-hidden pt-[100px]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-purple/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent-purple/8 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10" style={{ padding: "0 clamp(1.5rem, 4vw, 2rem)" }}>
        <div className="grid lg:grid-cols-2 items-center min-h-screen" style={{ gap: "clamp(2rem, 5vw, 3rem)" }}>
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
                  <h1 className="font-bold text-white leading-[1.1] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}>
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
              className="text-white/50 leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)", maxWidth: "clamp(20rem, 30vw, 28rem)", marginTop: "clamp(1rem, 2vw, 1.5rem)", marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap"
              style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}
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

          <div className="relative hidden lg:flex items-center justify-center" style={{ height: "clamp(35rem, 45vw, 37.5rem)" }}>
            <div className="relative w-full h-full">
              {/* Background decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/15"
                style={{ width: "clamp(20rem, 30vw, 25rem)", height: "clamp(20rem, 30vw, 25rem)" }}
              />

              {/* Photo 1 - Large (Founder) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute top-[10%] left-[8%] z-20"
              >
                <div className="relative group">
                  <div className="rounded-3xl overflow-hidden border-2 border-[#38BDF8]/40 shadow-lg shadow-black/20 group-hover:border-[#38BDF8]/80 group-hover:shadow-[#38BDF8]/15 transition-all duration-300"
                    style={{ width: "clamp(10rem, 13vw, 11rem)", height: "clamp(12rem, 15.5vw, 13rem)" }}>
                    <img
                      src={teamMembers[0].image}
                      alt={teamMembers[0].name}
                      width={176}
                      height={208}
                      className="w-full h-full object-cover hero-photo"
                    />
                  </div>
                  {/* Desktop hover tooltip */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <div className="px-3 py-1.5 rounded-full bg-dark-300/90 backdrop-blur-md border border-[#38BDF8]/30 text-xs">
                      <span className="text-white font-medium">{teamMembers[0].name}</span>
                      <span className="text-[#38BDF8] ml-1.5">{teamMembers[0].role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Photo 2 - Large (Co-Founder) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="absolute top-[10%] right-[8%] z-30"
              >
                <div className="relative group">
                  <div className="rounded-3xl overflow-hidden border-2 border-[#38BDF8]/40 shadow-lg shadow-black/20 group-hover:border-[#38BDF8]/80 group-hover:shadow-[#38BDF8]/15 transition-all duration-300"
                    style={{ width: "clamp(10rem, 13vw, 11rem)", height: "clamp(12rem, 15.5vw, 13rem)" }}>
                    <img
                      src={teamMembers[1].image}
                      alt={teamMembers[1].name}
                      width={176}
                      height={208}
                      className="w-full h-full object-cover hero-photo"
                    />
                  </div>
                  {/* Desktop hover tooltip */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <div className="px-3 py-1.5 rounded-full bg-dark-300/90 backdrop-blur-md border border-[#38BDF8]/30 text-xs">
                      <span className="text-white font-medium">{teamMembers[1].name}</span>
                      <span className="text-[#38BDF8] ml-1.5">{teamMembers[1].role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Photo 3 - Small (Placeholder) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="absolute bottom-[18%] left-[5%] z-10"
              >
                <div className="rounded-3xl overflow-hidden border-2 border-dashed border-[#38BDF8]/20 flex items-center justify-center bg-white/[0.02]"
                  style={{ width: "clamp(7rem, 9.5vw, 8rem)", height: "clamp(9rem, 12vw, 10rem)" }}>
                  <svg className="w-8 h-8 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </motion.div>

              {/* Photo 4 - Small (Placeholder) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="absolute bottom-[18%] right-[18%] z-20"
              >
                <div className="rounded-3xl overflow-hidden border-2 border-dashed border-[#38BDF8]/20 flex items-center justify-center bg-white/[0.02]"
                  style={{ width: "clamp(7rem, 9.5vw, 8rem)", height: "clamp(9rem, 12vw, 10rem)" }}>
                  <svg className="w-8 h-8 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
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
