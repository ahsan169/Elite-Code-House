"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Counter from "@/components/ui/Counter";

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Full-stack developer with 10+ years of experience building scalable web applications."
  },
  {
    name: "Sarah Williams",
    role: "Lead Developer",
    bio: "React and Node.js expert passionate about clean code and user experience."
  },
  {
    name: "Michael Chen",
    role: "Mobile Developer",
    bio: "React Native specialist building cross-platform mobile experiences."
  },
  {
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    bio: "Creating intuitive and beautiful interfaces that users love."
  }
];

const values = [
  {
    title: "Quality First",
    description: "We never compromise on code quality, performance, or user experience.",
    icon: "✨"
  },
  {
    title: "Transparent Communication",
    description: "Regular updates, clear timelines, and honest conversations throughout.",
    icon: "💬"
  },
  {
    title: "Client Success",
    description: "Your success is our success. We're invested in your long-term growth.",
    icon: "🚀"
  },
  {
    title: "Continuous Learning",
    description: "We stay ahead of the curve with the latest technologies and best practices.",
    icon: "📚"
  }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                About{" "}
                <span className="italic font-serif text-primary-400 gradient-text">Us</span>
              </h1>
              <p className="text-xl text-white/60">
                We&apos;re a team of passionate developers building digital products
                that make a difference. From startups to enterprises, we help
                businesses transform their ideas into reality.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our{" "}
                  <span className="italic font-serif text-primary-400 gradient-text">Story</span>
                </h2>
                <p className="text-white/60 mb-4">
                  Founded in 2021, Elite Code House started with a simple mission:
                  to help businesses build exceptional digital products using modern
                  web technologies.
                </p>
                <p className="text-white/60 mb-4">
                  What began as a small team of passionate developers has grown into
                  a full-service development agency serving clients worldwide. We
                  specialize in the MERN stack and have delivered 300+ projects across
                  various industries.
                </p>
                <p className="text-white/60">
                  Our approach combines technical excellence with a deep understanding
                  of business goals. We don&apos;t just write code—we build solutions
                  that drive growth and create lasting value.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="glass-stat p-6 text-center">
                  <Counter target={300} suffix="+" className="text-4xl font-bold text-white mb-2" />
                  <div className="text-sm text-white/60">Projects Delivered</div>
                </div>
                <div className="glass-stat p-6 text-center">
                  <Counter target={300} suffix="+" className="text-4xl font-bold text-white mb-2" />
                  <div className="text-sm text-white/60">Happy Clients</div>
                </div>
                <div className="glass-stat p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">5+</div>
                  <div className="text-sm text-white/60">Years Experience</div>
                </div>
                <div className="glass-stat p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-white/60">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Our{" "}
              <span className="italic font-serif text-primary-400 gradient-text">Values</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 -mt-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="glass p-6 text-center"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Meet the{" "}
              <span className="italic font-serif text-primary-400 gradient-text">Team</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-6 glass rounded-2xl text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-500">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-primary-400 mb-3">{member.role}</p>
                  <p className="text-white/60 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Work With{" "}
              <span className="italic font-serif text-primary-400 gradient-text">Us</span>?
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              We&apos;re always looking for talented people to join our team.
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
