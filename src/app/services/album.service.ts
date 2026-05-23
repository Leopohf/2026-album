import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Sticker, AlbumStats, FilterState, UserAlbum } from '../models/sticker.model';
import { STICKERS_DATA } from '../data/stickers.data';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private platformId = inject(PLATFORM_ID);
  private stickers = signal<Sticker[]>([]);
  private username = signal<string>('');
  private collapsedSections = signal<Set<string>>(new Set());
  private collapsedGroups = signal<Set<string>>(new Set());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    } else {
      this.stickers.set(STICKERS_DATA.map(s => ({ ...s })));
    }
  }

  loadUser(username: string): void {
    this.username.set(username);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('panini_2026_last_user', username);
      this.loadFromLocalStorage();
    }
  }

  getUsername(): string {
    return this.username();
  }

  getStats = computed<AlbumStats>(() => {
    const allStickers = this.stickers();
    const total = allStickers.length;
    const owned = allStickers.filter(s => s.owned).length;
    const missing = total - owned;
    const duplicates = allStickers.reduce((acc, s) => acc + (Number(s.duplicates) || 0), 0);
    const progress = total > 0 ? (owned / total) * 100 : 0;

    return { total, owned, missing, duplicates, progress };
  });

  toggleSticker(id: string): void {
    this.stickers.update(stickers =>
      stickers.map(s => {
        if (s.id === id) {
          const newOwned = !s.owned;
          return {
            ...s,
            owned: newOwned,
            duplicates: newOwned ? (Number(s.duplicates) || 0) : 0
          };
        }
        return s;
      })
    );
    this.saveToLocalStorage();
  }

  updateDuplicates(id: string, quantity: number): void {
    const safeQuantity = isNaN(quantity) ? 0 : Math.max(0, quantity);
    this.stickers.update(stickers =>
      stickers.map(s => s.id === id ? { ...s, duplicates: safeQuantity } : s)
    );
    this.saveToLocalStorage();
  }

  private normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  getFiltered(filters: FilterState): Sticker[] {
    const searchTerm = this.normalizeString(filters.search);
    return this.stickers().filter(s => {
      const normalizedName = this.normalizeString(s.name);
      const matchSearch = normalizedName.includes(searchTerm) ||
                            s.id.toLowerCase().includes(searchTerm);
      const matchStatus = filters.status === 'all' ? true :
                          filters.status === 'owned' ? s.owned :
                          filters.status === 'missing' ? !s.owned :
                          filters.status === 'duplicates' ? s.duplicates > 0 : true;
      const matchSection = filters.section === '' ? true : s.section === filters.section;

      return matchSearch && matchStatus && matchSection;
    });
  }

  getSections(): string[] {
    return Array.from(new Set(this.stickers().map(s => s.section)));
  }

  getGroups(): string[] {
    return Array.from(new Set(this.stickers().map(s => s.group)));
  }

  getCollapsedSections() {
    return this.collapsedSections();
  }

  getCollapsedGroups() {
    return this.collapsedGroups();
  }

  toggleSection(section: string): void {
    this.collapsedSections.update(set => {
      const newSet = new Set(set);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  }

  toggleGroup(group: string): void {
    this.collapsedGroups.update(set => {
      const newSet = new Set(set);
      if (newSet.has(group)) {
        newSet.delete(group);
      } else {
        newSet.add(group);
      }
      return newSet;
    });
  }

  expandAll(): void {
    this.collapsedSections.set(new Set());
    this.collapsedGroups.set(new Set());
  }

  collapseAll(): void {
    this.collapsedSections.set(new Set(this.getSections()));
    this.collapsedGroups.set(new Set(this.getGroups()));
  }

  expandGroups(): void {
    this.collapsedGroups.set(new Set());
  }

  collapseGroups(): void {
    this.collapsedGroups.set(new Set(this.getGroups()));
  }

  exportAlbum(): string {
    const album: UserAlbum = {
      username: this.username(),
      stickers: this.stickers().reduce((acc, s) => {
        acc[s.id] = { owned: s.owned, duplicates: s.duplicates };
        return acc;
      }, {} as Record<string, any>)
    };
    return JSON.stringify(album);
  }

  importAlbum(json: string): void {
    try {
      const album: UserAlbum = JSON.parse(json);
      if (album.username) {
        this.username.set(album.username);
      }
      this.stickers.update(current =>
        current.map(s => {
          const imported = album.stickers[s.id];
          return imported ? { 
            ...s, 
            owned: !!imported.owned, 
            duplicates: Math.max(0, Number(imported.duplicates) || 0) 
          } : s;
        })
      );
      this.saveToLocalStorage();
    } catch (e) {
      console.error('Error importing album', e);
    }
  }

  saveToLocalStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.username()) return;
    const album: UserAlbum = {
      username: this.username(),
      stickers: this.stickers().reduce((acc, s) => {
        acc[s.id] = { owned: s.owned, duplicates: Number(s.duplicates) || 0 };
        return acc;
      }, {} as Record<string, any>)
    };
    localStorage.setItem(`panini_2026_${this.username()}`, JSON.stringify(album));
    localStorage.setItem('panini_2026_last_user', this.username());
  }

  loadFromLocalStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    let user = this.username();
    if (!user) {
      user = localStorage.getItem('panini_2026_last_user') || '';
      this.username.set(user);
    }

    if (!user) {
      this.stickers.set(STICKERS_DATA.map(s => ({ ...s })));
      return;
    }

    const saved = localStorage.getItem(`panini_2026_${user}`);
    if (saved) {
      const album: UserAlbum = JSON.parse(saved);
      this.stickers.set(STICKERS_DATA.map(s => {
        const imported = album.stickers[s.id];
        return imported ? { 
          ...s, 
          owned: !!imported.owned, 
          duplicates: Math.max(0, Number(imported.duplicates) || 0) 
        } : { ...s };
      }));
    } else {
      this.stickers.set(STICKERS_DATA.map(s => ({ ...s })));
    }
  }

  logout(): void {
    this.username.set('');
    this.stickers.set(STICKERS_DATA.map(s => ({ ...s })));
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('panini_2026_last_user');
    }
  }
}
