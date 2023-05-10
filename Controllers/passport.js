const passport = require ("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "60918447104-maa4st4d5k7hkosjov3njmkoql27q19q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8900/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   done(null, profile);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})