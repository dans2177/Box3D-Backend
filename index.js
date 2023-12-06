const express = require("express");
const app = express();
const port = 3000;
const { setupKinde, jwtVerify } = require("@kinde-oss/kinde-node-express");
const cors = require("cors");

const config = {
  clientId: "b98f8f1756d14105ad549351b5e67855",
  issuerBaseUrl: "https://shemonindustries.kinde.com",
  siteUrl: "http://localhost:3000",
  secret: "Qi7SowBpxxeOry1gRzyEfzrTe0gU21VBKFpRWqACz5R7POpMz8K",
  redirectUrl: "http://localhost:3000",
};
const verifier = jwtVerify("https://shemonindustries.kinde.com");
// Mock filament data
const mockFilamentData = [
  {
    id: 1,
    type: "PLA",
    color: "Red",
    weight: "1kg",
    temperature: "200°C",
  },
  {
    id: 2,
    type: "ABS",
    color: "Blue",
    weight: "0.5kg",
    temperature: "230°C",
  },
  // Add more filament items as needed
];

app.use(cors());

setupKinde(config, app);

app.get("/", (req, res) => {
  res.json("data", mockFilamentData);
  console.log("Hello World!");
});

// Route to fetch filament data
app.get("/filament-data", verifier, (req, res) => {
  console.log("Fetching filament data...");
  console.log(req.user);
  try {
    // Send back the mock filament data
    res.json({ data: mockFilamentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
