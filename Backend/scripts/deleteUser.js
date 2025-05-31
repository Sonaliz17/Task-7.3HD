require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function deleteTestUser() {
  await mongoose.connect(process.env.MONGO_URI);

  const result = await User.deleteOne({ email: 'test@example.com' });

  if (result.deletedCount > 0) {
    console.log('🗑️ Test user deleted.');
  } else {
    console.log('⚠️ No test user found.');
  }

  process.exit(0);
}

deleteTestUser().catch(console.error);