export type StickerType = 'player' | 'stadium' | 'crest' | 'intro';
export type StickerStatus = 'missing' | 'owned' | 'duplicate';

export interface Sticker {
  id: string;           // Ex: 'ARG-01'
  number: number;
  name: string;
  section: string;      // Ex: 'Argentina', 'Stadiums'
  group: string;        // Ex: 'A', 'B', 'Stars'
  type: StickerType;
  owned: boolean;
  duplicates: number;    // 0 if not duplicate
}

export interface UserAlbum {
  username: string;
  stickers: Record<string, Pick<Sticker, 'owned' | 'duplicates'>>;
}

export interface AlbumStats {
  total: number;
  owned: number;
  missing: number;
  duplicates: number;
  progress: number;     // percentage 0–100
}

export interface FilterState {
  search: string;
  status: 'all' | 'owned' | 'missing' | 'duplicates';
  section: string;
}

export interface TeamGroup {
  name: string;
  stickers: Sticker[];
}

export interface TournamentGroup {
  name: string;
  teams: TeamGroup[];
}
