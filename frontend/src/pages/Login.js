import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
        })}
        onSubmit={(values) => {
          console.log(values); // will add firebase login later
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
    </div>
  );
};

export default Login;
