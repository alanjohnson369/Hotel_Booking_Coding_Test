# Raintech hotel — Hotel Management Dashboard

A polished, production-style hotel management interface built with **React**, **TypeScript**, and **Vite**.
It includes three full operational screens — a **Main Dashboard**, **Guest Check-in**, and **Guest Check-out** —
plus a lightweight **Book a Room** desk, all styled with a clean admin-panel aesthetic
(navy section headers, dense data tables, colour-coded room tiles).

> **Demo only.** Every screen runs on sample data held in React state.
> There is no backend, no authentication, and no persistence — refresh the page and everything resets.

---

## Screens

### Main Dashboard (`/dashboard`)

- Header row with hotel name, global search, date, and a **Quick Actions** button.
- Four **operational metric cards**: Occupancy %, Pending Check-ins, Pending Departures, Revenue Today.
- **12 quick-action tiles** with icons (Check-in, Check-out, Reservations, Housekeeping, Restaurant,
  Rooms, Staff, Floors, Reports, Settings, Group Booking, Maintenance).
- **Operational Overview** panel with an occupancy donut and a live room-count legend
  (Available / Occupied / Needs attention).
- **Room Status** floor view: 50 colour-coded room tiles across 5 floors
  (Available = green, Occupied = blue, Dirty = orange, Maintenance = red, Blocked = purple)
  with a legend and total-inventory summary.
- **Going to Vacate Rooms** cards showing departing guests with room, time, and balance.
- **Quick Room Status Changer** panel with housekeeping action buttons.
- All tiles are display-only; clicking a status action shows a brief confirmation toast.

### Guest Check-in (`/check-in`)

- **Step 1 — Select Booking & Guest**: search field, customer dropdown, booking date/time.
- **Step 2 — Review & Update Details**: room-number badge, rent, GST, guest name, adults/kids,
  checkout date, ID proof upload, additional charges, and action buttons.
- **Step 3 — Finalize Check-in & Payment** (side panel): live charge summary, total, amount paid,
  and action buttons (complete check-in, print, download folio).
- **Current Check-ins table** below: room, rent, GST, name, adults, kids, checkout, ID proof, actions.
- Editing any field updates the totals **in real time**; confirming shows a success toast and
  the form stays in sync with the selected guest.

### Guest Check-out (`/check-out`)

- **Column 1 — Identify Departing Guest**: search, guest selector, guest spotlight with room badge,
  and a stay-dates table with per-room check-out checkboxes.
- **Column 2 — Review & Finalize Bill**: per selected room — nights × rate, additional charges list
  (add Mini-bar, Laundry, or a custom item; remove any charge), room total, and a combined total
  across all selected rooms.
- **Column 3 — Payment & Check-out**: amount due, payment method, payment amount, process buttons,
  and invoice actions (print / email).
- Adding/removing charges and selecting/deselecting rooms **recalculates** room totals, the combined
  total, and the amount due live.

### Book a Room (`/booking`)

- A simple booking desk that lists all available rooms from the demo inventory.
- Clicking a room shows a confirmation toast.

---

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React 18                            |
| Language    | TypeScript 5                        |
| Build       | Vite 5                              |
| Styling     | Tailwind CSS + custom CSS tokens    |
| Icons       | lucide-react                        |
| Fonts       | DM Sans (body) / Manrope (headings) |

---

## Getting Started

### Prerequisites

- **Node.js 18+** and npm

### Install & Run

```bash
# clone the repo
git clone https://github.com/<your-username>/raintech-hotel.git
cd raintech-hotel

# install dependencies
npm install

# start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server                |
| `npm run build`     | Production build to `dist/`              |
| `npm run preview`   | Preview the production build locally     |
| `npm run typecheck`  | Run TypeScript type checking             |
| `npm run lint`       | Run ESLint                               |

---

## Project Structure

```
src/
  App.tsx                   — lightweight route switcher (no router library)
  main.tsx                  — React entry point
  index.css                 — design tokens + all component styles
  data/
    hotel.ts                — sample rooms, guests, charges, money helper
  routes/
    __root.tsx              — shared layout: top nav, page header, toast, helpers
    dashboard.tsx           — main dashboard + booking desk
    check-in.tsx            — guest check-in three-step flow
    check-out.tsx           — guest check-out three-column flow
```

### Design Tokens

All colours, spacing, and component styles are defined as CSS custom properties in `src/index.css`:

| Token       | Purpose                          |
| ----------- | -------------------------------- |
| `--navy-900` | Section headers, primary buttons |
| `--blue-500` | Accents, active nav, links       |
| `--green`    | Available rooms, positive deltas |
| `--orange`   | Dirty rooms, pending states      |
| `--red`      | Maintenance, destructive actions |
| `--purple`   | Blocked rooms                    |
| `--cream`    | Page background                  |
| `--paper`    | Card / panel background          |

No colours are hardcoded in components — everything references these tokens.

---

## Room Status Colour Key

| Status        | Colour  | Description                          |
| ------------- | ------- | ------------------------------------ |
| Available     | Green   | Ready for a new guest                |
| Occupied      | Blue    | Currently in use                     |
| Dirty         | Orange  | Needs housekeeping                   |
| Maintenance   | Red     | Under repair                         |
| Blocked       | Purple  | Out of service / reserved            |

---

## Key Design Decisions

- **No router library** — navigation uses a simple `window.location.pathname` check in `App.tsx`,
  keeping the bundle small and the code easy to follow.
- **No external state management** — each page manages its own state with `useState` / `useMemo`.
- **Shared helpers in `__root.tsx`** — `PanelTitle`, `Field`, `PageHeader`, and `Toast` are defined
  once and reused across check-in and check-out, avoiding duplication.
- **CSS tokens, not Tailwind utilities for core colours** — the admin-panel aesthetic
  (navy headers, status colours, panel borders) lives in `index.css` as semantic tokens so
  components stay clean and the palette is easy to re-theme.

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Responsive down to mobile (480px).

---

## License

This project is open source and available under the **MIT License**.

---

## Acknowledgements

- [lucide-react](https://lucide.dev) for the icon set
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) & [Manrope](https://fonts.google.com/specimen/Manrope) from Google Fonts
- Built with [Vite](https://vitejs.dev)
