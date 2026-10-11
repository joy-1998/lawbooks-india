import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  Award,
  BookOpen,
  Users,
  ShieldCheck,
  CheckCircle2,
  Building,
  Target,
  HeartHandshake,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us | LexBooks India — Supreme Court Legal Library',
  description:
    'Founded by Supreme Court advocates with a mission to democratize Indian legal knowledge through authoritative digital treatises, commentaries, and research tools.',
};

export default function AboutPage() {
  const credentials = [
    {
      value: 'SCBA Registered',
      label: 'Supreme Court Bar Association Affiliation',
      icon: Scale,
    },
    {
      value: '75+ Combined Years',
      label: 'Of Courtroom & Appellate Practice',
      icon: Award,
    },
    {
      value: '10,000+ Precedents',
      label: 'Landmark Verdicts Catalogued & Annotated',
      icon: BookOpen,
    },
    {
      value: '50,000+ Counsel',
      label: 'Across High Courts & District Benches',
      icon: Users,
    },
  ];

  const team = [
    {
      name: 'Senior Advocate Arvind Narayan',
      role: 'Founding Chairman & Editorial Trustee',
      bio: 'Designated Senior Advocate with 38 years before the Supreme Court of India. Renowned constitutional jurist and author of landmark texts on fundamental rights.',
      initials: 'AN',
      avatarBg: 'bg-[#1B2A4A] text-[#C9A84C]',
    },
    {
      name: 'Justice (Retd.) Meera Nair',
      role: 'Chief Legal Editor & Judicial Counsel',
      bio: 'Former High Court Judge with distinguished service across civil and criminal trial divisions. Oversees editorial integrity and statutory alignment.',
      initials: 'MN',
      avatarBg: 'bg-[#2C4A6E] text-white',
    },
    {
      name: 'Karanvir Sengupta',
      role: 'Head of Technology & Digital Jurisprudence',
      bio: 'IIT Delhi alumnus and legal tech engineer. Pioneer in legal information retrieval architectures and cryptographic DRM solutions for courtroom tablets.',
      initials: 'KS',
      avatarBg: 'bg-[#C9A84C] text-[#1B2A4A]',
    },
    {
      name: 'Priyadarshini Deshpande',
      role: 'Head of Operations & Bar Partnerships',
      bio: 'Former Supreme Court Registrar legal consultant. Manages nationwide distribution across bar associations, state judicial academies, and university faculties.',
      initials: 'PD',
      avatarBg: 'bg-[#16223B] text-[#C9A84C]',
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence in Jurisprudence',
      description:
        'Every commentary undergoes rigorous peer verification by constitutional scholars and appellate practitioners to ensure unyielding doctrinal accuracy.',
    },
    {
      icon: ShieldCheck,
      title: 'Uncompromising Integrity',
      description:
        'We cite only official law reports and certified gazette texts. Our cross-references are free from bias, marketing compromise, or secondary distortions.',
    },
    {
      icon: HeartHandshake,
      title: 'Democratic Accessibility',
      description:
        'Legal knowledge must never be restricted to elite chambers. We ensure junior advocates, state trial counsels, and law students have equitable digital access.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 1. Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 text-[#1B2A4A] text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Preserving & Democratizing Indian Law</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1B2A4A] tracking-tight leading-tight">
            About LexBooks India
          </h1>

          <p className="text-base sm:text-lg text-[#5A607F] leading-relaxed max-w-2xl mx-auto">
            A collective of Supreme Court advocates, retired judges, and legal researchers dedicated to
            providing modern, authenticated legal treatises for the Indian legal fraternity.
          </p>
        </div>

        {/* 2. Credentials Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1B2A4A]/10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1B2A4A]/10">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div key={idx} className={`text-center px-4 ${idx > 0 ? 'pt-6 md:pt-0' : ''}`}>
                  <div className="inline-flex p-3 rounded-2xl bg-[#1B2A4A]/5 text-[#C9A84C] mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1B2A4A]">
                    {cred.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#5A607F] font-medium mt-1">
                    {cred.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
              Our Origin & Purpose
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A] leading-tight">
              Bridging Century-Old Legal Tradition with Modern Digital Research
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#1A1A2E]/80 leading-relaxed">
              <p>
                LexBooks India was established in the chamber corridors of Bhagwan Das Road, New Delhi,
                by a cohort of Supreme Court advocates. For decades, practicing advocates faced a stark
                dilemma: either carry multi-volume physical tomes into courtroom arguments, or navigate
                fragmented, unverified digital portals.
              </p>
              <p>
                Our mission is simple yet transformative: to democratize legal scholarship across every
                district court, high court, and apex bench in India. We combine the meticulous editorial
                standards of premier legal treatises with instantaneous, search-optimized reading software.
              </p>
              <p>
                With the historic advent of the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha
                Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA), our mission has become even more
                vital. LexBooks is at the forefront of providing side-by-side transition commentaries that
                equip trial counsels with instant clarity.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#1B2A4A] p-8 sm:p-12 text-white border-4 border-[#C9A84C]/30 space-y-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-[#C9A84C]" />
                <h3 className="font-heading font-bold text-2xl text-[#FAFAF8]">
                  Our Core Mission
                </h3>
              </div>
              <blockquote className="italic text-base sm:text-lg text-white/90 leading-relaxed">
                &ldquo;Justice is rendered inaccessible when the authoritative law remains locked behind
                impenetrable chamber walls. By delivering verified, affordable, and digitally accessible
                commentaries to every courtroom corner of the Republic, we strengthen the rule of law
                itself.&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
                <span>The LexBooks Editorial Charter</span>
                <span className="text-[#C9A84C] font-semibold">New Delhi • 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Values Section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
              Institutional Pillars
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A]">
              Our Guiding Principles
            </h2>
            <p className="text-sm text-[#5A607F]">
              The core tenets that guide every volume we publish and every digital annotation we curate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-[#1B2A4A]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1B2A4A]/5 text-[#C9A84C] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1B2A4A]">
                      {val.title}
                    </h3>
                    <p className="text-sm text-[#5A607F] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Team Section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
              Scholarly Leadership
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A]">
              Editorial Board & Leadership
            </h2>
            <p className="text-sm text-[#5A607F]">
              Guided by distinguished jurists, experienced appellate advocates, and modern software pioneers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#1B2A4A]/10 p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                {/* Simulated portrait avatar */}
                <div
                  className={`w-24 h-24 rounded-full ${member.avatarBg} flex items-center justify-center font-heading font-bold text-2xl shadow-inner mb-5 group-hover:scale-105 transition-transform`}
                >
                  {member.initials}
                </div>

                <h3 className="font-heading font-bold text-lg text-[#1B2A4A] group-hover:text-[#C9A84C] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#C9A84C] mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-[#5A607F] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CTA Join Section */}
        <div className="bg-[#1B2A4A] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#FAFAF8]">
              Join 50,000+ Legal Minds Across India
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Equip your chamber with the most reliable Supreme Court commentaries and digital resources today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/books">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold">
                  Browse Treatises
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10"
                >
                  Contact Chambers Desk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
