"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSteps() {
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
            How <span className="italic font-serif text-primary-400">We Work</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our streamlined process ensures we deliver exceptional results every time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 glass rounded-2xl group hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-6xl font-bold text-white/10 mb-4 group-hover:text-primary-500/20 transition-colors">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/60">{step.description}</p>

              {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
