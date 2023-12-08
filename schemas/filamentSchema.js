const mongoose = require("mongoose");

const filamentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id is required"],
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

const Filament = mongoose.model("Filament", filamentSchema);
