import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export function ForgotPassword() {
  const [step, setStep] = useState('email'); // email, otp, newPassword
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const { sendPasswordResetOtp, verifyOtp, resetPassword } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetOtp(email);
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp);
      setStep('newPassword');
    } catch (err) {
      setError('Invalid OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email, otp, newPassword);
      // Redirect to login
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-center text-3xl font-bold text-gray-900">Reset Password</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="w-full">Send OTP</Button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <Input
              label="Enter OTP"
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button type="submit" className="w-full">Verify OTP</Button>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <Input
              label="New Password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Reset Password</Button>
          </form>
        )}
      </motion.div>
    </div>
  );
}