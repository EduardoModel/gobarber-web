import { toast } from 'react-toastify';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { updateProfileFailure, updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    // Object assing serves to unify 2 objects
    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Profile updated successfuly!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Error at updating profile! Please check your data!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
