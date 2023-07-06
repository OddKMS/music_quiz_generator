import { describe, expect, it, vi } from 'vitest';
import * as spotifyAuth from '@helpers/SpotifyAuthenticator';
import { number, string } from 'yup';

describe('The Spotify Authenticator', () => {
  it('should contain a function authenticating the application', () => {
    expect(spotifyAuth.authenticateWithSpotify).toBeTypeOf('function');
  });
});

describe('The authentication function', () => {
  vi.mock('@helpers/SpotifyAuthenticator', () => {
    return {
      authenticateWithSpotify: vi.fn(() => {
        return {
          access_token: '',
          token_type: '',
          expires_in: 0,
        };
      }),
    };
  });

  it('should accept a client id and secret as parameters', () => {
    const spy = vi.spyOn(spotifyAuth, 'authenticateWithSpotify');

    const clientId = 'Ident';
    const clientSecret = 'Shush';

    spotifyAuth.authenticateWithSpotify(clientId, clientSecret);

    expect(spy).toBeCalledWith(clientId, clientSecret);
  });

  it('should return an object with access token, token type, and expiration time', () => {
    vi.spyOn(spotifyAuth, 'authenticateWithSpotify');

    spotifyAuth.authenticateWithSpotify('id', 'secret');

    expect(spotifyAuth.authenticateWithSpotify).toHaveReturnedWith({
      access_token: '',
      token_type: '',
      expires_in: 0,
    });
  });

  it('should make a POST request to Spotify', () => {});
});
