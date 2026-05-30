export type Locale = 'en-US' | 'es-CO';

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en-US', label: 'EN' },
  { value: 'es-CO', label: 'ES' },
];

export const DEFAULT_LOCALE: Locale = 'en-US';
export const LOCALE_STORAGE_KEY = 'album_locale';

// ─── Translation Map shape ────────────────────────────────────────────────────
// All keys must be present in every locale file.
export interface TranslationMap {
  nav: {
    title: string;
    album: string;
    profile: string;
    logout: string;
    footer: string;
    backToAlbum: string;
  };
  home: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    enterButton: string;
    continueAs: string;
  };
  userHeader: {
    guest: string;
    progress: string;
    of: string;
    stickers: string;
  };
  stats: {
    total: string;
    owned: string;
    missing: string;
    duplicates: string;
  };
  filter: {
    searchPlaceholder: string;
    allSections: string;
    tabs: {
      all: string;
      owned: string;
      missing: string;
      duplicates: string;
    };
    groups: string;
    all: string;
  };
  sticker: {
    status: {
      missing: string;
      owned: string;
      duplicate: string;
    };
    group: string;
    expand: string;
    collapse: string;
    noResults: string;
  };
  profile: {
    dataManagement: string;
    exportTitle: string;
    exportDescription: string;
    copyButton: string;
    copiedAlert: string;
    importTitle: string;
    importDescription: string;
    restoreButton: string;
    importConfirm: string;
    duplicateStickers: string;
    noDuplicates: string;
  };
  notFound: {
    error: string;
    title: string;
    message: string;
    backButton: string;
  };
}
