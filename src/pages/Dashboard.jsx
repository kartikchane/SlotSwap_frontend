import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    status: 'BUSY'
  });

  const fetchEvents = async () => {
    try {
      const data = await api.getMyEvents();
      setEvents(data.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.createEvent(formData);
      setShowModal(false);
      setFormData({ title: '', startTime: '', endTime: '', status: 'BUSY' });
      await fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStatus = async (eventId, newStatus) => {
    try {
      await api.updateEvent(eventId, { status: newStatus });
      await fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.deleteEvent(eventId);
      await fetchEvents();
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">My Calendar</h2>
        <button onClick={() => setShowModal(true)}>+ Create Event</button>
      </div>

      {error && <div className="error">{error}</div>}

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events yet. Create your first event!</p>
        </div>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <div className="event-time">
                {formatDateTime(event.start_time)} - {formatDateTime(event.end_time)}
              </div>
              <span className={`event-status status-${event.status.toLowerCase().replace('_', '-')}`}>
                {event.status}
              </span>
              <div className="event-actions">
                {event.status === 'BUSY' && (
                  <button className="btn-success" onClick={() => handleUpdateStatus(event.id, 'SWAPPABLE')}>
                    Make Swappable
                  </button>
                )}
                {event.status === 'SWAPPABLE' && (
                  <button className="btn-secondary" onClick={() => handleUpdateStatus(event.id, 'BUSY')}>
                    Remove from Swap
                  </button>
                )}
                {event.status !== 'SWAP_PENDING' && (
                  <button className="btn-danger" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Event</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="BUSY">Busy</option>
                  <option value="SWAPPABLE">Swappable</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit">Create Event</button>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
