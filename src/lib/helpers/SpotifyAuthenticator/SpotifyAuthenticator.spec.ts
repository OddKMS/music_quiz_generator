import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createFetchResponse } from '#helpers';
import * as spotifyAuth from '#helpers/SpotifyAuthenticator';

const spotifyUrl = 'https://accounts.spotify.com/api/token';
const baseClientId = 'Ident';
const baseClientSecret = 'Shush';

beforeAll(() => {
  global.fetch = vi.fn();
});

describe('The Spotify Authenticator', () => {
  it('should contain a function to get the application token from Spotify', () => {
    expect(spotifyAuth.getSpotifyClientToken).toBeTypeOf('function');
  });
});

describe('The getSpotifyClientToken function', () => {
  it('should accept a client id and secret as parameters', async () => {
    const spy = vi.spyOn(spotifyAuth, 'getSpotifyClientToken');

    await testGetToken();

    expect(spy).toBeCalledWith(baseClientId, baseClientSecret);
  });

  it('should make a POST request to Spotify', async () => {
    const authResponse = {
      access_token: 'this-is-a-token',
      token_type: 'access',
      expires_in: 120,
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createFetchResponse(authResponse));

    const auth = await testGetToken();

    expect(fetch).toHaveBeenCalledWith(
      spotifyUrl,
      expect.objectContaining({
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(baseClientId + ':' + baseClientSecret).toString(
              'base64',
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      }),
    );
    expect(auth).toEqual(authResponse);
  });

  it('should throw an exception ', () => {});

  it('should return an object with access token, token type, and expiration time', async () => {
    const authResponse = {
      access_token: '',
      token_type: '',
      expires_in: 0,
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createFetchResponse(authResponse));

    vi.spyOn(spotifyAuth, 'getSpotifyClientToken');
    await testGetToken();

    expect(spotifyAuth.getSpotifyClientToken).toHaveReturnedWith(authResponse);
  });
});

const testGetToken = async (clientId?: string, clientSecret?: string) => {
  return await spotifyAuth.getSpotifyClientToken(
    clientId ?? baseClientId,
    clientSecret ?? baseClientSecret,
  );
};
