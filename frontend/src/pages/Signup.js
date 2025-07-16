import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup, getUserRole } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/global.css'; // Ensure styles are applied

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <h2 className="auth-title">Create Your Account</h2>

        <Formik
          initialValues={{ email: '', password: '', role: 'employee' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
            role: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const userCredential = await signup(values.email, values.password, values.role);
              const uid = userCredential.user.uid;
              const role = await getUserRole(uid);
              navigate(role === 'hr' ? '/dashboard' : '/employee-dashboard');
            } catch (error) {
              setErrors({ email: error.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="input" />
              <ErrorMessage name="email" component="div" className="error" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="input" />
              <ErrorMessage name="password" component="div" className="error" />

              <label htmlFor="role">Role</label>
              <Field as="select" name="role" className="input">
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </Field>
              <ErrorMessage name="role" component="div" className="error" />

              <button type="submit" className="btn primary" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Signup'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="auth-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
