import { authenticateWithSpotify } from '@helpers/SpotifyAuthenticator';

/**
 * Authenticates the user
 * @returns
 */
function authenticate() {
  const auth = authenticateWithSpotify('ID', 'Secret');

  return auth;
}

export const Authenticator: Authenticator = () => {
  return { authenticate };
};
