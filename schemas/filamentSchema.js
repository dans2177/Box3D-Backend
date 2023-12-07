const mongoose = require("mongoose");

const filamentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User email is required"],
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  color: String,
  manufacturer: String,
  material: String,
  startingAmount: {
    type: Number,
    min: [0, "Starting amount cannot be negative"],
    required: [true, "Starting amount is required"],
  },
  notes: String,
  size: String,
  temperature: String,
  isArchived: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Filament", filamentSchema);


