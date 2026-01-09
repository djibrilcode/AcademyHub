import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { sendInitialPasswordEmail } from "../services/emailService.js";

// Rôles autorisés à être créés par cette route (ecxlut 'student )
const PRIVILEGED_ROLES = ['institution-user', 'agency-admin', 'super-admin'];

export const createUserByAdmin = async (req, res) => 
{
    const { name, email, password, role } = req.body;

    // ------Validation de base -------
    if (!name || !email || !password || !role) {
       return res.status(400).json({ message: 'Tous les champs (name, email, passsword, rôle) sont requis.' })
    }

    try {
        // --------- Vérification si l'utilisateur existe déja -------
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Un utilisateur avec cet mail existe déjà.' });
        }

        // --- Génération du Jeton d'activation du mot de passe ---
        const token = crypto.randomBytes(32).toString('hex');
        const expiry = Date.now() + 3600000; // 1 heure d'expiration

        const tempPassword = Math.random().toString(36).slice(-8);

        // --- Création de l'utilisateur ---
        const newUser = await User.create({
            name,
            email,
            password : tempPassword,
            role,
            is_verified: true,
            verficationToken: token,
            verificationTokenExpiry: expiry
        })

        // --- Notification par mail au nouvel utilisateur ---
        // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        // await sendInitialPasswordEmail(email, role, resetLink)

        res.status(201).json({
            message: `Compte ${email} créé avec succès en tant que ${role}. Email d'activation envoyé`,
            userId: newUser._id
        })
    } catch (error) {
        console.error('Erreur lors de la création d\'utilisateur par l\'admin:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la création du compte.' + error.message });
    }
    
}