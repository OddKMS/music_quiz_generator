import { authenticateWithSpotify } from '@helpers/SpotifyAuthenticator';
import { clientIdFile, clientSecretFile } from '@lib/secrets';
import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';

function getClientID() {
  try {
    const clientId = readFileSync(path.join(cwd(), clientIdFile), 'utf-8');

    return clientId;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.startsWith('ENOENT')) {
        throw new Error('ClientID File could not be found.');
      } else {
        throw e;
      }
    }
  }
}

function getClientSecret() {
  try {
    const clientSecret = readFileSync(
      path.join(cwd(), clientSecretFile),
      'utf-8',
    );

    return clientSecret;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.startsWith('ENOENT')) {
        throw new Error('Client Secret File could not be found.');
      } else {
        throw e;
      }
    }
  }
}

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
export { getClientID, getClientSecret };
