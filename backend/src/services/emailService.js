import nodemailer from 'nodemailer'

// ---- Congfiguration du transporteur Nodemailer ----
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c79c0feea5439b",
        pass: "****a425"
    }
});

export const sendInitialPasswordEmail = async (email, role, resetLink) => {
    const roleText = (role === 'agency-admin' || role === 'super-admin') 
    ? "d'accès en tant qu'administrateur"
    : "d'accès en tant qu'utilisateur institutionnel";
 
    const mailOptions = {
        from: `"AcademyHub administration" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `Votre compte sur la plateforme AcademyHub a été créé - Définissez votre mot de passe`,
        html: `
            <div style="font-family: 'Roboto', sans-serif; color: #202124; line-height: 1.6;">
                <h2 style="color: var(--primary);">${role.toUpperCase()} - Compte Créé</h2>
                <p>Cher/Chère partenaire,</p>
                <p>Nous vous informons que votre compte ${roleText} sur la plateforme AcademyHub a été créé par l'administrateur.</p>
                
                <p><strong>Par mesure de sécurité</strong>, vous devez définir votre mot de passe initial en cliquant sur le lien ci-dessous. Ce lien expirera dans une heure.</p>
                
                <a 
                    href="${resetLink}" 
                    style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: var(--primary); color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;"
                >
                    Définir Mon Mot de Passe
                </a>
                
                <p>Si le bouton ne fonctionne pas, copiez et collez le lien dans votre navigateur :</p>
                <p><a href="${resetLink}">${resetLink}</a></p>
                
                <p>Cordialement,<br>L'équipe AcademyHub</p>
            </div>
        `
    }

    try {
        console.log('console.log avant d\'envoyer');
        let info = await transporter.sendMail(mailOptions);
        console.log(`Email de provisionnement envoyé à ${email}. ID: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${email}:`, error);
        throw new Error("Échec de l'envoi de l'email via Nodemailer.");
    }
}

export const sendPasswordResetEmail = async (email, resetLink) => {
    const mailOptions = {
        from: `"AcademyHub Support" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `Réinitialisation de votre mot de passe AcademyHub`,
        html: `
            <div style="font-family: 'Roboto', sans-serif; color: #202124; line-height: 1.6;">
                <h2 style="color: #FBB437;">Mot de Passe Oublié</h2>
                <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte AcademyHub.</p>
                <p>Si vous êtes à l'origine de cette demande, veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe. Ce lien expirera dans 30 minutes.</p>
                
                <a 
                    href="${resetLink}" 
                    style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #1A73E8; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;"
                >
                    Réinitialiser Mon Mot de Passe
                </a>
                
                <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email. Votre mot de passe actuel restera inchangé.</p>
                
                <p>Cordialement,<br>L'équipe AcademyHub</p>
            </div>
        `
    }
    
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`Email de reinitialisation envoyé à ${email}. ID: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${email}:`, error);
        throw new Error("Échec de l'envoi de l'email via Nodemailer.");
    }
}

export const sendPasswordChangeConfirmation = async (email) => {
    const mailOptions = {
        from: `"AcademyHub Sécurité" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `Confirmation : Votre mot de passe AcademyHub a été changé.`,
        html: `
            <div style="font-family: 'Roboto', sans-serif; color: #202124; line-height: 1.6;">
                <h2 style="color: #00A693;">Mot de Passe Changé</h2>
                <p>Ceci est une confirmation que le mot de passe de votre compte AcademyHub a été changé avec succès.</p>
                <p>Si ce n'est pas vous qui avez effectué ce changement, veuillez contacter immédiatement le support.</p>
            </div>
        `
    }

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`Email de confirmation envoyé à ${email}. ID: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${email}:`, error);
        throw new Error("Échec de l'envoi de l'email via Nodemailer.");
    }
}