import type { ReactNode } from 'react';

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
