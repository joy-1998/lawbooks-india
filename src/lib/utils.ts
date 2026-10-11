/**
 * Format a number into Indian Rupee currency format (₹X,XXX or ₹X,XX,XXX)
 */
export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

/**
 * Utility to conditionally merge class names
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const item of classes) {
    if (!item) continue;

    if (typeof item === 'string' || typeof item === 'number') {
      result.push(String(item));
    } else if (Array.isArray(item)) {
      const nested = cn(...item);
      if (nested) result.push(nested);
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(item)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(' ');
}

/**
 * Truncate a text string gracefully at a given character limit with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '...';
}

/**
 * Generate a URL-friendly slug from an input string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
