import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createFetchResponse } from '@helpers';
import * as spotifyAuth from '@helpers/SpotifyAuthenticator';

const spotifyUrl = 'https://accounts.spotify.com/api/token';
const baseClientId = 'Ident';
const baseClientSecret = 'Shush';

describe('The Spotify Authenticator', () => {
  it('should contain a function authenticating the application', () => {
    expect(spotifyAuth.authenticateWithSpotify).toBeTypeOf('function');
  });
});

describe('The authentication function', () => {
  it('should accept a client id and secret as parameters', async () => {
    const spy = vi.spyOn(spotifyAuth, 'authenticateWithSpotify');

    await testAuthenticate();

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

    const auth = await testAuthenticate();

    expect(fetch).toHaveBeenCalledWith(
      spotifyUrl,
      expect.objectContaining({
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: baseClientId,
          client_secret: baseClientSecret,
        }),
      }),
    );
    expect(auth).toEqual(authResponse);
  });
});

it('should return an object with access token, token type, and expiration time', async () => {
  const authResponse = {
    access_token: '',
    token_type: '',
    expires_in: 0,
  };

  global.fetch = vi
    .fn()
    .mockResolvedValueOnce(createFetchResponse(authResponse));

  vi.spyOn(spotifyAuth, 'authenticateWithSpotify');
  await testAuthenticate();

  expect(spotifyAuth.authenticateWithSpotify).toHaveReturnedWith(authResponse);
});

beforeEach(() => {
  vi.clearAllMocks;
  global.fetch = vi.fn();
});

const testAuthenticate = async (clientId?: string, clientSecret?: string) => {
  return await spotifyAuth.authenticateWithSpotify(
    clientId ?? baseClientId,
    clientSecret ?? baseClientSecret,
  );
};
