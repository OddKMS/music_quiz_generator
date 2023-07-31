import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { getPlaylist, getPlaylistID } from '#lib/PlaylistReader';
import { createFetchResponse } from '#testHelpers';
import { Playlist } from '@spotify/web-api-ts-sdk';

afterEach(() => {
  vi.restoreAllMocks();
});

const mockAuthResponse = {
  access_token: '',
  token_type: '',
  expires_in: 0,
};

vi.mock('#lib/Auth', () => ({
  authenticate: vi.fn(async () => {
    return (await createFetchResponse(mockAuthResponse)).json();
  }),
}));

describe('The get playlist function', () => {
  it('should accept an access token and a playlist id as parameters', () => {
    expectTypeOf(getPlaylist).parameter(0).toBeString();
    expectTypeOf(getPlaylist).parameter(1).toBeString();
  });

  it('should return a object containing the playlist', async () => {
    expectTypeOf(getPlaylist).returns.toEqualTypeOf<Promise<Playlist>>();
  });
});

describe('The getPlaylistID function', () => {
  it('should accept an Url as parameter', () => {
    expectTypeOf(getPlaylistID).parameter(0).toBeString();
  });

  it('should return the ID part of the Playlist URI', () => {
    const testPlaylist =
      'https://open.spotify.com/playlist/37i9dQZF1E4n88A5W2O28m';
    const playlistIdPart = '37i9dQZF1E4n88A5W2O28m';

    const identificator = getPlaylistID(testPlaylist);

    expect(identificator).toBe(playlistIdPart);
  });

  it('should throw an error if the URL is not related to Spotify', () => {
    const wrongUrl =
      'https://www.amazon.com/Let-Slip-Beasts-Exciting-Monstermorphosis-ebook/dp/B0C8BLBGM5';

    expect(() => getPlaylistID(wrongUrl)).toThrowError(
      'URL is not a valid Spotify Playlist URL',
    );

    try {
      getPlaylistID(wrongUrl);
    } catch (error) {
      expect(error.cause.message).toBe('No Spotify domain found in URL');
    }
  });

  it('should throw an error if there is no ID part in the URL', () => {
    const missingIdUrl = 'https://open.spotify.com/playlist/';

    expect(() => getPlaylistID(missingIdUrl)).toThrowError(
      'URL is not a valid Spotify Playlist URL',
    );

    try {
      getPlaylistID(missingIdUrl);
    } catch (error) {
      expect(error.cause.message).toBe('No playlist ID found in URL');
    }
  });
});
