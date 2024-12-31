import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateOTP } from '../utils/otp.js';
import { sendVerificationEmail, sendPasswordResetEmail } from './emailService.js';

export const createUser = async (userData) => {
  const { email, password } = userData;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  
  const user = new User({
    ...userData,
    password: hashedPassword,
    verificationOTP: otp,
    otpExpiry: Date.now() + 600000 // 10 minutes
  });

  await user.save();
  await sendVerificationEmail(email, otp);
  
  return user;
};

export const verifyOTP = async (email, otp) => {
  const user = await User.findOne({ 
    email,
    verificationOTP: otp,
    otpExpiry: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired OTP');
  }

  user.verified = true;
  user.verificationOTP = undefined;
  user.otpExpiry = undefined;
  await user.save();

  return generateToken(user._id);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user._id);
};

export const initiatePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const otp = generateOTP();
  user.resetOTP = otp;
  user.resetOTPExpiry = Date.now() + 600000; // 10 minutes
  await user.save();

  await sendPasswordResetEmail(email, otp);
};

export const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({
    email,
    resetOTP: otp,
    resetOTPExpiry: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired OTP');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = undefined;
  user.resetOTPExpiry = undefined;
  await user.save();
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};