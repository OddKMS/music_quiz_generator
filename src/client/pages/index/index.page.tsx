import React, { useState } from 'react';
import { Counter } from '#components/Counter';
import { PageProps } from '#musicquizgenerator/types';
import { Playlist } from '@spotify/web-api-ts-sdk';
import { indexPageProps } from './index.page.server';

function Page({ playlist }: indexPageProps) {
  const playlistTest = playlist as Playlist;

  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
          <div>{JSON.stringify(playlistTest)}</div>
        </li>
      </ul>
    </>
  );
}

export { Page };
