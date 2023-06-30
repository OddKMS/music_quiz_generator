export function Authenticator() {
  function authenticateWithSpotify() {
    const authObj = { access_token: 'tokenToken' };

    return authObj;
  }

  /**
   * Authenticates the user
   * @returns
   */
  function authenticate() {
    const auth = authenticateWithSpotify();

    return auth;
  }

  return { authenticate };
}
