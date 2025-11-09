import React, { useState, useEffect } from "react";
import axios from 'axios';
import AddStudent from "./addStudent";
import Student from "./student";
import './style/studentList.css'

function StudentList(){
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get('http://localhost:5000/api/etudiant');
            setStudents(response.data)
        };
        fetchStudent();
    }, []);

    const addStudent = (student) => {
        setStudents([...students, student]);
    }

    const removeStudent = (id) => {
        setStudents(students.filter(
            (student) => student._id !== id
        ));
    }

    const updateStudent = (updatedStudent) => {
        setStudents(students.map(
            student => (student._id === updatedStudent.id ? updateStudent : student)
        ));
    }

    return (
        <div className="studentlist-container">
            <h1 className="studentlist-title">Student List</h1>
            <div className="addstudent-wrapper">
                <AddStudent addStudent={addStudent} />
            </div>

            <div className="students-wrapper">
                {students.map(student => (
                    <div className="student-item" key={student._id}>
                        <Student student={student}
                            removeStudent={removeStudent} updateStudent={updateStudent}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentList;