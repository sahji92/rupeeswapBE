import User from '../models/Users.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '../config/env.js';
import twilio  from 'twilio';
const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);



// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


// Signup: Send OTP
export const signupSendOtp = async (req, res) => {
    console.log('Log for createUser:',req.body)
  const {username,phone,location,services} =req.body;
  
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
  };
    

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    const user = new User({ username,phone,location,services,otp,otpExpires });
    await user.save();

    await client.messages.create({
      body: `Your OTP for signup is ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent successfully', userId: user._id });
  } catch (error) {
    console.error('Error in signupSendOtp:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Signup: Verify OTP
export const  signupVerifyOtp= async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) return res.status(400).json({ message: 'User ID and OTP are required' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    user.otp = '';
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ userId: user._id},JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Signup successful', token});
  
  } catch (error) {
    console.error('Error in signupVerifyOtp:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

// Login: Send OTP
export const  loginSendOtp= async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'Phone number not registered' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await client.messages.create({
      body: `Your OTP for login is ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent successfully', userId: user._id });
  } catch (error) {
    console.error('Error in loginSendOtp:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Login: Verify OTP
export const  loginVerifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) return res.status(400).json({ message: 'User ID and OTP are required' });

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    user.otp = '';
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user: { phone: user.phone, name: user.name } });
  } catch (error) {
    console.error('Error in loginVerifyOtp:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};
export const getUser = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Debug JWT middleware output
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Authentication failed: Invalid or missing user ID' });
    }
    const userId = req.user.userId;
    const user = await User.findById(userId).select('username phone');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User data retrieved successfully',
      user: {
        phone: user.phone,
        name: user.username,
      },
    });
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ message: 'Failed to retrieve user data' });
  }
};