const router = require('express').Router();
const passport = require('passport');

// --------------------
// Home page
// --------------------
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/'
 * #swagger.method = 'get'
 */
router.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.send('<h1>Welcome to OAuth2.0 Homepage</h1>');
});

// --------------------
// Login with GitHub (browser only)
// --------------------
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/github'
 * #swagger.method = 'get'
 * #swagger.description = 'Redirects user to GitHub for OAuth login'
 */
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// --------------------
// GitHub callback
// --------------------
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/github/redirect'
 * #swagger.method = 'get'
 * #swagger.description = 'GitHub OAuth callback route'
 */
router.get(
  '/github/redirect',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // After successful login, redirect user to profile page
    res.redirect('/auth/profile');
  }
);

// --------------------
// Logout
// --------------------
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/logout'
 * #swagger.method = 'get'
 * #swagger.description = 'Logout the current user'
 */
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// --------------------
// Get current authenticated user
// --------------------
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/profile'
 * #swagger.method = 'get'
 * #swagger.description = 'Returns the currently logged-in user as JSON'
 */
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.status(200).json({
    id: req.user.id || null,
    username: req.user.username || req.user.displayName || null,
    emails: req.user.emails || [],
    provider: req.user.provider || 'github',
  });
});

module.exports = router;
