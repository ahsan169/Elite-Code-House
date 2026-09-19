"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Counter from "@/components/ui/Counter";

const values = [
  {
    title: "Code That Outlives Us",
    description:
      "We write code assuming someone else will maintain it in two years. Clean architecture, real documentation, no shortcuts we would be embarrassed to explain later.",
    icon: "🏗️",
    color: "#38BDF8",
  },
  {
    title: "No Surprises",
    description:
      "You will know exactly where your project stands every week. What shipped, what is blocked, what is next. Silence is the one thing we do not do.",
    icon: "💬",
    color: "#A855F7",
  },
  {
    title: "We Say No When We Should",
    description:
      "If a feature will hurt your product long term, we will tell you before we build it, not bill you for it and let you find out later.",
    icon: "🛑",
    color: "#F59E0B",
  },
  {
    title: "Built to Scale, Not Just Ship",
    description:
      "We design for the version of your product that exists after you get the traction you are building for, not just the version that gets you through launch.",
    icon: "📈",
    color: "#10B981",
  },
];

const teamMembers = [
  {
    name: "Ahsan",
    role: "Founder",
    photo: "/portfolio/founder.png",
    bio: "Ahsan founded EliteCode after years of watching good ideas get buried under bad execution. He leads every technical decision the agency makes, from architecture to the final line of code, and has built full stack products across Python, Django, FastAPI, React, and Node for startups that could not afford to get it wrong. His focus now is AI integration done properly: features that solve a real problem for the business, not features built because the technology exists.",
    placeholder: false,
  },
  {
    name: "Wasif",
    role: "Co-Founder",
    photo: "/portfolio/cofounder.png",
    bio: "Wasif co-founded EliteCode to make sure the work behind the code is as disciplined as the code itself. He runs operations and business development, the layer most agencies get wrong: keeping projects on time and on scope, and making sure every client relationship starts with an honest conversation about what is actually possible. He is the reason EliteCode scales without the chaos that usually comes with it.",
    placeholder: false,
  },
  {
    name: "Upcoming Hire",
    role: "",
    photo: "",
    bio: "",
    placeholder: true,
  },
  {
    name: "Upcoming Hire",
    role: "",
    photo: "",
    bio: "",
    placeholder: true,
  },
];

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "56, 189, 248";
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-dark-300 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="about-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#38BDF8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-dots)" />
              <line x1="10%" y1="20%" x2="30%" y2="35%" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
              <line x1="30%" y1="35%" x2="55%" y2="15%" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
              <line x1="55%" y1="15%" x2="75%" y2="40%" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
              <line x1="75%" y1="40%" x2="90%" y2="25%" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
              <line x1="20%" y1="60%" x2="45%" y2="75%" stroke="#A855F7" strokeWidth="0.5" opacity="0.3" />
              <line x1="45%" y1="75%" x2="70%" y2="65%" stroke="#A855F7" strokeWidth="0.5" opacity="0.3" />
              <line x1="70%" y1="65%" x2="85%" y2="80%" stroke="#A855F7" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Our{" "}
                <span className="italic font-serif text-primary-400">Story</span>
              </h1>
              <p className="text-xl text-white/60">
                We&apos;re a small team that ships production-grade software, not slide
                decks. If you&apos;ve been burned by an agency that overpromised and
                underdelivered, that&apos;s exactly the problem we built EliteCode to solve.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), transparent)",
                  }}
                />
                <div className="pl-8">
                  <p className="text-white/70 mb-6 leading-relaxed">
                    EliteCode started in 2021 out of frustration, not a business plan.
                    We kept meeting founders who had paid for &quot;custom development&quot;
                    and received a half finished admin panel, a developer who vanished
                    mid sprint, or code so tangled the next hire refused to touch it.
                    We decided to become the team we wished we had hired in the first place.
                  </p>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Since then we have shipped over 300 projects, including AI powered
                    dashboards, SaaS platforms, mobile banking apps, and e-commerce
                    systems for startups that needed to move fast and enterprises that
                    could not afford to move wrong. We build in the MERN stack because we
                    have stress tested it in production, not because it happens to be trendy.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    We do not hand off a project and disappear. Every client works directly
                    with the people actually writing the code. There is no account manager
                    relaying messages and no gap between what you asked for and what gets
                    delivered.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: <Counter target={300} suffix="+" className="text-4xl font-bold text-white mb-2" />, label: "Projects Delivered" },
                  { value: <Counter target={300} suffix="+" className="text-4xl font-bold text-white mb-2" />, label: "Happy Clients" },
                  { value: <span className="text-4xl font-bold text-white mb-2">5+</span>, label: "Years Experience" },
                  { value: <span className="text-4xl font-bold text-white mb-2">24/7</span>, label: "Support Available" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="p-6 text-center cursor-default rounded-2xl"
                    style={{
                      background: "linear-gradient(145deg, rgba(30, 41, 59, 0.65), rgba(15, 23, 42, 0.85))",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {stat.value}
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white text-center mb-16"
            >
              Our{" "}
              <span className="italic font-serif text-primary-400">Values</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const iconRgb = hexToRgb(value.color);
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl cursor-default"
                    style={{
                      background: "linear-gradient(145deg, rgba(30, 41, 59, 0.65), rgba(15, 23, 42, 0.85))",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `rgba(${iconRgb}, 0.1)`,
                        border: `1px solid rgba(${iconRgb}, 0.2)`,
                        boxShadow: `0 0 20px rgba(${iconRgb}, 0.15)`,
                      }}
                    >
                      <span className="text-xl">{value.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white text-center mb-16"
            >
              Meet the{" "}
              <span className="italic font-serif text-primary-400">Team</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(30, 41, 59, 0.65), rgba(15, 23, 42, 0.85))",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {member.placeholder ? (
                    <div className="aspect-[4/5] flex items-center justify-center border-b border-white/5">
                      <div className="w-24 h-32 rounded-2xl border-2 border-dashed border-[#38BDF8]/20 flex items-center justify-center bg-white/[0.02]">
                        <svg className="w-8 h-8 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-0.5">{member.name}</h3>
                    {member.role && (
                      <p className="text-sm text-primary-400 mb-3">{member.role}</p>
                    )}
                    {member.bio && (
                      <p className="text-white/50 text-xs leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Work With{" "}
              <span className="italic font-serif text-primary-400">Us</span>?
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Tell us what you are building. We will tell you honestly whether we are
              the right team for it, and if we are not, we will point you toward someone who is.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
