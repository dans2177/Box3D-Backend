require("dotenv").config();

module.exports = {
  clientId: process.env.clientId,
  issuerBaseUrl: "https://account.3dlogbook.com",
  siteUrl: "http://localhost:3000",
  secret: process.env.secret,
  redirectUrl: "http://localhost:3000",
};
