import { request } from '#lib/Fetch';
import type { Playlist } from '@spotify/web-api-ts-sdk';

async function getPlaylist(
  accessToken: string,
  playlistUrl: string,
): Promise<Playlist> {
  const baseUrl = 'https://api.spotify.com/v1/playlists/';

  const playlistId = getPlaylistID(playlistUrl);

  const playlists = await request<Playlist>(baseUrl + playlistId, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });

  return playlists;
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

export { getPlaylistID, getPlaylist };
