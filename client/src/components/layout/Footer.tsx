"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" }
    ],
    services: [
      { label: "Web Development", href: "/services" },
      { label: "Mobile Apps", href: "/services" },
      { label: "SaaS Development", href: "/services" },
      { label: "AI Applications", href: "/services" }
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" }
  ];

  return (
    <footer className="bg-dark-300 pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-6 block">
              Elite<span className="text-primary-500">Code</span>
            </Link>
            <p className="text-white/60 mb-6">
              Premium MERN stack development agency building scalable digital products for startups and ambitious businesses.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Elite Code House. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
