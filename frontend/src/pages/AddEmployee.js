import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AddEmployee.css'; // 🔄 Custom CSS for styling

const AddEmployee = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');

  if (role !== 'hr')
    return <p className="access-denied">Access Denied: Only HRs can add employees.</p>;

  return (
    <div className="add-employee-container">
      <div className="form-card slide-in">
        <h2>➕ Add New Employee</h2>

        {successMsg && <div className="success-message">{successMsg}</div>}

        <Formik
          initialValues={{
            name: '',
            email: '',
            department: '',
            phone: '',
            joiningDate: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            department: Yup.string().required('Required'),
            phone: Yup.string()
              .matches(/^\d+$/, 'Only digits allowed')
              .min(7)
              .max(15)
              .required('Required'),
            joiningDate: Yup.date().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await addDoc(collection(db, 'employees'), values);
              setSuccessMsg('✅ Employee added successfully!');
              resetForm();

              setTimeout(() => {
                setSuccessMsg('');
                navigate('/employees');
              }, 1500);
            } catch (err) {
              console.error('Error adding employee:', err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <Field name="name" type="text" className="input-field" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <Field name="email" type="email" className="input-field" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Department</label>
                <Field as="select" name="department" className="input-field">
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </Field>
                <ErrorMessage name="department" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <Field name="phone" type="text" className="input-field" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Joining Date</label>
                <Field name="joiningDate" type="date" className="input-field" />
                <ErrorMessage name="joiningDate" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Adding...' : 'Add Employee'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
