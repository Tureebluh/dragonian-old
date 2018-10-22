import passport from '../steampassport';
import express from 'express';

const router = express.Router();

//Passport handles login authentication and redirects to STEAM if it fails
router.get('/login', passport.authenticate('openid'));

//Return endpoint after user has logged in. If login was unsuccessful, redirect to login route again.
//If login was successful send user to homepage
router.get('/login/return', passport.authenticate('openid', {
  successRedirect: '/',
  failureRedirect: '/auth/failed'
}));

router.get('/failed', (req, res) => {
  res.render('app/failedlogin');
});

//Destroy the session and redirect to homepage
router.get('/logout', (req, res) => {
  if(req.isAuthenticated()){
    req.session.destroy();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

export default router;