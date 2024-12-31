import { request } from './api';

export const resourceService = {
  async getResources() {
    return request('/resources');
  },

  async createResource(resourceData) {
    return request('/resources', {
      method: 'POST',
      body: JSON.stringify(resourceData),
    });
  },
};