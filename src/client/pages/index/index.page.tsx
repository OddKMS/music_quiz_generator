import React, { useState } from 'react';
import { Counter } from '#components/Counter';
import { authenticate } from '#lib/Auth';

function Page() {
  const [auth, setAuth] = useState<AuthenticationObject>({
    access_token: '',
    token_type: '',
    expires_in: 0,
  });

  authenticate().then(() => {
    setAuth;
  });

  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}

export { Page };
