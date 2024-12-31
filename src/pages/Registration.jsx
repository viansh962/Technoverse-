import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNo: '',
    phoneNumber: '',
    branch: '',
    year: '',
    collegeName: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { completeRegistration } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completeRegistration(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to complete registration');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Complete Your Registration</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Enrollment Number"
              type="text"
              required
              value={formData.enrollmentNo}
              onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
            />
            <Input
              label="Phone Number"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Input
              label="Branch"
              type="text"
              required
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            />
            <Input
              label="Year"
              type="number"
              min="1"
              max="4"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
            <Input
              label="College Name"
              type="text"
              required
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            Complete Registration
          </Button>
        </form>
      </motion.div>
    </div>
  );
}