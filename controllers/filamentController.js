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
