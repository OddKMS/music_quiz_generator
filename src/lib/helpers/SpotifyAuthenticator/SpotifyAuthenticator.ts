async function getSpotifyClientToken(clientID: string, clientSecret: string) {
  const spotifyUrl = 'https://accounts.spotify.com/api/token';

  const response = await fetch(spotifyUrl, {
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

  return response?.json();
}

export { getSpotifyClientToken };
