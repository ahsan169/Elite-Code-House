"use client";

import Badge from "@/components/ui/Badge";

const services = [
  { label: "React.js", color: "cyan" as const },
  { label: "Next.js", color: "lime" as const },
  { label: "Node.js", color: "yellow" as const },
  { label: "MongoDB", color: "pink" as const },
  { label: "TypeScript", color: "purple" as const },
  { label: "React Native", color: "cyan" as const },
  { label: "Express.js", color: "lime" as const },
  { label: "Tailwind CSS", color: "yellow" as const },
  { label: "AI Integration", color: "pink" as const },
  { label: "REST APIs", color: "purple" as const }
];

export default function ServiceMarquee() {
  return (
    <section className="py-12 bg-dark-300 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 mb-8">
        <p className="text-center text-white/40 text-sm uppercase tracking-widest">
          Our Technology Stack
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-300 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-300 to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...services, ...services, ...services].map((service, index) => (
            <div key={index} className="flex-shrink-0 mx-2">
              <Badge color={service.color} variant="glass">
                {service.label}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
