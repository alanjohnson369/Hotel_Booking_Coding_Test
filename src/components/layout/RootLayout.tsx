import { Bell, CalendarDays, Hotel, UserCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { navConfig } from '@/config/navigation';

export type PageKey = 'dashboard' | 'check-in' | 'check-out' | 'booking';

export type PageKey = 'dashboard' | 'check-in' | 'check-out' | 'booking';

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
          {navConfig.map((link) => (
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
