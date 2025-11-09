import React from 'react'
import './style/student.css'

const Student = ({ student, removeStudent, updateStudent }) => {
    const handleRemove = () => {
        removeStudent(student._id);
    }
    const handleUpdate = () => {
        updateStudent(student._id);
    }
    return (
        <div className="student-container">
            <table className="student-table">
                <thead className="student-thead">
                    <tr className="student-row">
                        <th className="student-th">Prenom</th>
                        <th className="student-th">Nom</th>
                        <th className="student-th">Email</th>
                        <th className="student-th">Age</th>
                        <th className="student-th" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody className="student-tbody">
                    <tr className="student-row">
                        <td className="student-td">{ student.firstName }</td>
                        <td className="student-td">{ student.lastName }</td>
                        <td className="student-td">{ student.email }</td>
                        <td className="student-td">{ student.age }</td>
                        <td className="student-td">
                            <button className="btn btn-remove" onClick={handleRemove}>Supprimer</button>
                        </td>
                        <td className="student-td">
                            <button className="btn btn-edit" onClick={handleUpdate}>Modifier</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Student