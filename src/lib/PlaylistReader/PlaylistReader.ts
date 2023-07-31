import { request } from '#lib/Fetch';

async function getPlaylist(accessToken: string, playlistUrl: string) {
  const baseUrl = 'https://api.spotify.com/v1/playlists/';

  const playlistId = getPlaylistID(playlistUrl);

  const response = await request(baseUrl + playlistId, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });

  return response;
}

function getPlaylistID(playlistUrl: string) {
  const parts = playlistUrl.split('/').filter((element) => element);
  let playlistUrlValid = false;
  let invalidCause = new Error();

  if (playlistUrl.search('spotify') != -1) {
    playlistUrlValid = true;
  } else {
    invalidCause.message = 'No Spotify domain found in URL';
  }

  // URL Ends with 'playlist'
  if (parts.at(-1) == 'playlist') {
    playlistUrlValid = false;
    invalidCause.message = 'No playlist ID found in URL';
  }

  if (playlistUrlValid) {
    return parts.at(-1);
  } else {
    throw new Error('URL is not a valid Spotify Playlist URL', {
      cause: invalidCause,
    });
  }
}

function parsePlaylistJSON(playlistResponse: JSON) {
  return 'foo';
}

export { getPlaylistID, getPlaylist, parsePlaylistJSON };
