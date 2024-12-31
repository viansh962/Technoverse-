import { request } from './api';

export const eventService = {
  async getEvents() {
    return request('/events');
  },

  async createEvent(eventData) {
    return request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  async updateEvent(id, eventData) {
    return request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  async deleteEvent(id) {
    return request(`/events/${id}`, {
      method: 'DELETE',
    });
  },
};