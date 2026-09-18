"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const avatarColors = [
  "bg-accent-cyan/30 text-accent-cyan",
  "bg-accent-purple/30 text-accent-purple",
  "bg-accent-pink/30 text-accent-pink",
  "bg-accent-lime/30 text-accent-lime",
  "bg-accent-yellow/30 text-accent-yellow"
];

function getInitials(name: string): string {
  return name
    .split(/[_\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export default function Testimonials() {
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
    <section className="py-24 bg-dark-200">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client <span className="italic font-serif text-primary-400">Stories</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            What our clients say about working with us
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="overflow-x-scroll-y-visible scrollbar-hide -mx-6 px-6 lg:-mx-8 lg:px-8 pt-4 -mt-4"
        >
          <div className="flex gap-8 pb-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.authorName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex-shrink-0 w-[320px] md:w-[400px] glass p-8 relative"
              >
                <FaQuoteLeft className="glass-quote text-4xl mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-accent-yellow text-sm" />
                  ))}
                </div>

                <p className="text-white/80 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold text-sm ring-2 ring-white/10 ${avatarColors[index % avatarColors.length]}`}>
                    {getInitials(testimonial.authorName)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.authorName}</div>
                    <div className="text-sm text-white/60 flex items-center gap-1.5">
                      <span className={`fi fi-${testimonial.countryCode} fis text-base leading-none`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
