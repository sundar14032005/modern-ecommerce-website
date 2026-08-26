import axios from 'axios';

// Base URL for the Django backend (uses env variable if available, else defaults to local)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ACCESS_TOKEN_KEY = 'nexstore_access_token';
const REFRESH_TOKEN_KEY = 'nexstore_refresh_token';

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (access, refresh) => {
    if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const apiClient = axios.create({ baseURL: API_BASE_URL });

// Attach the JWT access token (if we have one) to every request.
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If a request comes back 401, try once to refresh the access token using
// the refresh token, then retry the original request.
let refreshPromise = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = tokenStorage.getRefresh();

    if (
      error.response &&
      error.response.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${API_BASE_URL}/auth/token/refresh/`, { refresh: refreshToken })
            .then((res) => {
              tokenStorage.setTokens(res.data.access, res.data.refresh);
              return res.data.access;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }
        const newAccess = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        tokenStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
