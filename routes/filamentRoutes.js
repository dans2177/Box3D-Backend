const express = require("express");
const router = express.Router();
const filamentController = require("../controllers/filamentController");

// Filament Router
router.get("/", filamentController.getFilaments);
router.post("/", filamentController.postFilament);
router.post("/subtract", filamentController.createSubtraction);
router.post("/remSubtract", filamentController.deleteSubtraction);


module.exports = router;
