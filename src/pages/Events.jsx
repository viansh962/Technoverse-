import React, { useState, useEffect } from 'react';
import { eventService } from '../services/events';
import { EventCard } from '../components/events/EventCard';
import { EventForm } from '../components/events/EventForm';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, formData);
      } else {
        await eventService.createEvent(formData);
      }
      fetchEvents();
      setShowForm(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        fetchEvents();
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          {user && (
            <Button onClick={() => setShowForm(true)}>
              Create Event
            </Button>
          )}
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <EventForm
              event={editingEvent}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p className="text-gray-600">No events available</p>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                canManage={user?.isAdmin}
                onEdit={(event) => {
                  setEditingEvent(event);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}