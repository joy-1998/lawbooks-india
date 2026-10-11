declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata?: Record<string, unknown>;
  };
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
  close?: () => void;
}

export interface PaymentInitiationOptions {
  amount: number; // In INR (rupees)
  bookTitle: string;
  orderId?: string;
  bookId?: string | number;
  userName?: string;
  userEmail?: string;
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onFailure?: (error: RazorpayFailureResponse | Error) => void;
}

export interface OrderDetails {
  id: string;
  amount: number; // In paise
  currency: string;
}

export const RAZORPAY_DEMO_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_DEMO';

/**
 * Dynamically loads the Razorpay checkout script if not already available in the DOM.
 */
export async function loadRazorpay(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      console.warn('Failed to load Razorpay checkout script');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

/**
 * Mock order creation returning order details compatible with Razorpay standard checkout.
 */
export async function createOrder(
  bookId: string | number,
  amount: number
): Promise<OrderDetails> {
  // In production, this would call /api/orders on backend
  const randomSuffix = Math.random().toString(36).substring(2, 9).toUpperCase();
  const orderId = `order_${bookId}_${randomSuffix}`;

  return {
    id: orderId,
    amount: Math.round(amount * 100), // convert to paise
    currency: 'INR',
  };
}

/**
 * Initiates Razorpay checkout workflow supporting UPI, Cards, Netbanking, & Wallets.
 */
export async function initiatePayment(options: PaymentInitiationOptions): Promise<void> {
  const { amount, bookTitle, orderId, onSuccess, onFailure, userName, userEmail } = options;

  const isScriptLoaded = await loadRazorpay();

  if (!isScriptLoaded || !window.Razorpay) {
    // If external script is blocked or offline in dev/test, fallback gracefully with simulated success
    console.info(
      'Razorpay script unreachable or demo mode active. Triggering simulated checkout flow.'
    );

    const isConfirmed =
      typeof window !== 'undefined'
        ? window.confirm(
            `[LexBooks Demo Payment]\n\nBook: "${bookTitle}"\nAmount: ₹${amount.toLocaleString(
              'en-IN'
            )}\n\nSimulate successful payment via UPI / Netbanking?`
          )
        : true;

    if (isConfirmed) {
      setTimeout(() => {
        onSuccess({
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_order_id: orderId || `order_demo_${Date.now()}`,
          razorpay_signature: 'demo_signature_hash',
        });
      }, 300);
    } else {
      onFailure?.(new Error('Payment was cancelled by the user'));
    }
    return;
  }

  const rzpOptions: RazorpayCheckoutOptions = {
    key: RAZORPAY_DEMO_KEY,
    amount: Math.round(amount * 100),
    currency: 'INR',
    name: 'LexBooks India',
    description: `Purchase: ${bookTitle}`,
    image: '/brand/logo.png',
    order_id: orderId,
    handler: (response: RazorpaySuccessResponse) => {
      onSuccess(response);
    },
    prefill: {
      name: userName || 'Legal Advocate',
      email: userEmail || 'advocate@lexbooks.in',
    },
    notes: {
      platform: 'LexBooks India',
      product: bookTitle,
    },
    theme: {
      color: '#1B2A4A', // Primary Navy
    },
    modal: {
      ondismiss: () => {
        if (onFailure) {
          onFailure({
            error: {
              code: 'PAYMENT_CANCELLED',
              description: 'Payment popup was closed by user',
              source: 'customer',
              step: 'modal_dismiss',
              reason: 'cancelled',
            },
          });
        }
      },
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(rzpOptions);

    razorpayInstance.on('payment.failed', (response: RazorpayFailureResponse) => {
      if (onFailure) {
        onFailure(response);
      }
    });

    razorpayInstance.open();
  } catch (error) {
    console.error('Error invoking Razorpay checkout:', error);
    if (onFailure) {
      onFailure(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
