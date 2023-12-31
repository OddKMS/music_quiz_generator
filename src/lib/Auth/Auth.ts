import { getSpotifyClientToken } from '#lib/SpotifyAuthenticator';

function getClientID(): string {
  // const clientId = import.meta?.env?.SPOTIFY_CLIENT_ID;
  const clientId = process.env?.SPOTIFY_CLIENT_ID;

  if (!!clientId && clientId != 'undefined') {
    return clientId;
  } else {
    throw new Error('Client ID is not set, check config.');
  }
}

function getClientSecret() {
  // const clientSecret = import.meta?.env?.SPOTIFY_CLIENT_SECRET;
  const clientSecret = process.env?.SPOTIFY_CLIENT_SECRET;

  if (!!clientSecret && clientSecret != 'undefined') {
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
  return await getSpotifyClientToken(getClientID(), getClientSecret());
}

export { authenticate, getClientID, getClientSecret };
