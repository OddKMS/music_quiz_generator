async function authenticateWithSpotify(clientID: string, clientSecret: string) {
  const spotifyUrl = 'https://accounts.spotify.com/api/token';

  const response = await fetch(spotifyUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientID,
      client_secret: clientSecret,
    }),
  });

  return response?.json();
}

export { authenticateWithSpotify };
