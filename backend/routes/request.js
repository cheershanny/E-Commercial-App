const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectUrl = 'http://127.0.0.1:3000/oauth'
  const oAuth2Client = new OAuth2Client(
    // add clientId and secret
  )

});
