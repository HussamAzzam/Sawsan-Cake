import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { upsertGoogleUser } from "../services/authService.js";

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            if (!profile._json?.email_verified) {
                return done(new Error("A verified Google email is required"));
            }

            const user = await upsertGoogleUser({
                googleId: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
                avatar: profile.photos?.[0]?.value,
            });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

export default passport;