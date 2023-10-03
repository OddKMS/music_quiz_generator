import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { createContext, ReactElement } from 'react';

const SpotifyContext = createContext<SpotifyApi>(null);

export function SpotifyProvider({
  children,
  fromServerSpotifySdk,
}): ReactElement {
  const spotifySdk: SpotifyApi = fromServerSpotifySdk;

  return (
    <SpotifyContext.Provider value={spotifySdk}>
      {children}
    </SpotifyContext.Provider>
  );
}

export default SpotifyContext;
