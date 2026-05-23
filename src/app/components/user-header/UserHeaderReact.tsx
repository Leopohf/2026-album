import React from 'react';
import { AlbumStats } from '../../models/sticker.model';

interface UserHeaderProps {
  username: string;
  stats: AlbumStats;
}

export const UserHeaderReact: React.FC<UserHeaderProps> = ({ username, stats }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 font-mono border-b border-border pb-4">
      <h1 className="text-4xl font-bold text-ink uppercase tracking-tighter">
        {username || 'Guest'}
      </h1>
      <div className="text-sm text-muted uppercase">
        Progress: <span className="text-ink font-bold">{stats.owned}</span> of {stats.total} stickers
      </div>
    </header>
  );
};
