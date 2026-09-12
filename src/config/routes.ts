import type { PageKey } from '@/components/layout';

export function getRoute(pathname: string): PageKey {
  if (pathname === '/check-in') return 'check-in';
  if (pathname === '/check-out') return 'check-out';
  if (pathname === '/booking') return 'booking';
  return 'dashboard';
}
