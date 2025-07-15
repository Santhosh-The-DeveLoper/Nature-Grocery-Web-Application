const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


// Create transport for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


// Send verification email
const sendVerificationEmail = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const url = `${process.env.SERVER_URL}/api/auth/verify/${token}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Verify your Email",
    html: `<h2>Hello ${user.name},</h2><p>Click the link below to verify your email:</p><a href="${url}" target="_blank">Verify Email</a>`,
  });

  res.status(201).json({ message: "Verification email sent." });
};


// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    await sendVerificationEmail(user, res);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};


// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verify Email Error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(401).json({ message: "Email not verified" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


// forgotPassword
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; 
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password. It will expire in 1 hour:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    res.status(200).json({ message: "Password reset email sent." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Protected Route
exports.protectedRoute = (req, res) => {
  res.status(200).json({ message: "Protected access granted", user: req.user });
};
