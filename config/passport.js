const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const User = require("../models/users")

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, done) => {
            /*
            const newUser = {
                googleID: profile.id,
                displayName: profile.displayName,
            }
            */

            try {
                let user = await User.findOne({ googleID: profile.id })
                console.log(profile.id)
                console.log(user)
                if (user) {
                    console.log("found user")
                    done(null, user)

                    /* uncomment to be able to add users
                    } else {
                        user = await User.create(newUser)
                        done(null, user)
                    }
                    */

                } else {
                    console.log("did not find user")
                    done(null, false, { errorMessage: "not an authorized user" })
                }

            } catch (err) {
                console.log("error")
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    });
}