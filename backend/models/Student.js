const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: [true, 'le prenom est obligatoire']
    },
    lastName: { 
        type: String,
        required: [true, 'le nom est obligatoire']
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true
    },
    age: { 
        type: Number,
        required: [true, 'l']
    }
});

module.exports = mongoose.model('Student', StudentSchema)