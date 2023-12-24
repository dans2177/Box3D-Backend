const Filament = require("../schemas/filamentSchema");

// Get User Filaments
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

    res.status(200).json({ data: filaments });
  } catch (error) {
    console.error("Error fetching filaments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Post User Filament
exports.postFilament = async (req, res) => {
  try {
    console.log("Received POST request to create a new filament.");
    console.log("Posting filament data for user: ", req.user.id);

    // Create a new filament
    const filament = await Filament.create({
      user_id: req.user.id,
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
      link: req.body.link,
      material: req.body.material,
      startingAmount: req.body.startingAmount,
      currentAmount: req.body.startingAmount,
      notes: req.body.notes,
      size: req.body.size,
      temperature: req.body.temperature,
    });

    res
      .status(201)
      .json({ message: "Filament created successfully", filament });
  } catch (error) {
    console.error("Error creating filament:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Filament
exports.updateFilament = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;

    console.log(
      "Received PUT request to update filament with ID: ",
      filamentId
    );

    // Find the filament and update it
    const updatedFilament = await Filament.findByIdAndUpdate(
      filamentId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedFilament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.status(200).json({
      message: "Filament updated successfully",
      data: updatedFilament,
    });
  } catch (error) {
    console.error("Error updating filament:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Filament
exports.deleteFilament = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;

    console.log(
      "Received DELETE request to delete filament with ID: ",
      filamentId
    );

    // Delete the filament
    const deletedFilament = await Filament.findByIdAndDelete(filamentId);

    if (!deletedFilament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.status(200).json({
      message: "Filament deleted successfully",
      filamentId: filamentId,
    });
  } catch (error) {
    console.error("Error deleting filament:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Filament
exports.getFilament = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;

    console.log("Received GET request to fetch filament with ID: ", filamentId);

    const filament = await Filament.findById(filamentId);

    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    res.status(200).json({ data: filament });
  } catch (error) {
    console.error("Error fetching filament:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Rest of the code for Subtraction Controllers remains the same
// ...

//----------------------------------------------------------------
// SUBTRACTION CONTROLLERS
// Create Subtraction
exports.createSubtraction = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    const { subtractionLength } = req.body;

    console.log(
      "Received POST request to create a new subtraction for filament with ID: ",
      filamentId
    );

    // Find the filament and add the new subtraction
    const filament = await Filament.findById(filamentId);
    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }

    // Create a new subtraction
    const newSubtraction = {
      subtractionLength,
    };

    // Add the new subtraction to the subtractions array
    filament.subtractions.push(newSubtraction);

    // Recalculate the current amount based on the updated subtractions
    filament.recalculateCurrentAmount();

    // Save the filament with the new subtraction and updated currentAmount
    await filament.save();
    console.log(filament);

    // Sending back the newly added subtraction along with updated filament data
    res.status(201).json({
      message: "Subtraction added successfully",
      data: filament,
      newSubtraction: filament.subtractions[filament.subtractions.length - 1], // Last element in the array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Subtractions
exports.getSubtractions = async (req, res) => {
  try {
    const filamentId = req.params.filamentId;
    console.log(
      "Received GET request to fetch subtractions for filament with ID: ",
      filamentId
    );

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

    console.log(
      "Received PUT request to update subtraction with ID: ",
      subtractionId
    );

    // Find the filament and update the specific subtraction
    const filament = await Filament.findById(filamentId);
    const subtraction = filament.subtractions.id(subtractionId);

    if (subtraction) {
      Object.assign(subtraction, updateData);
      filament.recalculateCurrentAmount(); // Recalculate the current amount
      await filament.save();
      console.log(filament);
      res.json({
        message: "Subtraction updated successfully",
        data: subtraction,
      });
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

    console.log(
      "Received DELETE request to delete subtraction with ID: ",
      subtractionId
    );

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
