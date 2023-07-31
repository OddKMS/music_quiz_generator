import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

describe('The Music Quiz Generator', () => {
  it.skip('Should get a playlist', async () => {
    vi.doUnmock('#lib/Auth');
    vi.doUnmock('./PlaylistReader');

    vi.stubEnv('SPOTIFY_CLIENT_ID', 'snip');
    vi.stubEnv('SPOTIFY_CLIENT_SECRET', 'snip');

    const testPlaylist =
      'https://open.spotify.com/playlist/37i9dQZF1E4n88A5W2O28m';

    const { authenticate } = await import('#lib/Auth');
    const { getPlaylist } = await import('#lib/PlaylistReader');

    const mockAuth = await authenticate();

    const songs = await getPlaylist(mockAuth.access_token, testPlaylist);

    expectTypeOf(getPlaylist).returns.toEqualTypeOf<Promise<JSON>>();
  });
});
