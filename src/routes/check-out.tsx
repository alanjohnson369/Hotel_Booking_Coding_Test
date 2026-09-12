import { useMemo, useState } from 'react';
import { Check, FileText, Plus, Search, Trash2 } from 'lucide-react';
import { guests, money, starterCharges, type Charge } from '@/data/hotel';
import { PageHeader, PanelTitle, Toast } from '@/routes/__root';

const chargePresets: Charge[] = [
  { id: 'minibar', label: 'Mini-bar', amount: 100 },
  { id: 'laundry', label: 'Laundry', amount: 250 },
];

const initialCharges: Record<string, Charge[]> = {
  '101': starterCharges,
  '104': [{ id: 'restaurant', label: 'Restaurant bill', amount: 850 }],
  '202': [],
};

export function CheckOutPage() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['101']);
  const [charges, setCharges] = useState<Record<string, Charge[]>>(initialCharges);
  const [toast, setToast] = useState('');

  const selectedGuests = guests.filter((guest) => selectedRooms.includes(guest.room));

  const total = useMemo(
    () =>
      selectedGuests.reduce(
        (sum, guest) =>
          sum + guest.rate * 2 + (charges[guest.room] ?? []).reduce((total, charge) => total + charge.amount, 0),
        0,
      ),
    [selectedGuests, charges],
  );

  const toggleRoom = (room: string) =>
    setSelectedRooms((current) =>
      current.includes(room) ? current.filter((item) => item !== room) : [...current, room],
    );

  const addCharge = (room: string, charge: Charge) =>
    setCharges((current) => ({
      ...current,
      [room]: [...(current[room] ?? []), { ...charge, id: `${charge.id}-${Date.now()}` }],
    }));

  const removeCharge = (room: string, chargeId: string) =>
    setCharges((current) => ({
      ...current,
      [room]: (current[room] ?? []).filter((charge) => charge.id !== chargeId),
    }));

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2300);
  };

  return (
    <div className="page-wrap">
      <PageHeader
        title="Guest check-out"
        subtitle="Review open charges, settle the bill, and complete departures securely"
      >
        <button className="button secondary">
          <FileText size={16} /> Draft invoices
        </button>
      </PageHeader>

      <div className="checkout-grid">
        {/* Step 1: Identify departing guest */}
        <section className="panel identify-panel">
          <PanelTitle number="01" title="Identify departing guest" />
          <div className="panel-body">
            <label className="field full">
              <span>Find guest</span>
              <div className="input-icon">
                <Search size={15} />
                <input placeholder="Search guest name" />
              </div>
            </label>

            <label className="field full">
              <span>Select guest from list</span>
              <select>
                <option>All departing guests</option>
                {guests.map((guest) => (
                  <option key={guest.room}>{guest.name} · Room {guest.room}</option>
                ))}
              </select>
            </label>

            <div className="guest-spotlight">
              <div>
                <span className="eyebrow">Guest name</span>
                <strong>{guests[0].name}</strong>
              </div>
              <div className="room-badge">
                <span>Room no.</span>
                <b>{guests[0].room}</b>
              </div>
            </div>

            <div className="stay-table">
              <div className="stay-head">
                <span>Room</span><span>Stay dates</span><span>Actions</span>
              </div>
              {guests.slice(0, 3).map((guest) => (
                <label className="stay-row" key={guest.room}>
                  <span><b>{guest.room}</b></span>
                  <span>02 Apr - 04 Apr</span>
                  <span>
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes(guest.room)}
                      onChange={() => toggleRoom(guest.room)}
                    />
                    Check out
                  </span>
                </label>
              ))}
            </div>

            <button className="button ghost full-button">
              <Search size={15} /> Add / change selected rooms
            </button>
          </div>
        </section>

        {/* Step 2: Review & finalize bill */}
        <section className="panel bill-panel">
          <PanelTitle number="02" title="Review & finalize bill" />
          <div className="bill-content">
            {selectedGuests.length === 0 ? (
              <div className="empty-state">Select at least one room to review the bill.</div>
            ) : (
              selectedGuests.map((guest) => {
                const roomCharges = charges[guest.room] ?? [];
                const roomTotal =
                  guest.rate * 2 + roomCharges.reduce((sum, charge) => sum + charge.amount, 0);

                return (
                  <div className="room-bill" key={guest.room}>
                    <div className="room-bill-head">
                      <div>
                        <h3>Room {guest.room}</h3>
                        <span>2 nights × {money(guest.rate)} room rate</span>
                      </div>
                      <strong>{money(roomTotal)}</strong>
                    </div>

                    <div className="charge-tools">
                      <span>Additional charges</span>
                      {chargePresets.map((preset) => (
                        <button key={preset.id} onClick={() => addCharge(guest.room, preset)}>
                          <Plus size={14} /> {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="charge-list">
                      <div>
                        <span>Room stay</span>
                        <b>{money(guest.rate * 2)}</b>
                      </div>
                      {roomCharges.map((charge) => (
                        <div key={charge.id}>
                          <span>
                            {charge.label}
                            <button className="remove-charge" onClick={() => removeCharge(guest.room, charge.id)}>
                              <Trash2 size={12} />
                            </button>
                          </span>
                          <b>{money(charge.amount)}</b>
                        </div>
                      ))}
                    </div>

                    <div className="room-total">
                      <span>Room {guest.room} total</span>
                      <strong>{money(roomTotal)}</strong>
                    </div>
                  </div>
                );
              })
            )}

            <div className="combined-total">
              <span>Selected rooms combined total</span>
              <strong>{money(total)}</strong>
            </div>
          </div>
        </section>

        {/* Step 3: Payment & check-out */}
        <aside className="panel payment-panel">
          <PanelTitle number="03" title="Payment & check-out" />
          <div className="payment-content">
            <div className="due-amount">
              <span>Total amount due</span>
              <strong>{money(total)}</strong>
              <small>
                {selectedRooms.length} selected room{selectedRooms.length === 1 ? '' : 's'}
              </small>
            </div>

            <label className="field full">
              <span>Payment method</span>
              <select>
                <option>Credit card</option>
                <option>Cash</option>
                <option>M-Pay</option>
              </select>
            </label>

            <label className="field full">
              <span>Payment amount</span>
              <input value={total} readOnly />
            </label>

            <button
              className="button primary full-button"
              onClick={() => showToast('Payment processed and check-out completed')}
            >
              <Check size={16} /> Process payment & check-out
            </button>

            <button
              className="button secondary full-button"
              onClick={() => showToast('Draft check-out prepared')}
            >
              Payment & check-out
            </button>

            <div className="payment-actions">
              <button className="button ghost full-button">Print final invoice</button>
              <button className="button ghost full-button">Email final invoice</button>
            </div>
          </div>
        </aside>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}
