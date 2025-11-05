import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Marketplace = () => {
  const [slots, setSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchData = async () => {
    try {
      const [slotsData, eventsData] = await Promise.all([
        api.getSwappableSlots(),
        api.getMyEvents()
      ]);
      setSlots(slotsData.slots);
      setMySlots(eventsData.events.filter(e => e.status === 'SWAPPABLE'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestSwap = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleSubmitSwap = async (mySlotId) => {
    try {
      await api.requestSwap(mySlotId, selectedSlot.id);
      setSuccess('Swap request sent successfully!');
      setShowModal(false);
      await fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h2 className="section-title">Marketplace - Available Slots</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {slots.length === 0 ? (
        <div className="empty-state">
          <p>No swappable slots available at the moment.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            Check back later or ask your colleagues to mark their slots as swappable!
          </p>
        </div>
      ) : (
        <div>
          {slots.map((slot) => (
            <div key={slot.id} className="slot-card">
              <h3>{slot.title}</h3>
              <div className="event-time">
                {formatDateTime(slot.start_time)} - {formatDateTime(slot.end_time)}
              </div>
              <div style={{ marginTop: '10px', color: '#7f8c8d', fontSize: '14px' }}>
                Owner: {slot.owner_name} ({slot.owner_email})
              </div>
              <div className="slot-actions">
                <button onClick={() => handleRequestSwap(slot)}>
                  Request Swap
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Choose Your Slot to Offer</h2>
            <p style={{ marginBottom: '20px', color: '#7f8c8d' }}>
              You want to swap with: <strong>{selectedSlot.title}</strong>
            </p>

            {mySlots.length === 0 ? (
              <div>
                <p style={{ color: '#e74c3c' }}>
                  You don't have any swappable slots. Please mark one of your events as swappable first.
                </p>
                <button className="btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            ) : (
              <div>
                {mySlots.map((slot) => (
                  <div key={slot.id} className="slot-card" style={{ marginBottom: '15px' }}>
                    <h3>{slot.title}</h3>
                    <div className="event-time">
                      {formatDateTime(slot.start_time)} - {formatDateTime(slot.end_time)}
                    </div>
                    <div className="slot-actions">
                      <button onClick={() => handleSubmitSwap(slot.id)}>
                        Offer This Slot
                      </button>
                    </div>
                  </div>
                ))}
                <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ marginTop: '10px' }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
