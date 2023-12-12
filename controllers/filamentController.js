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

// Update Filament
exports.updateFilament = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const updateData = req.body;

    // Find the filament and update it
    const filament = await Filament.findByIdAndUpdate(filamentId, updateData, { new: true });

    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.json({ message: "Filament updated successfully", data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Filament
exports.deleteFilament = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;

    // Delete the filament
    const filament = await Filament.findByIdAndDelete(filamentId);

    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.json({ message: "Filament deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Filament
exports.getFilament = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const filament = await Filament.findById(filamentId);

    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.json({ data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//----------------------------------------------------------------
// SUBTRACTION CONTROLLERS

// Create Subtraction
exports.createSubtraction = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const { subtractionLength, project, date } = req.body;

    // Find the filament and add the new subtraction
    const filament = await Filament.findById(filamentId);
    filament.subtractions.push({ subtractionLength, project, date });
    filament.recalculateCurrentAmount(); // Recalculate the current amount
    await filament.save();

    res.status(201).json({ message: "Subtraction added successfully", data: filament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Subtractions
exports.getSubtractions = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const filament = await Filament.findById(filamentId);

    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.json({ data: filament.subtractions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Subtraction
exports.updateSubtraction = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const subtractionId = req.params.subtractionId;
    const updateData = req.body;

    // Find the filament and update the specific subtraction
    const filament = await Filament.findById(filamentId);
    const subtraction = filament.subtractions.id(subtractionId);
    if (subtraction) {
      Object.assign(subtraction, updateData);
      filament.recalculateCurrentAmount(); // Recalculate the current amount
      await filament.save();
      res.json({ message: "Subtraction updated successfully", data: subtraction });
    } else {
      res.status(404).json({ message: "Subtraction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Subtraction
exports.deleteSubtraction = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const subtractionId = req.params.subtractionId;

    // Find the filament and remove the specific subtraction
    const filament = await Filament.findById(filamentId);
    const subtraction = filament.subtractions.id(subtractionId);
    if (subtraction) {
      subtraction.remove();
      filament.recalculateCurrentAmount(); // Recalculate the current amount
      await filament.save();
      res.json({ message: "Subtraction deleted successfully" });
    } else {
      res.status(404).json({ message: "Subtraction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//----------------------------------------------------------------
