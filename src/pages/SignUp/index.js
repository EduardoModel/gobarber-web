import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Link } from 'react-router-dom';

import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('The name is requiered'),
  email: Yup.string()
    .email('Insert a valid email address')
    .required('The email address is requiered'),
  password: Yup.string()
    .min(6, 'The password should contain at least 6 characters')
    .required('The password is requiered'),
});
function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Your name" />
        <Input name="email" type="email" placeholder="Your email address" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">Create account</button>
        <Link to="/">{loading ? 'Loading...' : 'Sign In'}</Link>
      </Form>
    </>
  );
}

export default SignUp;
