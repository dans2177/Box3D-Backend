const express = require("express");
const router = express.Router();
const filamentController = require("../controllers/filamentController");

// Routes for Filament
router.get("/", filamentController.getFilaments);
router.get("/:filamentId", filamentController.getFilament);
router.post("/", filamentController.postFilament);
router.put("/:filamentId", filamentController.updateFilament);
router.delete("/:filamentId", filamentController.deleteFilament);

// Routes for Subtractions
router.post("/:filamentId/subtraction", filamentController.createSubtraction); // Adds a subtraction to a filament
router.put(
  "/:filamentId/subtraction/:subtractionId",
  filamentController.updateSubtraction
);
router.delete(
  "/:filamentId/subtraction/:subtractionId",
  filamentController.deleteSubtraction
);
router.get(
  "/:filamentId/subtraction/:subtractionId",
  filamentController.getSubtractions
);

module.exports = router;
