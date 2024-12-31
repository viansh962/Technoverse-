import { request } from './api';

export const authService = {
  async register(userData) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(credentials) {
    const response = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  logout() {
    localStorage.removeItem('token');
  },
};