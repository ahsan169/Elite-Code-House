"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

export default function FeaturedWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const animFrame = useRef<number>(0);

  const startAutoScroll = useCallback(() => {
    isHovering.current = true;
    const scroll = () => {
      if (!isHovering.current || !scrollRef.current) return;
      const el = scrollRef.current;
      el.scrollLeft += 0.8;
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
              Featured <span className="italic font-serif text-primary-400 gradient-text">Work</span>
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
          className="overflow-x-scroll-y-visible scrollbar-hide -mx-6 px-6 lg:-mx-8 lg:px-8 pt-4 -mt-4"
        >
          <div className="flex gap-6 pb-4">
            {PORTFOLIO_PROJECTS.map((project, index) => (
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
