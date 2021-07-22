import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';
import api from '~/services/api';

import logo from '~/assets/logo-purple.svg';

function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  // To referenciate a field to retrieve his information afterwards‚
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(event) {
    const data = new FormData();

    data.append('file', event.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    // Save the id of the new avatar picture as well the url to show it to the user
    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || logo} alt="" />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default AvatarInput;
