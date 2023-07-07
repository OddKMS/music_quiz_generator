import { authenticateWithSpotify } from '@helpers/SpotifyAuthenticator';

/**
 * Authenticates the user
 * @returns
 */
async function authenticate() {
  return await authenticateWithSpotify('ID', 'Secret');
}

const Authenticator: Authenticator = () => {
  return { authenticate };
};

export default Authenticator;
