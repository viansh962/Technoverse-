import { request } from './api';

export const courseService = {
  async getCourses() {
    return request('/courses');
  },

  async createCourse(courseData) {
    return request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  async updateCourse(id, courseData) {
    return request(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  },

  async deleteCourse(id) {
    return request(`/courses/${id}`, {
      method: 'DELETE',
    });
  },
};