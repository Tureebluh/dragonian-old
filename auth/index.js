import passport from '../steampassport';
import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('../views/login');
});

router.post('/login', passport.authenticate('openid'));

router.get('/login/return', passport.authenticate('openid', {successRedirect: '/', failureRedirect: '/auth/login'}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(req.get('Referer') || '/');
});

export default router;