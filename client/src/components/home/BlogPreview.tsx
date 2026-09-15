"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  {
    title: "Building Scalable SaaS Platforms with MERN",
    excerpt: "Learn the best practices for building production-ready SaaS applications using the MERN stack.",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    image: "/blog/saas-platforms.jpg"
  },
  {
    title: "React Native vs Flutter: Which to Choose?",
    excerpt: "A comprehensive comparison of cross-platform mobile frameworks for your next project.",
    date: "Jan 10, 2024",
    readTime: "7 min read",
    image: "/blog/react-native-flutter.jpg"
  },
  {
    title: "Integrating AI into Your Web Applications",
    excerpt: "How to leverage AI APIs to add intelligent features to your MERN stack applications.",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    image: "/blog/ai-web-apps.jpg"
  }
];

export default function BlogPreview() {
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
            Latest <span className="italic font-serif text-primary-400">Insights</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Stay updated with our latest thoughts on technology and development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href="/blog">
                <div className="glass rounded-2xl overflow-hidden h-full group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-white/40 mb-3">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
