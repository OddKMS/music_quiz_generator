import { authenticate } from '#lib/Auth';
import { addMinutes, differenceInMinutes } from 'date-fns';
import { useState, createContext, ReactElement, useEffect } from 'react';

const AuthContext = createContext<{
  appAuth: AuthenticationObject;
}>(null);

export function AuthenticationProvider({ children }): ReactElement {
  const [appAuth, setAppAuth] = useState<AuthenticationObject>();
  const [tokenExpires, setTokenExpires] = useState(new Date());

  // Don't reauthenticate unless there is less
  // than five minutes until token expiry
  const getAppAuthentication = async () => {
    const currentTime = new Date();

    if (differenceInMinutes(tokenExpires, currentTime) <= 300) {
      await authenticate().then((authObject) => {
        setTokenExpires(addMinutes(new Date(), authObject.expires_in));
        setAppAuth(authObject);
      });
    } else {
      setAppAuth({ ...appAuth, expires_in: 20 });
    }
  };

  useEffect(() => {
    getAppAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ appAuth }}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
