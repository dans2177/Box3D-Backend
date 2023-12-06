const express = require("express");
const app = express();
const port = 3000;
const {
  setupKinde,
  jwtVerify,
} = require("@kinde-oss/kinde-node-express");
const cors = require("cors");

const config = {
  clientId: "b98f8f1756d14105ad549351b5e67855",
  issuerBaseUrl: "https://shemonindustries.kinde.com",
  siteUrl: "http://localhost:3000",
  secret: "Qi7SowBpxxeOry1gRzyEfzrTe0gU21VBKFpRWqACz5R7POpMz8K",
  redirectUrl: "http://localhost:3000",
};
const verifier = jwtVerify("https://shemonindustries.kinde.com");

app.use(cors());

setupKinde(config, app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/some-route", jwtVerify, (req, res) => {
  res.json({ message: "Hello World!" });
  console.log(req.user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
