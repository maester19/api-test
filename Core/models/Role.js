const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: false },
  code: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', roleSchema);