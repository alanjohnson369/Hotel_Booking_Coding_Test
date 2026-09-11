import { Bell, CalendarDays, Hotel, Search, UserCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export type PageKey = 'dashboard' | 'check-in' | 'check-out' | 'booking';

const links: { key: PageKey; label: string; href: string }[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'check-in', label: 'Check-in', href: '/check-in' },
  { key: 'check-out', label: 'Check-out', href: '/check-out' },
  { key: 'booking', label: 'Book a Room', href: '/booking' },
];

export function RootLayout({ active, children }: { active: PageKey; children: ReactNode }) {
  return <div className="app-shell"><header className="topbar"><a className="brand" href="/dashboard"><span className="brand-mark"><Hotel size={18} /></span><span>Harborview <b>Hotel</b></span></a><nav>{links.map((link) => <a className={active === link.key ? 'active' : ''} href={link.href} key={link.key}>{link.label}</a>)}</nav><div className="top-actions"><div className="top-date"><CalendarDays size={15} /> Tue, 02 Apr 2026</div><button className="icon-button" aria-label="Notifications"><Bell size={17} /></button><button className="profile"><UserCircle size={22} /><span>Admin</span></button></div></header><main>{children}</main></div>;
}

export function PageHeader({ title, subtitle, search = true, children }: { title: string; subtitle: string; search?: boolean; children?: ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">Harborview Hotel / Operations</div><h1>{title}</h1><p>{subtitle}</p></div><div className="header-tools">{search && <label className="global-search"><Search size={17} /><input placeholder="Search guest, room or booking" /></label>}{children}</div></div>;
}

export function Toast({ message }: { message: string }) { return <div className="toast"><span className="toast-dot" />{message}</div>; }
