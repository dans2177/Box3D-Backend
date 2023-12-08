const Filament = require("../models/Filament");

exports.getFilaments = async (req, res) => {
  try {
    console.log("Fetching filament data...");
    console.log(req.user);

    const filaments = await Filament.find({}); // Fetch all filaments from the database
    res.json({ data: filaments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFilament = async (req, res) => {
  try {
    console.log("Fetching filament data...");
    console.log(req.user);

    const filament = await Filament.findById(req.params.id); // Fetch filament by id from the database
    res.json({ data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.createFilament = async (req, res) => {
  try {
    console.log("Creating filament...");
    console.log(req.user);

    const filament = await Filament.create(req.body); // Create filament in the database
    res.json({ data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

