import { Search } from 'lucide-react';
import type { ReactNode } from 'react';

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
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search guest, room or booking</span>
            <input aria-label="Search guest, room or booking" placeholder="Search guest, room or booking" />
          </label>
        )}
        {children}
      </div>
    </div>
  );
}
