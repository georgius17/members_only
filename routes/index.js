const express = require('express');
const router = express.Router();

const passport = require("passport");

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/sign-in');
};

router.get('/', messageController.index);
router.get('/create-message', isAuthenticated, messageController.create_message_get)
router.post('/create-message', isAuthenticated, messageController.create_message_post)
router.get('/message/:id/delete', isAuthenticated, messageController.message_delete_get)

router.get('/sign-in', userController.sign_in_get);
router.post('/sign-in', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/sign-up",
  failureFlash: true
}));
router.get('/sign-up', userController.sign_up_get);
router.post('/sign-up', userController.sign_up_post);
router.get('/become-member', isAuthenticated, userController.become_member_get)
router.post('/become-member', isAuthenticated, userController.become_member_post)
router.get('/become-admin', isAuthenticated, userController.become_admin_get)
router.post('/become-admin', isAuthenticated, userController.become_admin_post)


router.get('/log-out', (req, res, next) => {
  req.logout();
  res.redirect("/");
})



module.exports = router;
