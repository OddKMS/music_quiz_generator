import { beforeAll, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { getPlaylist } from '@lib/PlaylistReader';
import { authenticate } from '@lib/Auth';

vi.mock('@lib/Auth');

beforeAll(() => {
  global.fetch = vi.fn();
});

describe('The get playlist function', () => {
  it('should accept an access token and a playlist id', () => {
    expectTypeOf(getPlaylist).parameter(0).toBeString();
    expectTypeOf(getPlaylist).parameter(1).toBeString();
  });

  it('should return a JSON object containing the playlist', async () => {
    const authenticate = vi.fn().mockResolvedValueOnce(() => ({
      access_token: 'test_token',
    }));

    const mockAuth = await authenticate();

    const testPlaylist =
      'https://open.spotify.com/playlist/37i9dQZF1E4n88A5W2O28m?si=be1a57d725984ca4';
    const songs = getPlaylist(mockAuth.access_token, testPlaylist);

    expectTypeOf(getPlaylist).returns.toEqualTypeOf<Promise<string>>();
  });
});
