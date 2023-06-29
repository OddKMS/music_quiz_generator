import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlaylistReader from './playlist_reader';

describe('playlist_reader', () => {
  it('should render the PlaylistReader container', () => {
    render(<PlaylistReader />);

    expect(screen.getByTestId('playlist_reader_container')).not.toBeNull();
  });
});
