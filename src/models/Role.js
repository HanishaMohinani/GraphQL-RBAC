const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true }, // ADMIN, USER, MANAGER
  permissions: [String] // e.g., CREATE_TICKET, READ_USERS
});

module.exports = mongoose.model('Role', roleSchema);
