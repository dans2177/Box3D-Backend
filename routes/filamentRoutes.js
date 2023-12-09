const express = require("express");
const router = express.Router();
const filamentController = require("../controllers/filamentController");


router.get("/", filamentController.getFilaments);
router.post("/", filamentController.postFilament);

module.exports = router;
