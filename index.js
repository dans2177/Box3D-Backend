const express = require("express");
const cors = require("cors");
const filamentRoutes = require("./routes/filamentRoutes");
const { setupKinde, jwtVerify } = require("@kinde-oss/kinde-node-express");
const config = require("./config/config");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI, {})
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(cors());
setupKinde(config, app);

app.use("/filament-data", filamentRoutes);
app.use("/project-data", projectRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
