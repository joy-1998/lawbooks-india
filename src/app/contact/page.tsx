import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Chambers & Editorial Desk | LexBooks India',
  description:
    'Reach our editorial offices and customer support at Bhagwan Das Road, New Delhi, opposite the Supreme Court of India. Phone, email, and inquiry dispatch.',
};

export default function ContactPage() {
  return <ContactForm />;
}
