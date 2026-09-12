"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import Counter from "@/components/ui/Counter";

export default function TrustBar() {
  return (
    <section className="py-12 bg-dark-200 border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
