"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
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
          className="overflow-x-auto scrollbar-hide -mx-6 px-6 lg:-mx-8 lg:px-8"
        >
          <div className="flex gap-8 pb-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.authorName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex-shrink-0 w-[320px] md:w-[400px] p-8 glass rounded-2xl relative"
              >
                <FaQuoteLeft className="text-primary-500/20 text-4xl mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-accent-yellow text-sm" />
                  ))}
                </div>

                <p className="text-white/80 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-xl">{testimonial.flag}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.authorName}</div>
                    <div className="text-sm text-white/60 flex items-center gap-1">
                      <span>{testimonial.flag}</span>
                      <span>{testimonial.country}</span>
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
