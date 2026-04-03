const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

// Use environment variables for client ID, secret, and callback URL
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL, // dynamic callback URL
    },
    (accessToken, refreshToken, profile, done) => {
     
      return done(null, profile);
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
