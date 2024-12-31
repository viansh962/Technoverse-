import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  semester: { type: Number, required: true },
  password: { type: String, required: true },
  enrollmentNo: { type: String },
  branch: { type: String },
  year: { type: Number },
  collegeName: { type: String },
  registrationComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);