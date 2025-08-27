import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Ankush - Full Stack Developer",
    template: "%s | Ankush", 
  },
  description: "Portfolio of Ankush, a full-stack developer specializing in creating modern web and mobile applications using React, Next.js, and Node.js.",
  keywords: ["Full Stack Developer", "React Developer", "Next.js", "Portfolio", "Ankush", ,"Ankush Kumar", "Software Engineer"],
  openGraph: {
    title: "Ankush - Full Stack Developer",
    description: "Explore the portfolio of Ankush Kumar, a full-stack developer with a passion for building efficient and scalable applications.",
    url: "https://imankush.in",
    siteName: "Ankush's Portfolio",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ankush - Full Stack Developer",
    description: "Portfolio of Ankush Kumar, a full-stack developer specializing in modern web technologies.",
    creator: "@imankush__10",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ankush',
    jobTitle: 'Full Stack Developer',
    url: 'https://imankush.in', 
    sameAs: [
      'https://github.com/imankush10',
      'https://linkedin.com/in/imankush10',
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
