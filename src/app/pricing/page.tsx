'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Scale,
  Award,
} from 'lucide-react';
import { PricingCard, PricingPlan } from '@/components/payment/PricingCard';

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      tagline: 'Read Online — Ideal for solo advocates & law students',
      price: 499,
      billingPeriod: '/ month',
      isPopular: false,
      features: [
        'Unlimited online reading of 500+ legal treatises',
        '2 active concurrent devices',
        'Supreme Court case law citations',
        'Searchable bare acts & statutory indices',
        'Standard email chamber support',
      ],
      ctaText: 'Start Basic Plan',
      ctaHref: '/auth/register?plan=basic',
    },
    {
      id: 'pro',
      name: 'Pro Chamber',
      tagline: 'Read + Download — For active trial & appellate counsels',
      price: 999,
      billingPeriod: '/ month',
      isPopular: true,
      features: [
        'Everything in Basic Plan',
        'Unlimited DRM-free PDF downloads',
        '5 active chamber devices & tablet sync',
        'Offline access in web reader',
        'Priority chamber legal research support',
        'Early access to new treatise editions',
      ],
      ctaText: 'Start Pro Chamber',
      ctaHref: '/auth/register?plan=pro',
    },
    {
      id: 'institutional',
      name: 'Institutional',
      tagline: 'Team Access — For law firms, bar libraries & colleges',
      price: 4999,
      billingPeriod: '/ month',
      isPopular: false,
      features: [
        'Everything in Pro Chamber Plan',
        'Unlimited chamber and campus devices',
        'Centralized team and associate management',
        'Dedicated account manager & legal research concierge',
        'Custom chamber watermark & branding on PDFs',
        'Quarterly printed dispatch of new hardbound releases',
      ],
      ctaText: 'Request Institutional Access',
      ctaHref: '/contact?subject=institutional',
    },
  ];

  const faqs = [
    {
      question: 'Can I access the legal commentaries offline during courtroom hearings?',
      answer:
        'Yes. With the Pro and Institutional plans, you can download DRM-free PDF editions to your tablet, laptop, or smartphone. These PDFs contain hyperlinked statutory cross-references that function completely offline without courtroom Wi-Fi.',
    },
    {
      question: 'Are treatises updated when new statutory amendments or case laws occur?',
      answer:
        'All digital editions in our repository receive real-time editorial addenda. Major statutory shifts—such as the Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA replacements—are fully integrated with comparative mapping tables at no additional cost.',
    },
    {
      question: 'Can multiple advocates in our chamber share a single subscription?',
      answer:
        'The Basic plan allows up to 2 simultaneous devices, while the Pro Chamber tier supports up to 5 devices across your senior counsel and briefing juniors. For entire law firms or university faculties, our Institutional plan provides unlimited concurrent access.',
    },
    {
      question: 'What payment methods do you accept, and do you provide GST invoices?',
      answer:
        'We accept all major Indian payment methods including UPI (Google Pay, PhonePe, Paytm), Net Banking across 50+ Indian banks, RuPay/Visa/MasterCard credit & debit cards, and corporate credit cards. All subscriptions automatically generate a valid GST tax invoice with your chamber or firm GSTIN for tax deduction.',
    },
    {
      question: 'What is your refund or cancellation policy?',
      answer:
        'You may cancel your monthly subscription at any time with a single click from your user dashboard. You will continue to have full access until the end of your billing cycle. If you are dissatisfied within the first 7 days of subscribing, our chamber concierge will issue a full refund, no questions asked.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 text-[#1B2A4A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Transparent Chamber Memberships</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#1B2A4A] tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-[#5A607F] leading-relaxed">
            Flexible digital access tailored for independent practitioners, active courtroom chambers,
            and distinguished legal institutions across India.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1B2A4A]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1B2A4A]/5 flex items-center justify-center shrink-0">
              <Scale className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1B2A4A]">
                Need a Custom Chamber Configuration?
              </h3>
              <p className="text-xs sm:text-sm text-[#5A607F] mt-0.5">
                We cater to High Court Bar Associations, National Law Universities, and corporate legal departments.
              </p>
            </div>
          </div>
          <Link href="/contact?subject=enterprise">
            <button className="px-6 py-3 rounded-xl bg-[#1B2A4A] text-white hover:bg-[#121E36] transition-colors text-xs sm:text-sm font-semibold shrink-0 shadow-sm">
              Contact Enterprise Desk →
            </button>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
              <HelpCircle className="w-4 h-4" />
              <span>Chamber Guidance</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#5A607F]">
              Everything you need to know about our subscriptions, downloads, and billing.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-[#1B2A4A]/5"
                  >
                    <span className="font-heading font-bold text-base sm:text-lg text-[#1B2A4A]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A84C] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#1A1A2E]/80 leading-relaxed border-t border-[#1B2A4A]/5 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
