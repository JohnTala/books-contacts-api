const router = require('express').Router();
const passport = require('passport');

// --------------------
// OAuth Routes with Swagger comments
// --------------------

// Login with GitHub
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/github'
 * #swagger.method = 'get'
 */
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/github/redirect'
 * #swagger.method = 'get'
 */
router.get('/github/redirect',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs'); // or homepage
  }
);

// Logout
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/logout'
 * #swagger.method = 'get'
 */
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Get current authenticated user
/**
 * #swagger.tags = ['Auth']
 * #swagger.path = '/auth/me'
 * #swagger.method = 'get'
 */
router.get('/me', (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
