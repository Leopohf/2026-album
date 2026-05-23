import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { UserHeaderReact } from './UserHeaderReact';
import { createElement } from 'react';
import { AlbumStats } from '../../models/sticker.model';
import '@testing-library/jest-dom';

describe('UserHeaderReact', () => {
  const mockStats: AlbumStats = {
    total: 100,
    owned: 60,
    missing: 40,
    duplicates: 10,
    progress: 60
  };

  it('should render username and stats summary', () => {
    render(
      createElement(UserHeaderReact, {
        username: 'LeoMessi',
        stats: mockStats
      })
    );

    expect(screen.getByText('LeoMessi')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText(/of 100 stickers/i)).toBeInTheDocument();
  });

  it('should render "Guest" when username is empty', () => {
    render(
      createElement(UserHeaderReact, {
        username: '',
        stats: mockStats
      })
    );

    expect(screen.getByText('Guest')).toBeInTheDocument();
  });
});
