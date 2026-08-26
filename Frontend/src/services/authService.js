import { apiClient, tokenStorage } from './apiClient';

// Extracts a readable message out of whatever shape DRF sent back
// ({"email": ["already exists"]}, {"detail": "..."}, {"non_field_errors": [...]})
const parseApiError = (error, fallback) => {
  const data = error?.response?.data;
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const val = data[firstKey];
    const msg = Array.isArray(val) ? val[0] : val;
    return typeof msg === 'string' ? msg : fallback;
  }
  return fallback;
};

export const register = async ({ username, email, password, password2, firstName, lastName }) => {
  try {
    const response = await apiClient.post('/auth/register/', {
      username,
      email,
      password,
      password2,
      first_name: firstName || '',
      last_name: lastName || ''
    });
    const { user, access, refresh } = response.data;
    tokenStorage.setTokens(access, refresh);
    return { success: true, user };
  } catch (error) {
    return { success: false, message: parseApiError(error, 'Could not create your account.') };
  }
};

export const login = async ({ identifier, password }) => {
  try {
    const response = await apiClient.post('/auth/login/', {
      username: identifier,
      password
    });
    const { access, refresh } = response.data;
    tokenStorage.setTokens(access, refresh);
    const user = await getCurrentUser();
    return { success: true, user };
  } catch (error) {
    return { success: false, message: parseApiError(error, 'Invalid email/username or password.') };
  }
};

export const logout = async () => {
  // BUG 6 fix: tell the server to blacklist the refresh token so it can't be
  // reused even if stolen. We attempt this before clearing local storage so
  // we still have the token to send. If the request fails (network error,
  // already-expired token), we still clear local storage — the user is
  // always logged out locally regardless.
  const refresh = tokenStorage.getRefresh();
  if (refresh) {
    try {
      await apiClient.post('/auth/logout/', { refresh });
    } catch {
      // Silently ignore — local logout proceeds regardless.
    }
  }
  tokenStorage.clear();
};

export const getCurrentUser = async () => {
  if (!tokenStorage.getAccess()) return null;
  try {
    const response = await apiClient.get('/auth/me/');
    return response.data;
  } catch {
    // BUG 4 fix: if /me/ fails (expired/invalid token), clear the stale tokens
    // so the app doesn't get stuck in a broken half-authenticated state where
    // isLoading=false, user=null, but tokens still exist causing 401s everywhere.
    tokenStorage.clear();
    return null;
  }
};

export const isLoggedIn = () => Boolean(tokenStorage.getAccess());
