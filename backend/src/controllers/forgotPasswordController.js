import crypto from 'crypto'
import User from '../models/User.js';
import { sendPasswordResetEmail } from '../services/emailService.js';

// Demande de reinitialisation
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