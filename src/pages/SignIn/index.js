import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert a valid email address')
    .required('The email address is requiered'),
  password: Yup.string().required('The password is requiered'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  // As a good practice is interesting to destructurate the recieved data
  // to leave explicit, which parameters the function is recieving
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your email address" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
        <Link to="/register">Sign Up</Link>
      </Form>
    </>
  );
}

export default SignIn;
