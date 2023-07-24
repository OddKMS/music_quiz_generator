import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { authenticate } from '#lib/Auth';

function App() {
  const [count, setCount] = useState(0);
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>Authenticate test</div>
      <div>Access token: {auth.access_token}</div>
      <div>Type: {auth.token_type}</div>
      <div>Expires in: {auth.expires_in}</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
