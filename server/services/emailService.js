import { transporter } from '../config/email.js';

export const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification - Technoverse',
    html: `
      <h1>Welcome to Technoverse!</h1>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset - Technoverse',
    html: `
      <h1>Password Reset Request</h1>
      <p>Your password reset code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};