"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CalendlyEmbed from "@/components/ui/CalendlyEmbed";

const AppointmentVideoCall = dynamic(
  () => import("@/components/contact/AppointmentVideoCall"),
  { ssr: false }
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Get in{" "}
                <span className="italic font-serif text-primary-400">Touch</span>
              </h1>
              <p className="text-xl text-white/60">
                Have a project in mind? We&apos;d love to hear about it. Send us a
                message and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                {submitStatus === "success" ? (
                  <div className="p-12 glass rounded-2xl text-center">
                    <div className="text-6xl mb-6">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-white/60 mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({ ...formData, service: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        >
                          <option value="" className="bg-dark-200">Select a service</option>
                          <option value="web" className="bg-dark-200">Web Development</option>
                          <option value="mobile" className="bg-dark-200">Mobile App</option>
                          <option value="saas" className="bg-dark-200">SaaS Development</option>
                          <option value="ai" className="bg-dark-200">AI Application</option>
                          <option value="ecommerce" className="bg-dark-200">E-commerce</option>
                          <option value="other" className="bg-dark-200">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        >
                          <option value="" className="bg-dark-200">Select budget range</option>
                          <option value="5k-10k" className="bg-dark-200">$5,000 - $10,000</option>
                          <option value="10k-25k" className="bg-dark-200">$10,000 - $25,000</option>
                          <option value="25k-50k" className="bg-dark-200">$25,000 - $50,000</option>
                          <option value="50k+" className="bg-dark-200">$50,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {submitStatus === "error" && (
                      <p className="text-red-500 text-sm">
                        Something went wrong. Please try again later.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div className="p-6 glass rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <span className="text-primary-500">📧</span>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Email</div>
                        <div className="text-white">hello@elitecodehouse.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <span className="text-primary-500">📞</span>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Phone</div>
                        <div className="text-white">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <span className="text-primary-500">📍</span>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Location</div>
                        <div className="text-white">San Francisco, CA</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 glass rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Response Time</h3>
                  <p className="text-white/60 text-sm">
                    We typically respond within 24 hours on business days. For urgent
                    inquiries, please call us directly.
                  </p>
                </div>

                <div className="p-6 glass rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Free Consultation</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Not sure what you need? Schedule a free 30-minute consultation
                    to discuss your project goals and how we can help.
                  </p>
                  <CalendlyEmbed
                    url="https://calendly.com/ahsanchuadhry143?hide_event_type_details=1&hide_landing_page_details=1&hide_border=1&hide_gdpr_banner=1&timezone=America/New_York&background_color=1a1a2e&text_color=ffffff&primary_color=06b6d4"
                    height={700}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="schedule" className="py-24 bg-dark-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Or <span className="italic font-serif text-primary-400">Schedule a Call</span> Directly
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Pick a time that works for you. Our team is available Monday through Friday, 9 AM to 6 PM EST.
              </p>
            </div>
            <div className="mx-auto">
              <CalendlyEmbed
                url="https://calendly.com/ahsanchuadhry143?hide_event_type_details=1&hide_landing_page_details=1&hide_border=1&hide_gdpr_banner=1&timezone=America/New_York&background_color=1a1a2e&text_color=ffffff&primary_color=06b6d4"
                height={700}
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-dark-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="italic font-serif text-primary-400">Instant</span> Live Call
              </h2>
              <p className="text-white/60">
                Need to talk now? Start an instant audio or video call with our team. No scheduling required.
              </p>
            </div>
            <div className="mx-auto max-w-2xl p-8 glass rounded-2xl">
              <AppointmentVideoCall />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
