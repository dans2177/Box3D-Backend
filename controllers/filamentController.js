const Filament = require("../schemas/filamentSchema");

exports.getFilaments = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming this is how you get the user's ID
    console.log("Fetching filament data for user: ", userId);

    // Fetch all filaments that belong to the user
    const filaments = await Filament.find({ user_id: userId });

    if (filaments.length === 0) {
      // No filaments found for the user
      console.log("No filaments found for user: ", userId);
      return res
        .status(200)
        .json({ message: "No inventory found for this user." });
    }
    res.json({ data: filaments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Post Filament
exports.postFilament = async (req, res) => {
  try {
    console.log("Posting filament data for user: ", req.user.id);

    // Create a new filament
    const filament = await Filament.create({
      user_id: req.user.id,
      name: req.body.name,
      color: req.body.color,
      manufacturer: req.body.manufacturer,
      material: req.body.material,
      startingAmount: req.body.startingAmount,
      notes: req.body.notes,
      size: req.body.size,
      temperature: req.body.temperature,
    });

    res.json({ data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    console.log("Received token:", req.headers.authorization);
  }
};
