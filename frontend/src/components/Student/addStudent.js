import React, { useState } from "react";
import axios from "axios";

const AddStudent = ({ addStudent }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(firstName && lastName && email && age) {
            const response = await axios.post('http://localhost:5000/api/etudiant',{ firstName, lastName, email, age });
            addStudent(response.data);
            setFirstName('');
            setLastName('');
            setEmail('');
            setAge(0);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your firstName"
            />
            <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your lastName"
            />
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <input 
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your Age"
            />

            <button type="submit">Add</button>
        </form>
    );
}

export default AddStudent;