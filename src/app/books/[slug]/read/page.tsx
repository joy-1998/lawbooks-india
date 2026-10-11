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

interface ReaderPageProps {
  params: {
    slug: string;
  };
}

export default function BookReaderPage({ params }: ReaderPageProps) {
  const router = useRouter();
  const book = getBookBySlug(params.slug);
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

          {/* Download PDF button (only enabled/prominent after purchase) */}
          {isPurchased ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadPdf}
              leftIcon={<Download className="w-4 h-4" />}
              className="text-xs font-semibold shadow-sm"
            >
              Download PDF
            </Button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPaywallModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-[#C9A84C] border border-[#C9A84C]/40 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Full Access: ₹{book.price}</span>
            </button>
          )}
        </div>
      </header>

      {/* Success alert banner */}
      {purchaseSuccessMessage && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-center text-xs sm:text-sm font-medium shadow-md flex items-center justify-center gap-2 animate-in fade-in duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-200" />
          <span>{purchaseSuccessMessage}</span>
        </div>
      )}

      {/* Reader Body / Viewer Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start">
        {/* Reader Status Bar */}
        <div className="w-full max-w-3xl flex items-center justify-between mb-4 text-xs text-[#5A607F]">
          <div className="flex items-center gap-2">
            {!isPurchased ? (
              <Badge variant="warning" size="sm">
                Free Preview Mode (Pages 1–2)
              </Badge>
            ) : (
              <Badge variant="featured" size="sm">
                Verified Chamber Subscription
              </Badge>
            )}
          </div>

          <div className="font-mono font-semibold text-[#1B2A4A]">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Simulated Document Paper Page */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 w-full max-w-3xl relative bg-white shadow-2xl rounded-xl border border-gray-200 min-h-[750px] p-8 sm:p-14 flex flex-col justify-between overflow-hidden"
        >
          {/* Paper Header / Running Header */}
          <div className="border-b border-[#1B2A4A]/10 pb-4 mb-8 flex items-center justify-between text-[11px] text-[#5A607F]">
            <span className="font-heading uppercase tracking-widest font-semibold text-[#1B2A4A]">
              LexBooks Supreme Court Reporter
            </span>
            <span>{book.isbn}</span>
          </div>

          {/* Dynamic Page Content */}
          <div className={`space-y-6 flex-1 ${isCurrentPageGated ? 'filter blur-md select-none' : ''}`}>
            <div className="border-l-4 border-[#C9A84C] pl-4 space-y-1">
              <span className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase">
                {pageData.subtitle}
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1B2A4A]">
                {pageData.title}
              </h2>
            </div>

            {pageData.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2 pt-2">
                <h3 className="font-heading font-bold text-base text-[#1B2A4A] flex items-center gap-2">
                  <span className="text-[#C9A84C] font-mono text-sm">{sec.number}</span>
                  <span>{sec.heading}</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#1A1A2E]/85 whitespace-pre-line text-justify">
                  {sec.body}
                </p>
              </div>
            ))}

            {/* Additional realistic legal citation excerpt */}
            <div className="bg-[#FAFAF8] p-4 rounded-lg border border-[#1B2A4A]/10 text-xs text-[#5A607F] space-y-1 mt-6">
              <span className="font-bold text-[#1B2A4A]">Editorial Headnote / Citation Reference:</span>
              <p className="italic">
                See Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225; Maneka Gandhi v. Union of
                India (1978) 1 SCC 248; and K.S. Puttaswamy v. Union of India (2017) 10 SCC 1.
              </p>
            </div>
          </div>

          {/* Paywall Overlay if user reaches gated page without purchase */}
          {isCurrentPageGated && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-2xl bg-[#1B2A4A] text-[#C9A84C] flex items-center justify-center shadow-xl mb-5 animate-bounce">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B2A4A] mb-2">
                Unlock Full Legal Treatise
              </h3>
              <p className="text-sm text-[#5A607F] max-w-md mb-6 leading-relaxed">
                You have reached the end of the 2-page preview. Unlock all {book.pageCount} pages,
                courtroom citations, and offline reading.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowPaywallModal(true)}
                  className="w-full justify-center shadow-lg font-semibold"
                >
                  Unlock Treatise (₹{book.price})
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
                className="w-full mt-4 justify-center font-bold text-[#1B2A4A]"
              >
                Buy & Download PDF
              </Button>
            </div>
          </div>

          {/* Login prompt if not authenticated */}
          {!isAuthenticated ? (
            <div className="pt-4 border-t border-[#1B2A4A]/10 text-center space-y-2">
              <p className="text-xs text-[#5A607F]">
                Already have an institutional or bar chamber account?
              </p>
              <Link href={`/auth/login?redirect=/books/${book.slug}/read`}>
                <Button variant="ghost" size="sm" className="font-semibold text-xs">
                  Login to Access Account Purchases →
                </Button>
              </Link>
            </div>
          ) : (
            <div className="pt-2 text-center text-xs text-emerald-700 font-medium">
              Logged in as {user?.email}. Purchases sync directly to your dashboard.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
