const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id is required"],
  },
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  time: {
    type: Date,
    default: Date.now,
  },
  notes: String,
  pictures: [ 
    {
      type: String,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
  ],
  filaments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Filament",
    },
  ],
  link: {
    type: String,
    match: [/^https?:\/\/.+/, "Please enter a valid URL"],
  },
});

module.exports = mongoose.model("Project", projectSchema);
