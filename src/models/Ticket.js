const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Ticket", ticketSchema);