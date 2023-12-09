const mongoose = require("mongoose");

const subtractionSchema = new mongoose.Schema({
  subtractionLength: {
    type: Number,
    required: [true, "Subtraction length is required"],
    min: [0, "Subtraction length cannot be negative"],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project", // Reference to the Project model
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
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
  subtractions: [subtractionSchema], // Adding the subtractions array
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Filament = mongoose.model("Filament", filamentSchema);

module.exports = Filament;
