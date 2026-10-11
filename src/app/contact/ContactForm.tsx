'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building2,
  AlertCircle,
  Scale,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all mandatory fields (Name, Email, Message).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid chamber or personal email address.');
      return;
    }

    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 text-[#1B2A4A] text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Supreme Court Chambers Desk</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#1B2A4A] tracking-tight">
            Contact LexBooks India
          </h1>
          <p className="text-base sm:text-lg text-[#5A607F] leading-relaxed">
            Have questions about institutional subscriptions, manuscript submissions, or legal treatise bulk orders? Our editorial and chamber desks are here to assist.
          </p>
        </div>

        {/* Content Grid: Form on Left/Right & Info on Other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#1B2A4A]/10 shadow-sm space-y-6">
              <h2 className="font-heading font-bold text-2xl text-[#1B2A4A]">
                Chamber Information
              </h2>
              <p className="text-sm text-[#5A607F] leading-relaxed">
                Located in close proximity to the Supreme Court of India, our liaison office accommodates visiting advocates, judicial scholars, and bar delegations.
              </p>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/5 text-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1B2A4A]">Editorial Chambers</h3>
                    <p className="text-xs text-[#5A607F] mt-1 leading-relaxed">
                      Chamber Block IV, Bhagwan Das Road,
                      <br />
                      Opposite Supreme Court of India,
                      <br />
                      New Delhi, Delhi 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/5 text-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1B2A4A]">Chamber Direct Lines</h3>
                    <p className="text-xs text-[#5A607F] mt-1">
                      +91 (011) 2338-7654 / +91 98110 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/5 text-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1B2A4A]">Electronic Mail</h3>
                    <p className="text-xs text-[#5A607F] mt-1">
                      chambers@lexbooks.in • editor@lexbooks.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/5 text-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1B2A4A]">Chamber Hours</h3>
                    <p className="text-xs text-[#5A607F] mt-1 leading-relaxed">
                      Monday to Friday: 9:00 AM – 7:30 PM
                      <br />
                      Saturday: 10:00 AM – 4:00 PM (Court recess)
                      <br />
                      Sunday: Closed (Emergency SLP helpline available)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="relative rounded-3xl overflow-hidden border border-[#1B2A4A]/10 shadow-sm h-64 bg-slate-900 group">
              {/* Styled map aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] via-[#1F335A] to-[#0A1324] opacity-90 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C9A84C]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
                      Bhagwan Das Road • New Delhi
                    </span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80">
                    28.6219° N, 77.2395° E
                  </span>
                </div>

                <div className="text-center space-y-1 my-auto">
                  <MapPin className="w-8 h-8 text-[#C9A84C] mx-auto animate-bounce" />
                  <p className="font-heading font-bold text-base text-[#FAFAF8]">
                    Opposite Supreme Court of India
                  </p>
                  <p className="text-xs text-white/70">
                    Adjacent to Supreme Court Metro Station (Gate 2)
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/50 border-t border-white/10 pt-2">
                  <span>Interactive Map Preview</span>
                  <a
                    href="https://maps.google.com/?q=Supreme+Court+of+India+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A84C] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1B2A4A]/10 shadow-sm space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B2A4A]">
                  Transmit an Inquiry
                </h2>
                <p className="text-sm text-[#5A607F] mt-1">
                  Our chamber editorial team typically responds within 4 business hours.
                </p>
              </div>

              {isSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Message Transmitted Successfully</h4>
                    <p className="text-xs mt-1 text-emerald-700 leading-relaxed">
                      Thank you for contacting LexBooks India. A liaison officer has been assigned to your reference and will connect with your chamber shortly.
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-center gap-3 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name / Designation *"
                    name="name"
                    placeholder="e.g. Adv. Vikramaditya Rao"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Official Email Address *"
                    name="email"
                    type="email"
                    placeholder="counsel@chamber.law"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Mobile / Chamber Phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5">
                      Inquiry Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-[#1B2A4A]/20 rounded-xl text-sm text-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                    >
                      <option value="General Inquiry">General Chamber Inquiry</option>
                      <option value="Institutional Subscription">Institutional & College Access</option>
                      <option value="Manuscript Submission">Author & Manuscript Submission</option>
                      <option value="Bulk Order">Bar Association Bulk Hardbound Order</option>
                      <option value="Technical Support">Digital Reader & Offline Sync Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B2A4A] mb-1.5">
                    Detailed Message / Chamber Requirements *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify your query, citation references, or team size requirements..."
                    required
                    className="w-full px-4 py-3 bg-white border border-[#1B2A4A]/20 rounded-xl text-sm text-[#1B2A4A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto px-8 font-semibold shadow-md"
                >
                  Transmit Chamber Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
