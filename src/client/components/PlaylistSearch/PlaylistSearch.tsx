import React from 'react';
import { PageContext } from '#musicquizgenerator/types';

const PlaylistSearch = (pageContext: PageContext) => {
  pageContext.spotifySdk;

  function onSearch() {}

  const component = (
    <div>
      <input data-testid="playlistSearch.inputfield" />
      <button data-testid="playlistSearch.searchbutton" onClick={onSearch} />
    </div>
  );

  return component;
};

export { PlaylistSearch };
