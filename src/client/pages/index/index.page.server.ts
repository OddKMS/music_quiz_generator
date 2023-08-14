import { PageContext } from '#musicquizgenerator/types';
import { Playlist } from '@spotify/web-api-ts-sdk';

export type indexPageProps = { playlist: Playlist };

async function onBeforeRender(pageContext: PageContext) {
  const playlist = await pageContext.spotifySdk.playlists.getPlaylist(
    '37i9dQZF1E4n88A5W2O28m',
  );

  const pageProps: indexPageProps = { playlist };

  return {
    pageContext: {
      pageProps,
    },
  };
}

export { onBeforeRender };
