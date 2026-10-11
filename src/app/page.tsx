import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Scale,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  Star,
  Users,
  Award,
  BookMarked,
  CheckCircle,
  FileText,
  Search,
} from 'lucide-react';
import { getFeaturedBooks } from '@/lib/books-data';
import { BookCard } from '@/components/books/BookCard';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "LexBooks India | India's Premier Legal Library & Treatises",
  description:
    'Comprehensive repository of Indian legal treatises, Supreme Court commentaries, bare acts, and practitioner guides. Trusted by 50,000+ advocates and judicial scholars.',
};

export default function HomePage() {
  const featuredBooks = getFeaturedBooks().slice(0, 4);

  const stats = [
    { value: '500+', label: 'Authoritative Books', icon: BookOpen },
    { value: '50K+', label: 'Active Advocates & Scholars', icon: Users },
    { value: '100+', label: 'Eminent Jurists & Authors', icon: Award },
    { value: '10,000+', label: 'Supreme Court Precedents Won', icon: Scale },
  ];

  const whyChooseUs = [
    {
      icon: Scale,
      title: 'Supreme Court Expertise',
      description:
        'Authored and annotated by Senior Advocates, retired High Court Judges, and leading constitutional scholars with decades of Apex Court litigation experience.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Content',
      description:
        'Meticulously cross-referenced against official Supreme Court law reports, gazette notifications, and latest statutory amendments including the new criminal codes.',
    },
    {
      icon: Zap,
      title: 'Instant Digital Access',
      description:
        'Read immediately in your browser or courtroom chambers. Instant PDF downloads, cross-device synching, and citation-ready annotations on demand.',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Browse Library',
      description:
        'Search our specialized collection by doctrine, legal domain, statute, or specific Supreme Court citation bench.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Read Free Preview',
      description:
        'Examine the comprehensive table of contents and read the first two chapters free before deciding to purchase.',
      icon: BookMarked,
    },
    {
      step: '03',
      title: 'Purchase & Litigate',
      description:
        'Unlock full online reading or download offline DRM-free PDFs to take into court arguments and client briefings.',
      icon: FileText,
    },
  ];

  const testimonials = [
    {
      quote:
        'LexBooks has revolutionized our chamber preparation. Having authoritative commentaries on the new criminal codes alongside Supreme Court bench citations is invaluable.',
      author: 'Senior Advocate R. K. Malhotra',
      role: 'Supreme Court of India, 34 Years Practice',
      rating: 5,
    },
    {
      quote:
        'The depth of analysis on Article 21 and fundamental rights doctrine is unmatched. An essential digital companion for every practicing lawyer and judicial aspirant.',
      author: 'Justice (Retd.) Meenakshi Swaminathan',
      role: 'Former High Court Judge & Arbitrator',
      rating: 5,
    },
    {
      quote:
        'Instant access to reliable corporate law commentaries with NCLAT precedents saved hours during a critical appellate filing. The reading interface is flawless.',
      author: 'Devendra Singhania',
      role: 'Partner, Commercial Disputes, Delhi & Mumbai',
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1B2A4A] via-[#16223B] to-[#0F1B30] text-white py-20 lg:py-28">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C9A84C] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#3D5A80] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-semibold uppercase tracking-widest backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-500">
              <Scale className="w-4 h-4 text-[#C9A84C]" />
              <span>Supreme Court of India • Authoritative Treatises</span>
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#FAFAF8] tracking-tight leading-[1.15]">
              India&apos;s Premier <span className="text-[#C9A84C]">Legal Library</span> & Treatises
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
              Master Indian jurisprudence with definitive commentaries, landmark case law digests,
              and exhaustive procedural guides written by eminent Supreme Court jurists and scholars.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/books">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto font-semibold shadow-lg text-[#1B2A4A]"
                >
                  Browse Library
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  View Subscription Plans
                </Button>
              </Link>
            </div>

            {/* Quick Trust Pill */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C9A84C]" />
                Updated with Bharatiya Nyaya Sanhita (BNS)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C9A84C]" />
                Instant PDF & Online Reading
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C9A84C]" />
                Bar Council Verified Citations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-white border-y border-[#1B2A4A]/10 py-10 shadow-sm relative z-20 -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1B2A4A]/10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`text-center px-4 ${idx > 0 ? 'pt-6 md:pt-0' : ''}`}>
                  <div className="inline-flex p-2.5 rounded-xl bg-[#1B2A4A]/5 text-[#1B2A4A] mb-3">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1B2A4A]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#5A607F] font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED BOOKS */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                Curated Treatises
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A] mt-1">
                Featured Legal Treatises
              </h2>
              <p className="text-sm text-[#5A607F] mt-2 max-w-xl">
                Landmark volumes currently cited across high courts and the Supreme Court of India.
              </p>
            </div>
            <Link href="/books">
              <Button
                variant="outline"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="self-start md:self-auto"
              >
                Explore All 500+ Treatises
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 bg-white border-t border-[#1B2A4A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
              Institutional Reliability
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A] mt-1">
              Why Legal Minds Trust LexBooks
            </h2>
            <p className="text-sm text-[#5A607F] mt-2">
              Designed specifically for the rigorous demands of appellate advocacy, chamber research, and academic scholarship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] rounded-2xl p-8 border border-[#1B2A4A]/10 shadow-sm hover:shadow-md transition-shadow relative group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1B2A4A] text-[#C9A84C] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1B2A4A] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1A1A2E]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-gradient-to-b from-[#FAFAF8] to-[#E8EBF0]/50 border-t border-[#1B2A4A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
              Streamlined Access
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A] mt-1">
              How LexBooks Works
            </h2>
            <p className="text-sm text-[#5A607F] mt-2">
              From finding critical precedents to arguing before the bench in three frictionless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-[#1B2A4A]/10 shadow-sm relative flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-3xl text-[#C9A84C]/50">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#1B2A4A]/5 text-[#1B2A4A] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1B2A4A]" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1B2A4A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#5A607F] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-white border-t border-[#1B2A4A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
              Courtroom Endorsements
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A] mt-1">
              Endorsed by Bench & Bar
            </h2>
            <p className="text-sm text-[#5A607F] mt-2">
              Hear from leading senior counsel, arbiters, and trial specialists who rely on LexBooks daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF8] rounded-2xl p-8 border border-[#1B2A4A]/10 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#C9A84C]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A84C]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1A1A2E]/80 italic leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1B2A4A]/10">
                  <div className="font-heading font-bold text-[#1B2A4A] text-sm">
                    {test.author}
                  </div>
                  <div className="text-xs text-[#5A607F] mt-0.5">{test.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="py-16 bg-[#1B2A4A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
            Empower Your Chambers
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#FAFAF8]">
            Start Your Legal Research Today
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Gain immediate access to over 500 definitive legal commentaries, Supreme Court bench analysis,
            and downloadable courtroom resources.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/books">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto font-semibold shadow-lg text-[#1B2A4A]"
              >
                Browse All Books
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10"
              >
                Explore Chamber Subscriptions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
