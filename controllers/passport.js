const jwtStrategy = require('passport-jwt').Strategy;
const exstractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('../config/key');

const options = {
    jwtFromRequest: exstractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
passport.use(
    new jwtStrategy(options, async (payload, done) => {
        try {
            console.log('jwtPayload = ', payload);
        const user = await User.findById(payload.userId).select('email id');

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch(error) { console.log(error)}
    })
)
}