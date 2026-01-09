import  express from 'express';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import { protect } from '../middleware/authMiddleware.js';
import {
    registerUser,
    loginUser,
    oauthCallback,
    refreshToken,
    logout,
    uploadAvatar,
    getCurrentUser,
    resetPassword
} from '../controllers/authController.js';
const router = express.Router();

// Configure rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});


// Local auth
router.post('/register', uploadAvatar, registerUser);
router.post('/login', loginUser);
router.post('/refreshs', refreshToken);
router.post('/logout', logout);
router.post('/reset-password', resetPassword);

// OAuth google
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

// callback route
router.get("/google/callback", passport.authenticate("google",
    {
        session: false, failureRedirect: "/login"
    }),
    oauthCallback
);

// Get current user
router.get('/me', protect, getCurrentUser);

export default router;