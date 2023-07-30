import { request } from '#lib/Fetch';

async function getSpotifyClientToken(clientID: string, clientSecret: string) {
  const spotifyUrl = 'https://accounts.spotify.com/api/token';

  try {
    const authObject = await request<AuthenticationObject>(spotifyUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(clientID + ':' + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    return authObject;
  } catch (error) {
    throw new Error('Could not get Client Token');
  }
}

export { getSpotifyClientToken };
