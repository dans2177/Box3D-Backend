const mongoose = require("mongoose");

// Subtraction Schema -- Nested in Filament Schema (Below)
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
    format: "Y-m-d",
  },
});

// Filament Schema
const filamentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 5, // Set the maximum length for the name field to 5 characters
  },
  color: String,
  type: String,
  link: String,
  material: String,
  startingAmount: {
    type: Number,
    min: [0, "Starting amount cannot be negative"],
    required: [true, "Starting amount is required"],
  },
  currentAmount: {
    type: Number,
    min: [0, "Current amount cannot be negative"],
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

filamentSchema.methods.recalculateCurrentAmount = function () {
  this.currentAmount =
    this.startingAmount -
    this.subtractions.reduce((total, sub) => total + sub.subtractionLength, 0);
};

const Filament = mongoose.model("Filament", filamentSchema);

module.exports = Filament;
