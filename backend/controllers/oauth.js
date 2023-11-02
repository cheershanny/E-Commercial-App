const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

exports.verifyGoogle = async (client_id, jwtToken) => {
  const client = new OAuth2Client(client_id);
  const ticket = await client.verifyIdToken({
    idToken: jwtToken,
    audience: client_id,
  });

  const payload = ticket.getPayload();
  return payload;
};
