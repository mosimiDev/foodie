const BASE_URL = "postgresql://foodiie_user:wAGLCir1kFdwL2DEHRbSPYM8MZusCHZE@dpg-d3tvdmqli9vc73bndit0-a.oregon-postgres.render.com/foodiie"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveTokens({ accessToken, refreshToken }) {
  await AsyncStorage.setItem('accessToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
}

async function getAccessToken() {
  return AsyncStorage.getItem('accessToken');
}

async function getRefreshToken() {
  return AsyncStorage.getItem('refreshToken');
}

async function clearTokens() {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
}

async function handleResponse(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function register({ email, password, fullName }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, fullName }),
  });
  const body = await handleResponse(res);
  if (!res.ok) throw body;
  await saveTokens({ accessToken: body.accessToken, refreshToken: body.refreshToken });
  return body.user;
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await handleResponse(res);
  if (!res.ok) throw body;
  await saveTokens({ accessToken: body.accessToken, refreshToken: body.refreshToken });
  return body.user;
}

export async function refreshTokens() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('no refresh token');
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  const body = await handleResponse(res);
  if (!res.ok) throw body;
  await saveTokens({ accessToken: body.accessToken, refreshToken: body.refreshToken });
  return body;
}

export async function me() {
  let accessToken = await getAccessToken();
  if (!accessToken) throw { message: 'not authenticated' };

  let res = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401 || res.status === 403) {
    // Try refresh once
    try {
      await refreshTokens();
      accessToken = await getAccessToken();
      res = await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      await clearTokens();
      throw err;
    }
  }

  const body = await handleResponse(res);
  if (!res.ok) throw body;
  return body;
}

export async function logout() {
  await clearTokens();
}
