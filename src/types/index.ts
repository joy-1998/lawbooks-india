export type BookCategory =
  | 'Constitutional Law'
  | 'Criminal Law & IPC'
  | 'Civil Procedure'
  | 'Corporate & Commercial Law'
  | 'Taxation & GST'
  | 'Intellectual Property'
  | 'Family & Succession Law'
  | 'Environmental Law'
  | 'Supreme Court Practice'
  | 'Legal Drafting & Conveyancing';

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  longDescription: string;
  category: BookCategory | string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  pageCount: number;
  publishedYear: number;
  isbn: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  previewPages: number;
  tableOfContents?: string[];
  edition?: string;
  publisher?: string;
  samplePdfUrl?: string;
}

export type SubscriptionPlan = 'basic' | 'pro' | 'institutional';
export type SubscriptionStatus = 'active' | 'expired' | 'trialing' | 'cancelled';

export interface Subscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  expiresAt: string;
  startedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  purchasedBooks: string[]; // Book IDs
  subscription?: Subscription;
}

export interface PaymentOrder {
  id: string;
  bookId?: string;
  planId?: SubscriptionPlan;
  amount: number;
  currency: string;
  status: 'created' | 'attempted' | 'paid' | 'failed';
  receipt?: string;
  createdAt?: string;
}
