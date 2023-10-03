import React from 'react';
import { act, render, waitFor } from '#clientTestUtils';
import { describe, expect, it, should } from 'vitest';
import { PlaylistSearch } from '#components/PlaylistSearch';

describe('the PlaylistSearch component', () => {
  it('should have an input field', () => {
    const { getByTestId } = testPlaylistSearch();

    expect(getByTestId('playlistSearch.inputfield').nodeName).toBe('INPUT');
  });

  it('should have a button to perform the search', () => {
    const { getByTestId } = testPlaylistSearch();

    expect(getByTestId('playlistSearch.searchbutton').nodeName).toBe('BUTTON');
  });

  it('should call the playlist search when the button is clicked', () => {});

  it('should call the playlist search when the enter key is pressed', () => {});

  it.todo('should call the playlist search when activated', async () => {
    const { getByTestId } = testPlaylistSearch();

    const searchButton = getByTestId('playlistSearch.searchbutton');
    await act(async () => searchButton.click);
  });

  it.todo('should display any errors that result from the search', () => {});

  it.todo(
    'should let the user perform the search with the enter key',
    () => {},
  );
});

const testPlaylistSearch = () => {
  return render(<PlaylistSearch />);
};
