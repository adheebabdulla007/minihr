import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';

const EmployeeRow = ({ emp }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: emp.name,
    email: emp.email,
    department: emp.department,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    const empRef = doc(db, 'employees', emp.id);
    await updateDoc(empRef, {
      name: formData.name,
      email: formData.email,
      department: formData.department,
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteDoc(doc(db, 'employees', emp.id));
    }
  };

  return (
    <li>
      {editing ? (
        <>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input name="department" value={formData.department} onChange={handleChange} />
          <button onClick={handleUpdate}>💾 Save</button>
          <button onClick={() => setEditing(false)}>❌ Cancel</button>
        </>
      ) : (
        <>
          <strong>{emp.name}</strong> — {emp.department} — {emp.email}
          <button onClick={() => setEditing(true)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑 Delete</button>
        </>
      )}
    </li>
  );
};

export default EmployeeRow;
