"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { FaGlobe, FaLayerGroup, FaMobileAlt, FaBrain, FaShoppingCart } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<Record<string, unknown>>> = {
  Globe: FaGlobe,
  Layers: FaLayerGroup,
  Smartphone: FaMobileAlt,
  Brain: FaBrain,
  ShoppingCart: FaShoppingCart
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "56, 189, 248";
}

export default function ServicesGrid() {
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="italic font-serif text-primary-400">Services</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            End-to-end development solutions tailored to your business needs
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="overflow-x-scroll-y-visible scrollbar-hide -mx-6 px-6 lg:-mx-8 lg:px-8 pt-4 -mt-4"
        >
          <div className="flex gap-6 pb-4">
            {SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon] || FaGlobe;
              const iconRgb = hexToRgb(service.accentColor);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[300px] md:w-[350px]"
                >
                  <Link href="/services">
                    <div className="glass p-6 h-full group cursor-pointer">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 glass-icon"
                        style={{ "--icon-rgb": iconRgb } as React.CSSProperties}
                      >
                        <Icon size={24} style={{ color: service.accentColor }} />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">{service.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
