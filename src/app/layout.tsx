import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const viewport: Viewport = {
  themeColor: '#1B2A4A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'LexBooks India | Supreme Court Legal Library & Treatises',
  description:
    'Authoritative repository of Supreme Court commentaries, Indian bare acts, civil and criminal law treatises, and institutional bar publications for advocates and scholars.',
  keywords: [
    'Supreme Court of India',
    'Indian Law Books',
    'Legal Treatises',
    'Bharatiya Nyaya Sanhita',
    'Constitution of India',
    'Civil Procedure Code',
    'Legal Research India',
  ],
  authors: [{ name: 'LexBooks Editorial Board' }],
  creator: 'LexBooks India',
  publisher: 'LexBooks India Publications Pvt. Ltd.',
  metadataBase: new URL('https://lexbooks.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lexbooks.in',
    title: 'LexBooks India | Supreme Court Legal Library & Treatises',
    description:
      'Explore premier legal treatises, practitioner commentaries, and digital jurisprudence from the Supreme Court of India.',
    siteName: 'LexBooks India',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LexBooks India — Supreme Court Legal Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexBooks India | Supreme Court Legal Library',
    description:
      'Premier legal treatises, practitioner commentaries, and digital jurisprudence for advocates and scholars.',
    creator: '@lexbooksindia',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LexBooks India',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LexBooks India',
  alternateName: 'LexBooks Supreme Court Legal Library',
  url: 'https://lexbooks.in',
  logo: 'https://lexbooks.in/logo.png',
  description:
    'Authoritative digital legal repository and publisher of Supreme Court commentaries, treatises, and practitioner guides across India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Chamber Block IV, Bhagwan Das Road, Opposite Supreme Court of India',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-11-2338-7654',
    contactType: 'Editorial & Subscriptions',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://twitter.com/lexbooksindia',
    'https://linkedin.com/company/lexbooksindia',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#1B2A4A" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1A1A2E] font-body antialiased selection:bg-[#C9A84C] selection:text-[#1B2A4A]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
