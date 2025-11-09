const Student = require('../models/Student');

/** 
 * 
 * Get all Student
 * 
*/
async function index(req, res) {
    const students = await Student.find();
    res.json(students);
}

/**
 *
 * Create a new Student
 *  
*/
const create = async (req, res) => {
    const newStudent = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age
    });
    
    await newStudent.save();
    res.json(newStudent);
}

/**
 *
 * Show a Student
 *  
*/
const show = async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
}

/**
 *
 * Update a Student
 *  
*/
const update = async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
}

/**
 *
 * destroy a Student
 *  
*/
const destroy = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Student supprimé avec succès' })
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
}