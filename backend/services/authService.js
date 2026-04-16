const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

exports.findUserByEmailOrUsername = async (email, username) => {
  return User.findOne({
    $or: [{ email }, { username }]
  });
};

exports.registerUser = async ({ username, email, password }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();
  const token = generateToken(user._id);

  return { user, token };
};

exports.validatePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.generateToken = generateToken;

exports.getUserProfile = async (userId) => {
  return User.findById(userId).select('-password');
};

exports.updateUserProfile = async (userId, updates) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (updates.username && updates.username !== user.username) {
    const existingUser = await User.findOne({ username: updates.username });
    if (existingUser) {
      const error = new Error('Username already taken');
      error.statusCode = 400;
      throw error;
    }
    user.username = updates.username;
  }

  if (updates.avatar !== undefined) {
    user.avatar = updates.avatar;
  }

  await user.save();
  return user;
};