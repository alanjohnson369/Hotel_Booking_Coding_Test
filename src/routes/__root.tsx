import { Bell, CalendarDays, Hotel, Search, UserCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export type PageKey = 'dashboard' | 'check-in' | 'check-out' | 'booking';

const navLinks: { key: PageKey; label: string; href: string }[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'check-in', label: 'Check-in', href: '/check-in' },
  { key: 'check-out', label: 'Check-out', href: '/check-out' },
  { key: 'booking', label: 'Book a Room', href: '/booking' },
];

type RootLayoutProps = {
  active: PageKey;
  children: ReactNode;
};

export function RootLayout({ active, children }: RootLayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/dashboard">
          <span className="brand-mark">
            <Hotel size={18} />
          </span>
          <span>
            Raintech <b>hotel</b>
          </span>
        </a>

        <nav>
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={active === link.key ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="top-actions">
          <div className="top-date">
            <CalendarDays size={15} /> Tue, 02 Apr 2026
          </div>
          <button className="icon-button" aria-label="Notifications">
            <Bell size={17} />
          </button>
          <button className="profile">
            <UserCircle size={22} />
            <span>Admin</span>
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

type PageHeaderProps = {
  title: string;
  subtitle: string;
  search?: boolean;
  children?: ReactNode;
};

export function PageHeader({ title, subtitle, search = true, children }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-tools">
        {search && (
          <label className="global-search">
            <Search size={17} />
            <input placeholder="Search guest, room or booking" />
          </label>
        )}
        {children}
      </div>
    </div>
  );
}

export function Toast({ message }: { message: string }) {
  return (
    <div className="toast">
      <span className="toast-dot" />
      {message}
    </div>
  );
}

export function PanelTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="panel-title">
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
