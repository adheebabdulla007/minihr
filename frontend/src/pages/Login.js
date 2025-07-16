import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, getUserRole } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const userCredential = await login(values.email, values.password);
              const uid = userCredential.user.uid;
              const role = await getUserRole(uid);

              if (role === 'hr') {
                navigate('/dashboard');
              } else {
                navigate('/employee-dashboard');
              }
            } catch (error) {
              setErrors({ email: error.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className="auth-form">
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" className="btn primary">
              Login
            </button>
          </Form>
        </Formik>

        <p className="auth-link">
          Don’t have an account?{' '}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
