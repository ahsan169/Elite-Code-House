"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-dark-300">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Digital
              <br />
              <span className="italic font-serif text-primary-400">Excellence</span>
              <br />
              Since 2021
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-white/60 mb-8">
              We are a team of passionate developers, designers, and strategists who
              love building digital products that make a difference. From startups to
              enterprises, we help businesses transform their ideas into reality.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="glass-stat text-center p-4">
                <Counter target={50} suffix="+" className="text-3xl font-bold text-white mb-1" />
                <div className="text-xs text-white/60">Technologies</div>
              </div>
              <div className="glass-stat text-center p-4">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-white/60">Client Satisfaction</div>
              </div>
              <div className="glass-stat text-center p-4">
                <Counter target={10} suffix="+" className="text-3xl font-bold text-white mb-1" />
                <div className="text-xs text-white/60">Industries Served</div>
              </div>
            </div>

            <Link href="/about">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
