import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, getUserRole } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min(6, 'Min 6 chars').required('Required'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const userCredential = await login(values.email, values.password);
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
        <Form>
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
      <p>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
