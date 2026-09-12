const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    const { currentPassword, newPassword } = req.body;

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

exports.createSeedUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: 'admin@agency.com' });
    if (existingUser) {
      return res.status(200).json({ success: true, message: 'Seed user already exists' });
    }

    await User.create({
      name: 'Admin',
      email: 'admin@agency.com',
      password: 'admin123',
      role: 'admin'
    });

    res.status(201).json({ success: true, message: 'Seed user created' });
  } catch (error) {
    next(error);
  }
};
