'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Lock,
  BookOpen,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  FileText,
  Bookmark,
  Share2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { getBookBySlug } from '@/lib/books-data';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';

interface BookReaderClientProps {
  slug: string;
}

export default function BookReaderClient({ slug }: BookReaderClientProps) {
  const router = useRouter();
  const book = getBookBySlug(slug);
  const { user, isAuthenticated, hasPurchased, purchaseBook } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showPaywallModal, setShowPaywallModal] = useState<boolean>(false);
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  // Check purchase status by id or slug
  const isPurchased = useMemo(() => {
    if (!book) return false;
    return hasPurchased(book.id) || hasPurchased(book.slug);
  }, [book, hasPurchased]);

  // Total simulated pages in this reader preview/full version
  const totalPages = book ? Math.min(book.pageCount, 12) : 10;

  if (!book) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-[#1B2A4A]/10 text-center max-w-md shadow-sm">
          <BookOpen className="w-12 h-12 text-[#1B2A4A]/40 mx-auto mb-4" />
          <h2 className="font-heading font-bold text-xl text-[#1B2A4A] mb-2">
            Treatise Not Found
          </h2>
          <p className="text-sm text-[#5A607F] mb-6">
            The commentary you are trying to read is unavailable.
          </p>
          <Link href="/books">
            <Button variant="primary" size="sm">
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle page navigation
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) return;

    if (nextPage > 2 && !isPurchased) {
      setCurrentPage(nextPage);
      setShowPaywallModal(true);
    } else {
      setCurrentPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    if (pageNumber > 2 && !isPurchased) {
      setCurrentPage(pageNumber);
      setShowPaywallModal(true);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  // Simulated purchase action
  const handleCompletePurchase = (withPdfDownload: boolean = false) => {
    purchaseBook(book.id);
    purchaseBook(book.slug);
    setShowPaywallModal(false);
    setPurchaseSuccessMessage(
      withPdfDownload
        ? `Order confirmed! Full treatise unlocked and DRM-free PDF ready.`
        : `Order confirmed! Full online access unlocked for your account.`
    );
    setTimeout(() => {
      setPurchaseSuccessMessage(null);
    }, 5000);
  };

  // Mock download PDF
  const handleDownloadPdf = () => {
    if (!isPurchased) {
      setShowPaywallModal(true);
      return;
    }
    // Simulate instant download trigger
    const blob = new Blob([`${book.title}\nAuthor: ${book.author}\n\n${book.longDescription}`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.slug}-lexbooks-authenticated.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isCurrentPageGated = currentPage > 2 && !isPurchased;

  // Mock content generation for simulated pages based on book metadata
  const getPageContent = (page: number) => {
    switch (page) {
      case 1:
        return {
          title: `CHAPTER I — PRELIMINARY STATUTORY SCHEME`,
          subtitle: `Jurisprudential Foundations & Constitutional Mandate`,
          sections: [
            {
              number: '§ 1.01',
              heading: 'Historical Origin & The Constituent Intent',
              body: `The legislative evolution of this treatise reflects over seven decades of constitutional adjudication before the Supreme Court of India. When examining the core statutory provisions, the court has consistently maintained that procedural canons must subserve substantive justice.\n\nAs held in landmark constitutional benches, where statutory ambiguity persists, interpretation leans towards fundamental liberties enshrined under Articles 14, 19, and 21 of the Constitution of India.`,
            },
            {
              number: '§ 1.02',
              heading: 'Harmonious Construction with Contemporary Judicial Precedents',
              body: `Every statutory clause discussed herein operates under the doctrine of harmonious construction. Subordinate legislation cannot override primary legislative enactments, nor can executive notifications curtail rights crystallized by judicial decrees.`,
            },
          ],
        };
      case 2:
        return {
          title: `CHAPTER II — ESSENTIAL INGREDIENTS & BURDEN OF PROOF`,
          subtitle: `Procedural Protocols, Inferences & Trial Dynamics`,
          sections: [
            {
              number: '§ 2.01',
              heading: 'Evidentiary Thresholds in Apex Court Jurisprudence',
              body: `The standard of proof required under Indian practice depends fundamentally on the civil or criminal nature of the proceedings. In civil dispute resolutions, a preponderance of probabilities suffices, whereas criminal determinations demand proof beyond reasonable doubt, subject to statutory reverse-burden clauses.\n\nParticular reference must be made to Section 106 of the Evidence Act / Bharatiya Sakshya Adhiniyam, regarding facts especially within individual knowledge.`,
            },
            {
              number: '§ 2.02',
              heading: 'Pleadings, Caveats & Preliminary Objections',
              body: `Courts have repeatedly admonished litigants who raise belated jurisdictional objections. Under established procedural doctrine, preliminary objections touching subject-matter competence must be pleaded at the earliest instance.`,
            },
          ],
        };
      case 3:
        return {
          title: `CHAPTER III — ADVANCED COURTROOM APPLICATION & RATIO DECIDENDI`,
          subtitle: `Supreme Court Landmark Verdicts & Case Digest`,
          sections: [
            {
              number: '§ 3.01',
              heading: 'Binding Force of Precedent under Article 141',
              body: `The law declared by the Supreme Court is binding on all courts within the territory of India. However, the doctrine of per incuriam and sub silentio provides trial counsels with critical pathways when distinguishing contradictory bench determinations.`,
            },
            {
              number: '§ 3.02',
              heading: 'Interim Injunctions & Irreparable Injury Standards',
              body: `The tripartite test: prima facie case, balance of convenience, and irreparable injury. Discretionary powers under Order XXXIX cannot be invoked mechanically without an express finding on economic or reputation injury.`,
            },
          ],
        };
      default:
        return {
          title: `CHAPTER ${page} — LITIGATION MASTERCLASS & TRIAL PRACTICE`,
          subtitle: `Exhaustive Commentary & Practical Chambers Formats`,
          sections: [
            {
              number: `§ ${page}.01`,
              heading: 'Appellate Grounds & Curative Jurisdiction',
              body: `Comprehensive breakdown of grounds accepted under Special Leave Petitions (SLPs) and the narrow parameters of curative jurisdiction established in Rupa Ashok Hurra v. Ashok Hurra.`,
            },
            {
              number: `§ ${page}.02`,
              heading: 'Drafting Guidelines for Chambers',
              body: `Detailed analysis of affidavits, verified statements, and modern digital filing formats required by registry benches.`,
            },
          ],
        };
    }
  };

  const pageData = getPageContent(currentPage);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col selection:bg-[#C9A84C] selection:text-[#1B2A4A]">
      {/* Top Reading Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#1B2A4A] text-white shadow-md border-b border-[#C9A84C]/30 px-4 py-3 flex items-center justify-between">
        {/* Left: Back and Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`/books/${book.slug}`)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            title="Back to Treatise Overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="overflow-hidden">
            <h1 className="font-heading font-bold text-sm sm:text-base text-[#FAFAF8] truncate max-w-xs sm:max-w-md md:max-w-xl">
              {book.title}
            </h1>
            <p className="text-[11px] text-[#C9A84C] truncate">
              {book.author} • {book.category}
            </p>
          </div>
        </div>

        {/* Center / Right: Actions & Page Counter */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
              aria-label="Zoom Out"
              className="p-1 text-white/70 hover:text-white"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono text-[11px]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              aria-label="Zoom In"
              className="p-1 text-white/70 hover:text-white"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download PDF button */}
          {isPurchased ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadPdf}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download PDF
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPaywallModal(true)}
              leftIcon={<Lock className="w-3.5 h-3.5 text-[#C9A84C]" />}
              className="border-[#C9A84C]/50 text-[#FAFAF8] hover:bg-white/10"
            >
              Unlock Book
            </Button>
          )}
        </div>
      </header>

      {/* Success Notification Banner */}
      {purchaseSuccessMessage && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs text-center font-medium shadow flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{purchaseSuccessMessage}</span>
        </div>
      )}

      {/* Main Reading Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center">
        {/* Paper Document Container */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className={`w-full max-w-3xl bg-white rounded-xl shadow-xl border border-[#1B2A4A]/10 p-6 sm:p-10 md:p-14 relative transition-transform duration-150 ${
            isCurrentPageGated ? 'select-none overflow-hidden max-h-[680px]' : ''
          }`}
        >
          {/* Running Head */}
          <div className="border-b border-[#1B2A4A]/10 pb-4 mb-8 flex items-center justify-between text-xs text-[#5A607F]">
            <span className="font-serif italic tracking-wide">
              Supreme Court Practice & Jurisprudence Series
            </span>
            <span className="font-mono">{book.isbn}</span>
          </div>

          {/* Page Badge Status */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest">
              {pageData.subtitle}
            </span>
            <div className="flex items-center gap-2">
              {!isPurchased ? (
                <Badge variant="warning" size="sm">
                  Free Preview Mode (Pages 1–2)
                </Badge>
              ) : (
                <Badge variant="featured" size="sm">
                  Full Authenticated Access
                </Badge>
              )}
            </div>
          </div>

          {/* Chapter Title */}
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1B2A4A] mb-8 pb-3 border-b-2 border-[#C9A84C]/40">
            {pageData.title}
          </h2>

          {/* Page Body Content */}
          <div className={`space-y-6 ${isCurrentPageGated ? 'filter blur-md opacity-40' : ''}`}>
            {pageData.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#1B2A4A] flex items-center gap-2">
                  <span className="text-[#C9A84C] font-mono text-sm">{sec.number}</span>
                  <span>{sec.heading}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#1A1A2E]/90 leading-relaxed font-serif text-justify whitespace-pre-line">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Paywall Overlay Gate (Page 3+) */}
          {isCurrentPageGated && (
            <div className="absolute inset-0 bg-[#FAFAF8]/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-full bg-[#1B2A4A] text-[#C9A84C] flex items-center justify-center mb-4 shadow-lg ring-4 ring-[#C9A84C]/20">
                <Lock className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                Preview Limit Reached
              </span>
              <h3 className="font-heading font-bold text-2xl text-[#1B2A4A] mb-2">
                Unlock Complete Legal Treatise
              </h3>
              <p className="text-sm text-[#5A607F] max-w-md mb-6 leading-relaxed">
                You have reached the end of the free 2-page preview for{' '}
                <strong className="text-[#1B2A4A]">{book.title}</strong>. Choose an option to
                continue reading in high resolution or download the PDF for chamber use.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowPaywallModal(true)}
                  className="w-full justify-center shadow-md"
                >
                  View Purchase Options (From ₹{book.price.toLocaleString('en-IN')})
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentPage(2)}
                  className="w-full justify-center"
                >
                  Back to Page 2
                </Button>
              </div>
            </div>
          )}

          {/* Paper Footer / Page Number */}
          <div className="border-t border-[#1B2A4A]/10 pt-4 mt-8 flex items-center justify-between text-[11px] text-[#5A607F]">
            <span>{book.title}</span>
            <span className="font-mono font-semibold">Page {currentPage}</span>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Page Controller */}
      <footer className="sticky bottom-0 z-30 bg-white border-t border-[#1B2A4A]/15 py-3 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          {/* Quick Page Picker Pill */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-sm px-2">
            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              const isSelected = p === currentPage;
              const isLocked = p > 2 && !isPurchased;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageSelect(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#1B2A4A] text-white shadow-sm'
                      : isLocked
                      ? 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      : 'bg-gray-100 text-[#1B2A4A] hover:bg-gray-200'
                  }`}
                  title={isLocked ? `Page ${p} (Locked)` : `Page ${p}`}
                >
                  {isLocked ? <Lock className="w-3 h-3 text-amber-600" /> : p}
                </button>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>
      </footer>

      {/* Paywall Modal */}
      <Modal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        title="Unlock Full Legal Treatise"
        description="Choose your preferred access tier for instant chamber and courtroom usage."
        maxWidth="lg"
      >
        <div className="space-y-6 pt-2">
          {/* Book Summary Card in Modal */}
          <div className="bg-[#1B2A4A]/5 p-4 rounded-xl border border-[#1B2A4A]/10 flex items-center justify-between">
            <div>
              <h4 className="font-heading font-bold text-sm text-[#1B2A4A]">{book.title}</h4>
              <p className="text-xs text-[#5A607F]">{book.author} • {book.pageCount} Pages</p>
            </div>
            <div className="font-bold text-lg text-[#1B2A4A]">
              ₹{book.price.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: Online Only */}
            <div className="border-2 border-[#1B2A4A]/20 hover:border-[#1B2A4A] rounded-2xl p-4 flex flex-col justify-between transition-all bg-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">
                  Option 1
                </span>
                <h4 className="font-heading font-bold text-base text-[#1B2A4A] mt-1">
                  Buy & Read Online
                </h4>
                <p className="text-xs text-[#5A607F] mt-1 leading-relaxed">
                  Unlimited digital reading in any modern browser across 2 devices.
                </p>
                <div className="mt-3 text-2xl font-extrabold text-[#1B2A4A]">
                  ₹{book.price.toLocaleString('en-IN')}
                </div>
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => handleCompletePurchase(false)}
                className="w-full mt-4 justify-center"
              >
                Buy & Read Online
              </Button>
            </div>

            {/* Option 2: Online + Download PDF */}
            <div className="border-2 border-[#C9A84C] bg-[#FAFAF8] rounded-2xl p-4 flex flex-col justify-between transition-all relative shadow-md">
              <div className="absolute -top-3 right-4">
                <span className="bg-[#C9A84C] text-[#1B2A4A] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                  Recommended
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                  Option 2
                </span>
                <h4 className="font-heading font-bold text-base text-[#1B2A4A] mt-1">
                  Buy & Download PDF
                </h4>
                <p className="text-xs text-[#5A607F] mt-1 leading-relaxed">
                  Full online reading + permanent DRM-free PDF for offline courtroom briefs.
                </p>
                <div className="mt-3 text-2xl font-extrabold text-[#1B2A4A]">
                  ₹{(book.price + 100).toLocaleString('en-IN')}
                </div>
              </div>
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleCompletePurchase(true)}
                className="w-full mt-4 justify-center shadow"
              >
                Buy & Download PDF
              </Button>
            </div>
          </div>

          {/* Subscription Upsell Box */}
          <div className="bg-[#1B2A4A] text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <div className="flex items-center gap-1.5 text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unlimited Chamber Access</span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Get access to all 500+ Supreme Court treatises starting at ₹499/mo.
              </p>
            </div>
            <Link href="/pricing" onClick={() => setShowPaywallModal(false)}>
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                View Plans
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-[#5A607F] pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Razorpay Verified</span>
            </span>
            <span>•</span>
            <span>Instant Digital Unlocking</span>
            <span>•</span>
            <span>24/7 Chamber Support</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
