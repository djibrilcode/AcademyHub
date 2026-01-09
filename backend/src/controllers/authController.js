import User from '../models/User.js';
import Student from '../models/Student.js'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { sendPasswordChangeConfirmation } from '../services/emailService.js';

// Configuration multer pour l'upload d'avatar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Dossier de destination
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Seules les images sont autorisées'), false);
        }
    }
});

// Middleware pour l'upload d'avatar
export const uploadAvatar = upload.single('avatar');

// helper cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier les champs requis
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        // génération du token de vérification
        const token = crypto.randomBytes(32).toString('hex');

        const existing = await User.findOne({ email });
        if(existing) return res.status(400).json({ message:"Email already used" });

        // Gérer l'avatar si uploadé
        let avatarPath = null;
        if (req.file) {
            avatarPath = req.file.path;
        }

        if (role === "student") {
            await Student.create()
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            avatar: avatarPath
        });
        user.verificationToken = token;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.status(201).json({
            token: accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            },
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({ message: "Invalids credentials" });

        const passwordMatch = await user.matchPassword(password);
        if(!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);  

        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.status(200).json({
            token: accessToken,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }  
};

// OAuth callback: user is attached by passport
export const oauthCallback = async(req, res) => {
    try {
        const user = req.user;
        if(!user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);  
        // set cookie and redirect to frontend with token (or just redirect and frontend fetch)
        res.cookie("refreshToken", refreshToken, cookieOptions);
        // redirect to a frontend route that will call /api/auth/le to get user (cookie has refreh token)
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success?access_token=${accessToken}`);
    } catch (error) {
        res.status(500).json({ message: error.message });               
    }
};

// refresh endpoint
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token) return res.status(401).json({ message: "No refresh token" });

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user) return res.status(401).json({ message: "Invalid token user" });   

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // rotate refresh token
        res.cookie("refreshToken", newRefreshToken, cookieOptions);
        res.json({ token: newAccessToken, user });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Refresh token invalid or expired" });               
    }
};

// logout - clear refresh cookie
export const logout = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    res.json({ message: "logged out" });
}

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Envoi du mail de reinitialisation
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });        
    } 
        
    try {
        // Génération du token
        const token =  crypto.randomBytes(32).toString('hex');
        const expiry = 30 * 60 * 1000;

        user.resetPasswordToken = token;
        user.resetPasswordTokenExpiry = Date.now() + expiry;
        await user.save();

        // --- Notification par mail au nouvel utilisateur ---
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await sendPasswordResetEmail(user.email, resetLink)

        return res.status(200).json({ message: "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé." });
    } catch (error) {
        console.error('Erreur lors de la demande de reinitialisation :', error);
        res.status(500).json({ message: 'Erreur server '+error.message })
    }
}

// Reset newPassword
export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body;
    // Validation des données
    if (!token || !newPassword) {
        return  res.status(400).json({ message: 'Jeton et nouveau mot de passe requis.' }) 
    }

    // Validation de la force du mot de passe

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiry: { $gt: Date.now }
        });

        if (!user) {
            return res.status(400).json({  message: 'Jeton invalide ou expiré. Veuillez contactez votre administrateur' })
        }

        // Hacher le mot de passe
        const saltRound = 10;
        user.password = await bcrypt.hash(newPassword, saltRound);

        // Nétoyer les champs de jeton (à usage unique)
        user.initialPasswordToken = undefined;
        user.initialPasswordTokenExpiry = undefined;

        await user.save();

        await sendPasswordChangeConfimation(user.email)
        res.status(200).json({ message: 'Votre mot de passe a été mis à jour avec succès.' });

    } catch (error) {
        console.error('Erreur lors de la rénitialisation du mot de passe:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
}