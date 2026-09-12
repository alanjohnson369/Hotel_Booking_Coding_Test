import { useState } from 'react';
import {
  ArrowUpRight, BedDouble, CalendarCheck, ChevronRight, ClipboardCheck,
  DoorOpen, FileBarChart, Grid2X2, Hammer, KeyRound, Plus, Search,
  Settings, ShoppingBag, Users, Wrench,
} from 'lucide-react';
import { money } from '@/data/format';
import { rooms, statusLabels } from '@/data/fixtures';
import type { RoomStatus } from '@/data/types';
import { PageHeader, Toast } from '@/components/layout';

const quickActions = [
  { label: 'Check-in', icon: DoorOpen, href: '/check-in' },
  { label: 'Check-out', icon: KeyRound, href: '/check-out' },
  { label: 'Reservations', icon: CalendarCheck, href: '#' },
  { label: 'Housekeeping', icon: Wrench, href: '#' },
  { label: 'Restaurant', icon: ShoppingBag, href: '#' },
  { label: 'Rooms', icon: BedDouble, href: '#' },
  { label: 'Staff', icon: Users, href: '#' },
  { label: 'Floors', icon: Grid2X2, href: '#' },
  { label: 'Reports', icon: FileBarChart, href: '#' },
  { label: 'Settings', icon: Settings, href: '#' },
  { label: 'Group Booking', icon: ClipboardCheck, href: '#' },
  { label: 'Maintenance', icon: Hammer, href: '#' },
] as const;

const metrics = [
  { label: 'Occupancy', value: '68%', change: '+4.2%', note: 'vs yesterday', tone: 'occupancy' },
  { label: 'Pending check-ins', value: '08', change: '03', note: 'arriving today', tone: 'pending' },
  { label: 'Pending departures', value: '06', change: '02', note: 'due before 12 PM', tone: 'pending' },
  { label: 'Revenue today', value: money(48600), change: '+12.8%', note: 'vs last Tuesday', tone: 'revenue' },
];

const vacateRooms = [
  { initials: 'MH', name: 'Mathew Hyden', room: '101', time: '12:00 PM', amount: 2400, color: 'coral' },
  { initials: 'ST', name: 'Sarah Thompson', room: '104', time: '11:00 AM', amount: 2800, color: 'blue' },
  { initials: 'JS', name: 'James Smith', room: '202', time: '12:00 PM', amount: 3200, color: 'green' },
];

const statusActions: { status: RoomStatus; label: string }[] = [
  { status: 'available', label: 'Mark available' },
  { status: 'dirty', label: 'Mark dirty' },
  { status: 'maintenance', label: 'Maintenance' },
];

const floors = [1, 2, 3, 4, 5];

type DashboardPageProps = {
  isBooking: boolean;
};

export function DashboardPage({ isBooking }: DashboardPageProps) {
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const counts = rooms.reduce<Record<RoomStatus, number>>(
    (acc, room) => ({ ...acc, [room.status]: acc[room.status] + 1 }),
    { available: 0, occupied: 0, dirty: 0, maintenance: 0, blocked: 0 },
  );

  if (isBooking) {
    return (
      <div className="page-wrap">
        <PageHeader
          title="Book a Room"
          subtitle="Create a new reservation from the demo booking desk."
        >
          <button className="button primary">
            <Plus size={16} /> Quick Actions
          </button>
        </PageHeader>

        <div className="booking-placeholder panel">
          <div className="empty-icon">
            <CalendarCheck />
          </div>
          <h2>Booking desk</h2>
          <p>
            This demo build keeps booking separate from hotel operations.
            Choose a room from the available inventory to continue.
          </p>
          <div className="booking-room-grid">
            {rooms
              .filter((room) => room.status === 'available')
              .map((room) => (
                <button
                  key={room.number}
                  onClick={() => showToast(`Room ${room.number} selected`)}
                >
                  <BedDouble size={18} />
                  <b>Room {room.number}</b>
                  <span>{room.type} · {money(room.rate)}</span>
                </button>
              ))}
          </div>
        </div>

        {toast && <Toast message={toast} />}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <PageHeader
        title="Good morning, Admin"
        subtitle="Here is what is happening across your property today."
      >
        <button className="button primary">
          <Plus size={16} /> Quick Actions
        </button>
      </PageHeader>

      {/* Metric cards */}
      <section className="metric-grid">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <div className="metric-label">
              {metric.label}
              <span className={`metric-icon ${metric.tone}`}>
                <ArrowUpRight size={16} />
              </span>
            </div>
            <strong>{metric.value}</strong>
            <div className="metric-foot">
              <span className="positive">{metric.change}</span> {metric.note}
            </div>
          </div>
        ))}
      </section>

      {/* Quick actions + operational overview */}
      <section className="dashboard-grid">
        <div className="panel quick-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Shortcuts</span>
              <h2>Quick actions</h2>
            </div>
            <button className="text-button">
              View all <ChevronRight size={15} />
            </button>
          </div>
          <div className="quick-grid">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="quick-action"
                onClick={(event) => {
                  if (action.href === '#') {
                    event.preventDefault();
                    showToast(`${action.label} is ready for demo use`);
                  }
                }}
              >
                <span className="quick-icon">
                  <action.icon size={18} />
                </span>
                <span>{action.label}</span>
                <ChevronRight size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="panel overview-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Today</span>
              <h2>Operational overview</h2>
            </div>
            <span className="live-pill"><i /> Live</span>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div>
                <strong>68%</strong>
                <span>occupied</span>
              </div>
            </div>
            <div>
              <p className="big-number">
                {rooms.length}<small> rooms</small>
              </p>
              <span className="muted">Total inventory</span>
              <div className="legend-list">
                <span><i className="dot available" /> Available <b>{counts.available}</b></span>
                <span><i className="dot occupied" /> Occupied <b>{counts.occupied}</b></span>
                <span><i className="dot dirty" /> Needs attention <b>{counts.dirty + counts.maintenance}</b></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room status floor plan */}
      <section className="panel room-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Live floor plan</span>
            <h2>Room status</h2>
          </div>
          <div className="status-legend">
            {(Object.keys(statusLabels) as RoomStatus[]).map((status) => (
              <span key={status}>
                <i className={`dot ${status}`} />{statusLabels[status]}
              </span>
            ))}
          </div>
        </div>
        {floors.map((floor) => (
          <div className="floor-row" key={floor}>
            <span className="floor-label">
              Floor {floor}
              <small>{rooms.filter((room) => room.floor === floor).length} rooms</small>
            </span>
            <div className="room-tiles">
              {rooms
                .filter((room) => room.floor === floor)
                .map((room) => (
                  <button
                    key={room.number}
                    className={`room-tile ${room.status}`}
                    onClick={() =>
                      showToast(`Room ${room.number} marked ${statusLabels[room.status].toLowerCase()}`)
                    }
                  >
                    <BedDouble size={16} />
                    <b>{room.number}</b>
                    <span>{statusLabels[room.status]}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* Vacate rooms + quick status changer */}
      <section className="bottom-grid">
        <div className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Arrivals & departures</span>
              <h2>Going to vacate rooms</h2>
            </div>
            <button className="text-button">
              See schedule <ChevronRight size={15} />
            </button>
          </div>
          <div className="vacate-list">
            {vacateRooms.map((item) => (
              <div key={item.room}>
                <span className={`avatar ${item.color}`}>{item.initials}</span>
                <b>{item.name}</b>
                <small>Room {item.room} · {item.time}</small>
                <strong>{money(item.amount)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel quick-status">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Housekeeping</span>
              <h2>Quick room status</h2>
            </div>
            <Search size={18} className="muted" />
          </div>
          <div className="status-buttons">
            {statusActions.map((action) => (
              <button
                key={action.status}
                onClick={() => showToast(`${action.label} action confirmed`)}
              >
                <i className={`dot ${action.status}`} />
                {action.label}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {toast && <Toast message={toast} />}
    </div>
  );
}
