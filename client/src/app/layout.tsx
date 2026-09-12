import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Elite Code House | MERN Development Agency",
    template: "%s | Elite Code House"
  },
  description: "Premium MERN stack development agency. We build scalable web applications, SaaS platforms, AI-powered products, and React Native mobile apps.",
  keywords: ["MERN", "React", "Node.js", "MongoDB", "SaaS", "Web Development", "Mobile Apps", "AI Applications"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Elite Code House",
    title: "Elite Code House | MERN Development Agency",
    description: "Premium MERN stack development agency. We build scalable web applications, SaaS platforms, AI-powered products, and React Native mobile apps.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elite Code House"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Code House | MERN Development Agency",
    description: "Premium MERN stack development agency.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
