const mongoose = require('mongoose');

const ADMINschema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please provide a valid email address.'
    }
  },
  PhoneNo: {
    type: String,
    trim: true,
    validate: {
      validator: (value) => /^\d+$/.test(value), 
      message: 'Please provide a valid phone number.'
    }
  },
  Password: {
    type: String,
    required: true,
    minlength: 8  // Minimum password length for security
  },
  verificationCode:{type:String},
  is_verified:{
    type:Boolean,
    default:0
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {  // Optional field for managing active/inactive admins
    type: Boolean,
    default: true
  }
});

const Model = mongoose.model("Users",ADMINschema)
module.exports = Model