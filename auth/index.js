import passport from '../steampassport';
import express from 'express';

const router = express.Router();

router.post('/login', passport.authenticate('openid'));

router.get('/login/return', passport.authenticate('openid'),
  (req, res) => {
    if(req.isAuthenticated()){
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(req.get('Referer') || '/');
});

export default router;