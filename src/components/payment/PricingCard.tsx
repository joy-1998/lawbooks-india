'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number | string;
  billingPeriod?: string;
  isPopular?: boolean;
  features: string[];
  ctaText?: string;
  ctaHref?: string;
}

export interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: (plan: PricingPlan) => void;
  isLoading?: boolean;
}

export function PricingCard({ plan, onSelect, isLoading = false }: PricingCardProps) {
  const isFeatured = plan.isPopular;

  const handleCtaClick = () => {
    if (onSelect) {
      onSelect(plan);
    }
  };

  const formattedPrice =
    typeof plan.price === 'number'
      ? `₹${plan.price.toLocaleString('en-IN')}`
      : plan.price;

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
        isFeatured
          ? 'bg-white border-2 border-[#C9A84C] shadow-2xl ring-4 ring-[#C9A84C]/20 scale-105 z-10'
          : 'bg-white/90 border border-[#1B2A4A]/10 shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Popular / Recommended Badge */}
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge
            variant="featured"
            size="md"
            icon={<Sparkles className="w-3.5 h-3.5 text-[#1B2A4A]" />}
            className="px-4 py-1 font-bold shadow-md uppercase tracking-wider"
          >
            Most Popular For Chambers
          </Badge>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3 className="font-heading font-bold text-2xl text-[#1B2A4A]">
          {plan.name}
        </h3>
        <p className="text-xs text-[#5A607F] mt-1.5 leading-relaxed">
          {plan.tagline}
        </p>
      </div>

      {/* Pricing Display */}
      <div className="mb-6 pb-6 border-b border-[#1B2A4A]/10">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            {formattedPrice}
          </span>
          {plan.billingPeriod && (
            <span className="text-sm font-medium text-[#5A607F]">
              {plan.billingPeriod}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#5A607F] mt-1">
          Exclusive of applicable GST (18%)
        </p>
      </div>

      {/* Feature List */}
      <div className="flex-1 space-y-3.5 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A]/70">
          Included Privileges:
        </p>
        <ul className="space-y-3 text-sm text-[#1A1A2E]/85">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                  isFeatured
                    ? 'bg-[#C9A84C]/20 text-[#1B2A4A]'
                    : 'bg-[#1B2A4A]/10 text-[#1B2A4A]'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="leading-snug text-xs sm:text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        {plan.ctaHref ? (
          <Link href={plan.ctaHref} className="block w-full">
            <Button
              variant={isFeatured ? 'secondary' : 'primary'}
              size="lg"
              className="w-full justify-center shadow-md font-semibold"
              onClick={handleCtaClick}
              isLoading={isLoading}
            >
              {plan.ctaText || 'Subscribe Now'}
            </Button>
          </Link>
        ) : (
          <Button
            variant={isFeatured ? 'secondary' : 'primary'}
            size="lg"
            className="w-full justify-center shadow-md font-semibold"
            onClick={handleCtaClick}
            isLoading={isLoading}
          >
            {plan.ctaText || 'Subscribe Now'}
          </Button>
        )}

        <p className="text-center text-[11px] text-[#5A607F] mt-3">
          Instant digital activation • Cancel anytime
        </p>
      </div>
    </div>
  );
}

export default PricingCard;
