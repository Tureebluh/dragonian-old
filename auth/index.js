import passport from '../steampassport';
import express from 'express';

const router = express.Router();

router.get('/login', passport.authenticate('openid'));

router.get('/login/return', passport.authenticate('openid', {successRedirect: '/', failureRedirect: '/auth/login'}));

router.get('/logout', (req, res) => {
  if(req.isAuthenticated()){
    req.session.destroy();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

export default router;