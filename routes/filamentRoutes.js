const express = require("express");
const router = express.Router();
const filamentController = require("../controllers/filamentController");
const { jwtVerify } = require("@kinde-oss/kinde-node-express");

const verifier = jwtVerify("https://shemonindustries.kinde.com");

router.get("/", verifier, filamentController.getFilaments);
router.get("/:id", verifier, filamentController.getFilament);
router.post("/", verifier, filamentController.createFilament);


module.exports = router;
