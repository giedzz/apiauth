const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');


// JSON WEB TOKEN strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exist handle it
        if(!user){
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Google oauth strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '539203805313-drqnpvhgrpe1cksing45phl55v4vhuab.apps.googleusercontent.com',
    clientSecret: 'mjKByzHyoddGsCpT3K9W-GjO'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);

        //Check whether this user exists in our DB
        const existingUser = await User.findOne({
            "google.id": profile.id
        });
        if (existingUser) {
            console.log('user already exists in the DB');
            return done(null, existingUser);
        }

        //If new account
        console.log('user doesn\'t exists in the DB, we are creating a new one');
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error,false, error.message);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    //username and password
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "local.email":email });
        // If not, handle it
        if(!user){
            return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If not, handle it
        if(!isMatch){
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));