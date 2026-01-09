import User from "../models/User.js";

export const  getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'erreur liée au serveur' })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message+' erreur liée au serveur' })
    }
} 

export const updateUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {  new: true});
        res.status(201).json({ message: 'Utilisateur modifié.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'erreur liée au serveur' })
    }
}

export const deleteUserById = async (req, res) => {
     const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(201).json({ message: 'Utilisateur Supprimé.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'erreur liée au serveur' })
    }
}

