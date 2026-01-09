import Student from "../models/Student.js";
import User from "../models/User.js";

export const getStudents = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const getStudentById = async(req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({ message: "Student not found" });

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createStudent = async (req, res) => {
    try {
        const userId = req.user.id;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        // vérifier s'il a déja un profile
        const existing = await Student.findOne({ user_id: userId });
        if(existing) return res.status(404).json({ message: "le profil étudiant exite déja" });

        const student = await Student.create(req.body);
        
        res.status(201).json({ message: "Profil etudiant complété avec succès", etudiant });
    } catch (error) {
        res.status(500).json({ message: "server erreur", error: error.message });
    }
}

export const updateStudent = async (req, res) =>  {
    try {
        const studentUpdated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({ message: "Modification effectué avec succès", studentUpdated })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

export const deleteStudent = async (res, req) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Utilisateurs supprimer avec succès" })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });       
    }
}