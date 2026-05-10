const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Updated Regex: 8+ chars, 1 Upper, 1 Special, at least 1 Digit (Adjust to your liking)
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (v) => passwordRegex.test(v),
      message: 'Password must be 8+ characters with a capital letter, digit, and symbol'
    },
    select: false // Automatically hides password from query results for safety
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Manager'],
    default: 'Admin' 
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^\d{10}$/, 'Contact number must be 10 digits']
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

// Password Hashing
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12); // 12 rounds is slightly more secure
  next();
});

// Password Verification Method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);