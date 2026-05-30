import React from 'react';
import { AlbumStats } from '../../models/sticker.model';

interface UserHeaderLabels {
  guest: string;
  progress: string;
  of: string;
  stickers: string;
}

interface UserHeaderProps {
  username: string;
  stats: AlbumStats;
  labels?: Partial<UserHeaderLabels>;
}

const defaultLabels: UserHeaderLabels = {
  guest: 'Guest',
  progress: 'Progress',
  of: 'of',
  stickers: 'stickers',
};

export const UserHeaderReact: React.FC<UserHeaderProps> = ({ username, stats, labels }) => {
  const resolvedLabels = { ...defaultLabels, ...labels };
  return (
    <header className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 font-mono border-b border-border pb-4">
      <h1 className="text-4xl font-bold text-ink uppercase tracking-tighter">
        {username || resolvedLabels.guest}
      </h1>
      <div className="text-sm text-muted uppercase">
        {resolvedLabels.progress}: <span className="text-ink font-bold">{stats.owned}</span> {resolvedLabels.of} {stats.total} {resolvedLabels.stickers}
      </div>
    </header>
  );
};

