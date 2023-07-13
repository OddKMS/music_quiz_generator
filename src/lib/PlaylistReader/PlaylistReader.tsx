async function getPlaylist(
  accessToken: string,
  playlistId: string,
): Promise<string> {
  const baseUrl = 'https://api.spotify.com/v1/playlists/';

  const response = await fetch(baseUrl + playlistId, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return response?.json();
}

export { getPlaylist };
