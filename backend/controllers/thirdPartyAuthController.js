const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

exports.googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreate("google", profile.id, profile);
        return done(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error);
      }
    }
  );
  
  exports.facebookStrategy = new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreate("facebook", profile.id, profile);
        return done(null, user);
      } catch (error) {
        console.error("Error in FacebookStrategy:", error);
        return done(error);
      }
    }
  );
  