const Filament = require("../schemas/filamentSchema");

//----------------------------------------------------------------
//FILAMENT CONTROLLERS

//Get User Filaments
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

//Post User Filament
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

//----------------------------------------------------------------
// SUBTRACTION CONTROLLERS

//Create Subtraction
exports.createSubtraction = async (req, res) => {
  try {
    const { filamentId, subtractionLength } = req.body;
    const filament = await Filament.findById(filamentId);

    // Check if filament exists
    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    // Add the new subtraction
    filament.subtractions.push({ subtractionLength });

    filament.recalculateCurrentAmount();

    await filament.save();
    res.json({ data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete Subtraction
exports.deleteSubtraction = async (req, res) => {
  try {
    const { filamentId, subtractionId } = req.body;
    const filament = await Filament.findById(filamentId);

    // Check if filament exists
    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    // Remove the subtraction
    filament.subtractions.id(subtractionId).remove();

    filament.recalculateCurrentAmount();

    await filament.save();
    res.json({ data: filament }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//----------------------------------------------------------------
