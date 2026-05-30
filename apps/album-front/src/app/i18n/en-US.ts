import type { TranslationMap } from './types';

const enUS: TranslationMap = {
  nav: {
    title: 'World Cup 2026',
    album: 'Album',
    profile: 'Profile',
    logout: 'Logout',
    footer: 'Panini World Cup 2026 • Minimalist Tracker',
    backToAlbum: 'Back to album',
  },
  home: {
    title: 'World Cup Album 2026',
    subtitle: 'Sticker Tracking System',
    inputPlaceholder: 'ENTER YOUR NAME...',
    enterButton: 'Enter Album',
    continueAs: 'Continue as:',
  },
  userHeader: {
    guest: 'Guest',
    progress: 'Progress',
    of: 'of',
    stickers: 'stickers',
  },
  stats: {
    total: 'Total',
    owned: 'Owned',
    missing: 'Missing',
    duplicates: 'Duplicates',
  },
  filter: {
    searchPlaceholder: 'SEARCH BY ID OR NAME',
    allSections: 'ALL SECTIONS',
    tabs: {
      all: 'ALL',
      owned: 'OWNED',
      missing: 'MISSING',
      duplicates: 'DUPLICATES',
    },
    groups: 'GROUPS',
    all: 'ALL',
  },
  sticker: {
    status: {
      missing: 'Missing',
      owned: 'Owned',
      duplicate: 'Duplicate',
    },
    group: 'GROUP',
    expand: '[+] EXPAND',
    collapse: '[-] COLLAPSE',
    noResults: 'No stickers found',
  },
  profile: {
    dataManagement: 'Data Management',
    exportTitle: 'Export Album',
    exportDescription: 'Copy this code to back up your progress or share it.',
    copyButton: 'Copy to clipboard',
    copiedAlert: 'Copied to clipboard!',
    importTitle: 'Import Album',
    importDescription: 'Paste the JSON code to restore your progress.',
    restoreButton: 'Restore Data',
    importConfirm: 'This will overwrite your current progress. Continue?',
    duplicateStickers: 'Duplicate Stickers',
    noDuplicates: "You don't have duplicate stickers yet",
  },
  notFound: {
    error: 'Error 404',
    title: 'Page Not Found',
    message: 'The route you requested does not exist.',
    backButton: 'Back to Home',
  },
};

export default enUS;
