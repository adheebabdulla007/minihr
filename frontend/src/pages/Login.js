import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../firebase/auth';
import { getUserRole } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
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
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
