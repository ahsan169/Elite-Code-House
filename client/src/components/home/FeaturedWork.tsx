"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

const projects = [
  {
    title: "AI Finance Dashboard",
    category: "AI",
    image: "/portfolio/ai-finance.png",
    color: "#7ddafc"
  },
  {
    title: "SecureBank Mobile",
    category: "Mobile",
    image: "/portfolio/securebank.png",
    color: "#b7fe02"
  },
  {
    title: "LeadGen Pro",
    category: "SaaS",
    image: "/portfolio/leadgen-pro.png",
    color: "#fe86a6"
  },
  {
    title: "Apex Manufacturing CRM",
    category: "SaaS",
    image: "/portfolio/apex-manufacturing.png",
    color: "#977bf2"
  }
];

export default function FeaturedWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const animFrame = useRef<number>(0);

  const startAutoScroll = useCallback(() => {
    isHovering.current = true;
    const scroll = () => {
      if (!isHovering.current || !scrollRef.current) return;
      const el = scrollRef.current;
      el.scrollLeft += 1.5;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      animFrame.current = requestAnimationFrame(scroll);
    };
    animFrame.current = requestAnimationFrame(scroll);
  }, []);

  const stopAutoScroll = useCallback(() => {
    isHovering.current = false;
    cancelAnimationFrame(animFrame.current);
  }, []);

  return (
    <section className="py-24 bg-dark-300">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="italic font-serif text-primary-400">Work</span>
            </h2>
            <p className="text-white/60 max-w-lg">
              A selection of projects we&apos;re proud of
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/portfolio">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </motion.div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="overflow-x-auto scrollbar-hide -mx-6 px-6 lg:-mx-8 lg:px-8"
        >
          <div className="flex gap-6 pb-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[320px] md:w-[400px]"
              >
                <Link href="/portfolio">
                  <div className="group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:translate-x-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span
                        className="text-sm font-medium mb-2"
                        style={{ color: project.color }}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div
                      className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <svg
                        className="w-5 h-5"
                        style={{ color: project.color }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
