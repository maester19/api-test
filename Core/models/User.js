const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: false },
  pic: { type: String, required: true, unique: false },
  phone: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true, unique: false },
  verif: { type: Boolean, required: true, unique: false, default: false },
  role: { type: String, required: true, unique: false },
  otp: { type: Number, required: true, unique: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);