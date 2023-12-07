// ./models/Filament.js
const mongoose = require("mongoose");
const filamentSchema = require("../schemas/filamentSchema");

const Filament = mongoose.model("Filament", filamentSchema);

module.exports = Filament;
