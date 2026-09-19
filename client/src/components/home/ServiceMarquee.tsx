"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiWordpress,
  SiWoocommerce,
  SiPhp,
  SiFramer,
  SiWebflow,
  SiFlutter,
  SiDocker,
  SiVercel,
} from "react-icons/si";
import {
  FaBrain,
  FaRobot,
  FaMobileAlt,
  FaNetworkWired,
  FaCode,
  FaServer,
  FaCloud,
  FaAws,
  FaProjectDiagram,
  FaDatabase,
  FaMobile,
  FaPuzzlePiece,
  FaCogs,
  FaLayerGroup,
  FaCodeBranch,
} from "react-icons/fa";

const accentColors = ["#38BDF8", "#A855F7", "#38BDF8", "#A855F7", "#38BDF8", "#A855F7", "#38BDF8", "#A855F7"];

const categories = [
  {
    title: "Frontend Development",
    icon: FaCode,
    items: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend Development",
    icon: FaServer,
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "REST APIs", icon: FaNetworkWired, color: "#38BDF8" },
    ],
  },
  {
    title: "AI Integration",
    icon: FaBrain,
    items: [
      { name: "AI Integration", icon: FaBrain, color: "#A855F7" },
      { name: "OpenAI API", icon: FaRobot, color: "#FFFFFF" },
      { name: "LangChain", icon: FaProjectDiagram, color: "#A855F7" },
      { name: "Vector Databases", icon: FaDatabase, color: "#38BDF8" },
    ],
  },
  {
    title: "Mobile Development",
    icon: FaMobileAlt,
    items: [
      { name: "React Native", icon: FaMobileAlt, color: "#61DAFB" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Expo", icon: FaMobile, color: "#FFFFFF" },
      { name: "Native Modules", icon: FaCogs, color: "#38BDF8" },
    ],
  },
  {
    title: "WordPress Development",
    icon: FaCode,
    items: [
      { name: "WordPress", icon: SiWordpress, color: "#21759B" },
      { name: "WooCommerce", icon: SiWoocommerce, color: "#96588A" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Elementor", icon: FaPuzzlePiece, color: "#92003B" },
    ],
  },
  {
    title: "Framer Development",
    icon: FaCode,
    items: [
      { name: "Framer", icon: SiFramer, color: "#FFFFFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#BB4BFF" },
      { name: "CMS Integration", icon: FaLayerGroup, color: "#38BDF8" },
      { name: "Custom Interactions", icon: FaCogs, color: "#A855F7" },
    ],
  },
  {
    title: "Webflow Development",
    icon: FaCode,
    items: [
      { name: "Webflow", icon: SiWebflow, color: "#4353FF" },
      { name: "Webflow CMS", icon: SiWebflow, color: "#4353FF" },
      { name: "CMS Collections", icon: FaLayerGroup, color: "#38BDF8" },
      { name: "Custom Code Embeds", icon: FaCodeBranch, color: "#A855F7" },
    ],
  },
  {
    title: "DevOps & Deployment",
    icon: FaCloud,
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "CI/CD Pipelines", icon: FaNetworkWired, color: "#38BDF8" },
    ],
  },
];

export default function ServiceMarquee() {
  return (
    <section className="py-24 bg-dark-300">
      <div className="container mx-auto" style={{ padding: "0 clamp(1.5rem, 4vw, 2rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology We{" "}
            <span className="italic font-serif text-primary-400">Master</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            The tools and frameworks we use to build products that scale
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ alignItems: "start" }}
        >
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden transition-shadow duration-300"
              style={{
                background: "linear-gradient(145deg, rgba(30, 41, 59, 0.65), rgba(15, 23, 42, 0.85))",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
                padding: "28px 24px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(56, 189, 248, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.25)";
              }}
            >
              {/* Hover gradient border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  padding: "1px",
                  background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Heading with icon */}
              <div className="flex items-center gap-2.5 mb-3">
                <category.icon size={15} style={{ color: accentColors[catIndex], opacity: 0.7, flexShrink: 0 }} />
                <h3 className="text-white font-semibold text-[15px] leading-tight">{category.title}</h3>
              </div>

              {/* Divider */}
              <div className="mb-4" style={{ borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }} />

              {/* Tech list */}
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2.5">
                    <item.icon size={16} style={{ color: item.color, flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "#CBD5E1" }}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
