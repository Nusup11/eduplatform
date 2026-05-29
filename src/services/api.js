/**
 * Заготовка для подключения backend (Express + MongoDB).
 * Замените mock-вызовы в pages/context на эти методы.
 */
const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || res.statusText);
  }
  return res.json();
}

export const api = {
  health: () => request('/health'),
  auth: {
    login: (body) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    register: (body) =>
      request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    me: () => request('/auth/me'),
    updateProfile: (body) =>
      request('/auth/me', { method: 'PATCH', body: JSON.stringify(body) }),
  },
  courses: {
    list: (params) => {
      const q = new URLSearchParams(params).toString();
      return request(`/courses${q ? `?${q}` : ''}`);
    },
    get: (id) => request(`/courses/${id}`),
  },
  quizzes: {
    get: (id) => request(`/quizzes/${id}`),
    submit: (id, answers) =>
      request(`/quizzes/${id}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers }),
      }),
  },
  leaderboard: () => request('/leaderboard'),
  analytics: () => request('/analytics/me'),
};

export default api;
