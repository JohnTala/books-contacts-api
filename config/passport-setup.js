const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      // You could save user to DB here if needed
      return done(null, profile);
    }
  )
);

// Save user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Get user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
