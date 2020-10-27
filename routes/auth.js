const express = require("express")
const router = express.Router()
const passport = require("passport")

//google auth
router.get("/google", passport.authenticate("google", { scope: ["openid", "profile"] }))

//callback
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard")
})

/* can use for debugging
router.get('/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
        console.log(err);
        console.log(user);
        console.log(info);
        if (err) {
            res.status(401).send(err);
        } else if (!user) {
            res.status(401).send(info);
        } else {
            next();
        }
    })(req, res, next);
}, (req, res) => {
    res.redirect("/dashboard")
});
*/

//logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

module.exports = router