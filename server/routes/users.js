const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', {session: false});
const passportFacebook = passport.authenticate('facebookToken', {session: false});

const bodyValidator = validateBody(schemas.authSchema);

router.route('/signup')
    .post(bodyValidator, UsersController.signUp);

router.route('/signin')
    .post(bodyValidator, passportLocal, UsersController.signIn);

router.route('/secret')
    .get(passportJWT, UsersController.secret);

router.route('/oauth/google')
    .post(passportGoogle, UsersController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.facebookOAuth);

module.exports = router;