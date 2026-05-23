import React from 'react';
import { AlbumStats } from '../../models/sticker.model';

interface StatsPanelProps {
  stats: AlbumStats;
}

export const StatsPanelReact: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="mb-8 font-mono">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-border mb-4">
        <div 
          className="h-1 bg-ink transition-all duration-500 ease-out" 
          style={{ width: `${stats.progress}%` }}
        ></div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Total</p>
          <p className="text-2xl font-bold leading-none">{stats.total}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Owned</p>
          <p className="text-2xl font-bold leading-none text-success">{stats.owned}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Missing</p>
          <p className="text-2xl font-bold leading-none">{stats.missing}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Duplicates</p>
          <p className="text-2xl font-bold leading-none">{stats.duplicates}</p>
        </div>
      </div>
    </div>
  );
};
