import type { PageKey } from '@/components/layout';

export const navConfig: { key: PageKey; label: string; href: string }[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'check-in', label: 'Check-in', href: '/check-in' },
  { key: 'check-out', label: 'Check-out', href: '/check-out' },
  { key: 'booking', label: 'Book a Room', href: '/booking' },
];
