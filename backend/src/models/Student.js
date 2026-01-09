import mongoose from "mongoose";

export const studentSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    numeroMatricule: { type: String, unique: true, required: true ,  default:" "},
    dateNaissance: { type: Date,  default:"" },
    lieuNaissance: { type: String,  default:"" },
    nationalite : { type: String, defaut: ""},
    sexe: { type: String, enum: ['M', 'F'],  default:"" },
    telephone: { type: String,  default:"" },
    adresse: { type: String,  default:"" },
    region: { type: String,  default:"" },
    etablissement: { type: String,  default:"" },
    niveau: { type: "String" ,  default:""},
    filiere: { type: String, default:""},
});

export default mongoose.model('Student', studentSchema);