// src/components/EmployeeRow.js
import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EmployeeRow = ({ emp }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: emp.name,
    email: emp.email,
    department: emp.department,
    joiningDate: emp.joiningDate,
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
      ...formData,
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteDoc(doc(db, 'employees', emp.id));
    }
  };

  return (
    <div className="table-row">
      {editing ? (
        <>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input name="department" value={formData.department} onChange={handleChange} />
          <input name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
          <div className="row-actions">
            <button className="save-btn" onClick={handleUpdate}>
              💾
            </button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>
              ✖
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{emp.name}</span>
          <span>{emp.email}</span>
          <span>
            <span className="badge">{emp.department || 'Unknown'}</span>
          </span>
          <span>{emp.joiningDate || '-'}</span>
          <div className="row-actions">
            <button onClick={() => setEditing(true)}>✏️</button>
            <button onClick={handleDelete}>🗑</button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeRow;
