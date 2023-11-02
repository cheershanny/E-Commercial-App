const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

exports.requestGoogle = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectUrl = "http://127.0.0.1:3000/oauth";
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", //use for development env
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
  res.json({url: authorizeUrl})
};
