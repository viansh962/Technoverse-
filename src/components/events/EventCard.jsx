import React from 'react';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/date';

export function EventCard({ event, onEdit, onDelete, canManage }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formatDate(event.date)}
          </span>
          <div className="space-x-2">
            {canManage && (
              <>
                <Button variant="outline" onClick={() => onEdit(event)}>
                  Edit
                </Button>
                <Button variant="outline" onClick={() => onDelete(event.id)}>
                  Delete
                </Button>
              </>
            )}
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
}