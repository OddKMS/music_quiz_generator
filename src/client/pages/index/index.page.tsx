import React, { useState } from 'react';
import { Counter } from '#components/Counter';

function Page({ auth }) {
  // const [auth, setAuth] = useState<AuthenticationObject>({
  //   access_token: '',
  //   token_type: '',
  //   expires_in: 0,
  // });

  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
          <div>Authenticate test</div>
          <div>Access token: {auth?.access_token}</div>
          <div>Type: {auth?.token_type}</div>
          <div>Expires in: {auth?.expires_in}</div>
        </li>
      </ul>
    </>
  );
}

export { Page };
