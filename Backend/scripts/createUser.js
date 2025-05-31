require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust if your model is in a different path

async function createTestUser() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'test@example.com' });
  if (existing) {
    console.log('Test user already exists.');
    return process.exit(0);
  }

  const user = new User({
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123', // let the Mongoose pre-save hook hash it
});

  await user.save();
  console.log('✅ Test user created!');
  process.exit(0);
}

createTestUser().catch(console.error);
