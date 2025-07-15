import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Signup</h2>
      <Formik
        initialValues={{ email: '', password: '', role: 'employee' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
          role: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signup(values.email, values.password, values.role);
            navigate('/dashboard');
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

          <label>Role</label>
          <Field as="select" name="role">
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </Field>
          <ErrorMessage name="role" />

          <button type="submit">Signup</button>
        </Form>
      </Formik>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
