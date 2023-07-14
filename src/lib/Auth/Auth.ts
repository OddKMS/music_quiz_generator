import { authenticateWithSpotify } from '@helpers/SpotifyAuthenticator';

function getClientID(): string {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!!clientId) {
    return clientId;
  } else {
    throw new Error('Client ID is not set, check config.');
  }
}

function getClientSecret() {
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!!clientSecret) {
    return clientSecret;
  } else {
    throw new Error('Client Secret is not set, check config.');
  }
}

/**
 * Authenticates the user
 * @returns
 */
async function authenticate(): Promise<AuthenticationObject> {
  return await authenticateWithSpotify(getClientID(), getClientSecret());
}

export { authenticate, getClientID, getClientSecret };
