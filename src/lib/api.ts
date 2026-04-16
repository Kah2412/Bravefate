const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function apiRequest(path: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

export const loginUser = async (email: string, password: string) =>
  apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const registerUser = async (username: string, email: string, password: string) =>
  apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });

export const fetchProfile = async () => apiRequest('/api/auth/profile');

export const updateProfile = async (data: { username?: string; avatar?: string }) =>
  apiRequest('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const completeMission = async (missionId: string) =>
  apiRequest('/api/progress/mission', {
    method: 'POST',
    body: JSON.stringify({ missionId }),
  });

export const unlockCharacter = async (characterName: string) =>
  apiRequest('/api/progress/character', {
    method: 'POST',
    body: JSON.stringify({ characterName }),
  });

export const saveGameSession = async (payload: any) =>
  apiRequest('/api/game/session', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const fetchBooks = async (search?: string, category?: string) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  return apiRequest(`/api/books?${params.toString()}`);
};

export const fetchBookCategories = async () => apiRequest('/api/books/categories');

export const fetchLeaderboard = async () => apiRequest('/api/game/leaderboard');
export const fetchProgress = async () => apiRequest('/api/progress');
