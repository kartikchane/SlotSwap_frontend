const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response) => {
  // Check if response has content
  const text = await response.text();
  
  // Try to parse as JSON
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    console.error('Failed to parse JSON:', text);
    throw new Error('Invalid response from server');
  }
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export const api = {
  // Auth
  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return handleResponse(response);
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Events
  getMyEvents: async () => {
    const response = await fetch(`${API_BASE}/events`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData)
    });
    return handleResponse(response);
  },

  updateEvent: async (id, eventData) => {
    const response = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData)
    });
    return handleResponse(response);
  },

  deleteEvent: async (id) => {
    const response = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Swap
  getSwappableSlots: async () => {
    const response = await fetch(`${API_BASE}/swappable-slots`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  requestSwap: async (mySlotId, theirSlotId) => {
    const response = await fetch(`${API_BASE}/swap-request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ mySlotId, theirSlotId })
    });
    return handleResponse(response);
  },

  respondToSwap: async (requestId, accept) => {
    const response = await fetch(`${API_BASE}/swap-response/${requestId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ accept })
    });
    return handleResponse(response);
  },

  getIncomingRequests: async () => {
    const response = await fetch(`${API_BASE}/swap-requests/incoming`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getOutgoingRequests: async () => {
    const response = await fetch(`${API_BASE}/swap-requests/outgoing`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};
