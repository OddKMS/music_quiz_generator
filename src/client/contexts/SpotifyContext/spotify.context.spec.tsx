import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { SpotifyContext, SpotifyProvider } from '#contexts';
import { it, vi, describe, expect, expectTypeOf } from 'vitest';
import { useContext, useEffect, useState } from 'react';
import { act, render, renderHook, waitFor } from '#clientTestUtils';
import { getClientID, getClientSecret } from '#lib/Auth';

const mockSpotifyAuth = {
  access_token: 'HEy!',
  token_type: 'great',
  expires_in: 5,
  expires: 5,
  refresh_token: 'yes?',
};

vi.mock('@spotify/web-api-ts-sdk', async () => {
  const spotifyApi = await vi.importActual<SpotifyApi>(
    '@spotify/web-api-ts-sdk',
  );

  // TODO: Read up on how to mock classes
  return {
    SpotifyApi: {
      ...spotifyApi,
      withClientCredentials: vi.fn(() => {
        return spotifyApi;
      }),
      getAccessToken: vi.fn(async (): Promise<AccessToken> => {
        return mockSpotifyAuth;
      }),
    },
  };
});

describe('The Spotify context', () => {
  it('should provide the spotify-api', () => {
    const { result } = renderHook(() => useContext(SpotifyContext));
    const spotifySdk = result.current;

    expectTypeOf(spotifySdk).toMatchTypeOf<SpotifyApi>();
  });

  it('should propegate the spotify-api to its children', async () => {
    const { getByTestId } = renderTestComponent();

    await waitFor(() => {
      expect(getByTestId('spotify-token')).toBeTruthy();
      expect(getByTestId('spotify-token')).toHaveTextContent(
        mockSpotifyAuth.access_token,
      );
    });
  });
});

const SpotifyContextTestComponent = () => {
  const spotifySdk = useContext(SpotifyContext);
  const [authToken, setAuthToken] = useState<string>();

  const getAuthToken = async () => {
    await spotifySdk.getAccessToken().then(({ access_token }) => {
      setAuthToken(access_token);
    });
  };

  useEffect(() => {
    getAuthToken();
  });

  return (
    <>
      <div>
        This is the authentication token from Spotify:
        <div data-testid="spotify-token">{authToken}</div>
      </div>
    </>
  );
};

const renderTestComponent = () => {
  const testSpotifySdk = SpotifyApi.withClientCredentials(
    getClientID(),
    getClientSecret(),
  );

  return render(
    <SpotifyProvider fromServerSpotifySdk={testSpotifySdk}>
      <SpotifyContextTestComponent />
    </SpotifyProvider>,
  );
};
