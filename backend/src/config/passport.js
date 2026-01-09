import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

export default function passportConfig() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_REDIRECT_URI
            },
            // verify callback
            async (accessToken, refreshToken, profile, done) => {
                try{
                    //profile contains google info
                    const email = profile.emails?.[0]?.value;
                    const name = profile.displayName;
                    const avatar = profile.photos?.[0]?.value;

                    let user = await User.findOne({ email });

                    if (!user) {
                        user = await User.create({
                            name,
                            email,
                            password: Math.random().toString(36).slice(-8), // placeholder; user will use oauth
                            role: "student",
                            avatar,
                            oauthProvider: "google",
                            oauthId: profile.id
                        });
                    } else {
                        user.oauthProvider = "google";
                        user.oauthId = profile.id;
                        if (!user.avatar && avatar) user.avatar = avatar;
                        await user.save();
                    }
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );

    // passport serialize
    passport.serializeUser((user, done) => done(null, user._id));

    //passport deserialize
    passport.deserializeUser( async (id, done) => {
        const user = await User.findById(id);
        done(null, user)
    })
}