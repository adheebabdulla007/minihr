import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddEmployee = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (role !== 'hr') return <p>Access Denied: Only HRs can add employees.</p>;

  return (
    <div>
      <h2>Add Employee</h2>
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
          phone: Yup.string().matches(/^\d+$/, 'Digits only').required('Required'),
          joiningDate: Yup.date().required('Required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addDoc(collection(db, 'employees'), values);
            resetForm();
            navigate('/employees');
          } catch (err) {
            console.error('Error adding employee:', err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <label>Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label>Department</label>
          <Field name="department" type="text" />
          <ErrorMessage name="department" />

          <label>Phone</label>
          <Field name="phone" type="text" />
          <ErrorMessage name="phone" />

          <label>Joining Date</label>
          <Field name="joiningDate" type="date" />
          <ErrorMessage name="joiningDate" />

          <button type="submit">Add Employee</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddEmployee;
