const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    console.log('Hashing password for user:', this.username);
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error('Error hashing password for user:', this.username, error);
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);