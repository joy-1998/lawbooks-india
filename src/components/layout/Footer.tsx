import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Scale } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const legalCategories = [
    { name: 'Constitutional Law', href: '/books?category=Constitutional+Law' },
    { name: 'Criminal Law & BNS', href: '/books?category=Criminal+Law' },
    { name: 'Civil Procedure & Specific Relief', href: '/books?category=Civil+Law' },
    { name: 'Corporate & Insolvency Code', href: '/books?category=Corporate+Law' },
    { name: 'Direct & Indirect Tax Laws', href: '/books?category=Tax+Law' },
    { name: 'Family & Matrimonial Laws', href: '/books?category=Family+Law' },
  ];

  const quickLinks = [
    { name: 'Treatise Catalog', href: '/books' },
    { name: 'Subscription Plans', href: '/pricing' },
    { name: 'Supreme Court Digest', href: '/digest' },
    { name: 'About LexBooks', href: '/about' },
    { name: 'Bar Council Institutional Access', href: '/institutional' },
    { name: 'Contact & Grievance', href: '/contact' },
    { name: 'Privacy & Data Protection Policy', href: '/privacy' },
  ];

  return (
    <footer className="bg-[#1B2A4A] text-[#FAFAF8] border-t-2 border-[#C9A84C]/40">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-gradient-to-r from-white/5 to-transparent p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[#C9A84C] mb-2 font-semibold text-sm">
                <Scale className="w-4 h-4" />
                <span>Supreme Court Gazette & Treatise Dispatch</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                Stay updated on landmark judgments & newly published volumes
              </h3>
              <p className="text-sm text-[#FAFAF8]/75 mt-1.5 leading-relaxed">
                Join over 25,000 judges, senior advocates, and judicial scholars across India.
                Delivered fortnightly.
              </p>
            </div>

            <form
              action="#"
              method="POST"
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]"
            >
              <input
                type="email"
                required
                placeholder="Enter your advocate / chamber email"
                className="px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:bg-white/15 w-full sm:w-80"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#C9A84C] text-[#1B2A4A] hover:bg-[#D4B45A] active:bg-[#B8963E] transition-colors shrink-0 shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                LexBooks India
              </span>
            </div>
            <p className="text-sm text-[#FAFAF8]/75 leading-relaxed">
              India&apos;s authoritative digital repository of Supreme Court jurisprudence,
              comprehensive treatises, and bar-standard practice commentaries since 1982.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C9A84C] font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Accredited Legal Publisher & Database</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-[#FAFAF8]/50 mb-3 font-semibold">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {['LinkedIn', 'X (Twitter)', 'YouTube', 'Bar Bulletin'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    aria-label={platform}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C9A84C] hover:text-[#1B2A4A] transition-colors flex items-center justify-center text-xs font-semibold text-[#FAFAF8]/80 border border-white/10"
                  >
                    {platform.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4 tracking-tight border-b border-white/10 pb-2">
              Platform & Access
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#FAFAF8]/75 hover:text-[#C9A84C] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Categories */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4 tracking-tight border-b border-white/10 pb-2">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              {legalCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-[#FAFAF8]/75 hover:text-[#C9A84C] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-white mb-4 tracking-tight border-b border-white/10 pb-2">
              Supreme Court Chambers
            </h4>
            <div className="space-y-3 text-sm text-[#FAFAF8]/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>
                  Chamber Block IV, Bhagwan Das Road, Opposite Supreme Court of India, New Delhi —
                  110001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a
                  href="tel:+911123380000"
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  +91 (011) 2338-7654 / 7655
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a
                  href="mailto:editorial@lexbooks.in"
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  editorial@lexbooks.in
                </a>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#FAFAF8]/60 bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="font-semibold text-white">Chamber Support Hours</p>
              <p className="mt-0.5">Mon – Fri: 9:00 AM – 7:00 PM IST</p>
              <p>Court Sitting Saturdays: 10:00 AM – 2:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer Bar */}
      <div className="border-t border-white/10 bg-[#0F1B30]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF8]/60">
          <p>© {currentYear} LexBooks India Publications Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#C9A84C] transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-[#C9A84C] transition-colors">
              Legal Disclaimer
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#C9A84C] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
