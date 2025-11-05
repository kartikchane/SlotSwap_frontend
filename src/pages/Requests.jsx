import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Requests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchRequests = async () => {
    try {
      const [incoming, outgoing] = await Promise.all([
        api.getIncomingRequests(),
        api.getOutgoingRequests()
      ]);
      setIncomingRequests(incoming.requests);
      setOutgoingRequests(outgoing.requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleResponse = async (requestId, accept) => {
    try {
      await api.respondToSwap(requestId, accept);
      setSuccess(`Swap ${accept ? 'accepted' : 'rejected'} successfully!`);
      await fetchRequests();
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#f39c12';
      case 'ACCEPTED': return '#27ae60';
      case 'REJECTED': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <h2 className="section-title">Incoming Requests</h2>
      {incomingRequests.length === 0 ? (
        <div className="empty-state">
          <p>No incoming swap requests.</p>
        </div>
      ) : (
        <div>
          {incomingRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '10px' }}>
                    Swap Request from {request.requester_name}
                  </h3>
                  <div style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '15px' }}>
                    {request.requester_email}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                    <div>
                      <strong>They offer:</strong>
                      <div style={{ marginTop: '5px' }}>
                        <div>{request.requester_slot_title}</div>
                        <div className="event-time">
                          {formatDateTime(request.requester_start)} - {formatDateTime(request.requester_end)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <strong>For your slot:</strong>
                      <div style={{ marginTop: '5px' }}>
                        <div>{request.owner_slot_title}</div>
                        <div className="event-time">
                          {formatDateTime(request.owner_start)} - {formatDateTime(request.owner_end)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: `${getStatusColor(request.status)}20`,
                    color: getStatusColor(request.status)
                  }}>
                    {request.status}
                  </span>
                </div>
              </div>

              {request.status === 'PENDING' && (
                <div className="request-actions">
                  <button className="btn-success" onClick={() => handleResponse(request.id, true)}>
                    Accept
                  </button>
                  <button className="btn-danger" onClick={() => handleResponse(request.id, false)}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title" style={{ marginTop: '50px' }}>Outgoing Requests</h2>
      {outgoingRequests.length === 0 ? (
        <div className="empty-state">
          <p>No outgoing swap requests.</p>
        </div>
      ) : (
        <div>
          {outgoingRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '10px' }}>
                    Swap Request to {request.owner_name}
                  </h3>
                  <div style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '15px' }}>
                    {request.owner_email}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                    <div>
                      <strong>You offered:</strong>
                      <div style={{ marginTop: '5px' }}>
                        <div>{request.requester_slot_title}</div>
                        <div className="event-time">
                          {formatDateTime(request.requester_start)} - {formatDateTime(request.requester_end)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <strong>For their slot:</strong>
                      <div style={{ marginTop: '5px' }}>
                        <div>{request.owner_slot_title}</div>
                        <div className="event-time">
                          {formatDateTime(request.owner_start)} - {formatDateTime(request.owner_end)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: `${getStatusColor(request.status)}20`,
                    color: getStatusColor(request.status)
                  }}>
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
