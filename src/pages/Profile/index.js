import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';
import { signOut } from '~/store/modules/auth/actions';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  async function handleUpdateForm() {
    console.tron.log('Updating form');
  }

  async function handleSubmit(data) {
    // Fire the request to update the profile
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Your name" />
        <Input name="email" type="email" placeholder="Your E-Mail address" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Your current password"
        />
        <Input type="password" name="password" placeholder="New password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your new password"
        />

        <button type="submit" onClick={() => handleUpdateForm()}>
          Update profile
        </button>
      </Form>

      <button type="button" onClick={() => handleSignOut()}>
        Logout
      </button>
    </Container>
  );
}

export default Profile;
