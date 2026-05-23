import { TestBed } from '@angular/core/testing';
import { AlbumService } from './album.service';
import { STICKERS_DATA } from '../data/stickers.data';
import { PLATFORM_ID } from '@angular/core';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(AlbumService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load stickers from STICKERS_DATA on init', () => {
    const sections = service.getSections();
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should calculate stats correctly', () => {
    const stats = service.getStats();
    expect(stats.total).toBe(STICKERS_DATA.length);
    expect(stats.owned).toBe(0);
    expect(stats.duplicates).toBe(0);
    expect(stats.progress).toBe(0);
  });

  it('should handle NaN duplicates in stats calculation', () => {
    (service as any).stickers.set([
      { id: '1', name: 'S1', owned: true, duplicates: NaN },
      { id: '2', name: 'S2', owned: true, duplicates: 2 }
    ]);

    const stats = service.getStats();
    expect(stats.duplicates).toBe(2);
  });

  it('should handle zero total stickers in progress calculation', () => {
    (service as any).stickers.set([]);
    const stats = service.getStats();
    expect(stats.progress).toBe(0);
  });

  it('should toggle sticker state', () => {
    const stickerId = STICKERS_DATA[0].id;
    service.toggleSticker(stickerId);
    
    let stats = service.getStats();
    expect(stats.owned).toBe(1);

    // Toggle back
    service.toggleSticker(stickerId);
    stats = service.getStats();
    expect(stats.owned).toBe(0);
  });

  it('should reset duplicates when toggling off', () => {
    const stickerId = STICKERS_DATA[0].id;
    service.toggleSticker(stickerId);
    service.updateDuplicates(stickerId, 5);
    
    service.toggleSticker(stickerId); // Toggle off
    const stats = service.getStats();
    expect(stats.duplicates).toBe(0);
  });

  it('should sanitize NaN in updateDuplicates', () => {
    const stickerId = STICKERS_DATA[0].id;
    service.updateDuplicates(stickerId, NaN);
    
    const stats = service.getStats();
    expect(stats.duplicates).toBe(0);
  });

  it('should handle negative quantities in updateDuplicates', () => {
    const stickerId = STICKERS_DATA[0].id;
    service.updateDuplicates(stickerId, -5);
    
    const stats = service.getStats();
    expect(stats.duplicates).toBe(0);
  });

  it('should filter stickers by status', () => {
    const stickerId = STICKERS_DATA[0].id;
    service.toggleSticker(stickerId);
    service.updateDuplicates(STICKERS_DATA[1].id, 1);

    expect(service.getFiltered({ search: '', status: 'owned', section: '' }).length).toBe(1);
    expect(service.getFiltered({ search: '', status: 'missing', section: '' }).length).toBe(STICKERS_DATA.length - 1);
    expect(service.getFiltered({ search: '', status: 'duplicates', section: '' }).length).toBe(1);
    expect(service.getFiltered({ search: '', status: 'all', section: '' }).length).toBe(STICKERS_DATA.length);
    // @ts-ignore - testing default branch
    expect(service.getFiltered({ search: '', status: 'unknown', section: '' }).length).toBe(STICKERS_DATA.length);
  });

  it('should filter stickers by section', () => {
    const section = STICKERS_DATA[0].section;
    const count = STICKERS_DATA.filter(s => s.section === section).length;
    
    expect(service.getFiltered({ search: '', status: 'all', section }).length).toBe(count);
  });

  it('should perform accent-insensitive search', () => {
    (service as any).stickers.set([
      { id: '1', name: 'DÁVINSON SÁNCHEZ', number: 4, section: 'Colombia', owned: false, duplicates: 0 },
      { id: '2', name: 'JAMES RODRÍGUEZ', number: 14, section: 'Colombia', owned: false, duplicates: 0 }
    ]);

    expect(service.getFiltered({ search: 'davinson', status: 'all', section: '' }).length).toBe(1);
    expect(service.getFiltered({ search: 'rodriguez', status: 'all', section: '' }).length).toBe(1);
  });

  it('should search by sticker ID', () => {
    (service as any).stickers.set([
      { id: 'ARG-01', name: 'MESSI', number: 10, section: 'Argentina', owned: false, duplicates: 0 }
    ]);

    expect(service.getFiltered({ search: 'arg-01', status: 'all', section: '' }).length).toBe(1);
  });

  it('should manage collapsed sections and groups', () => {
    const section = 'Colombia';
    const group = 'Group A';

    service.toggleSection(section);
    expect(service.getCollapsedSections().has(section)).toBe(true);
    service.toggleSection(section);
    expect(service.getCollapsedSections().has(section)).toBe(false);

    service.toggleGroup(group);
    expect(service.getCollapsedGroups().has(group)).toBe(true);
    service.toggleGroup(group);
    expect(service.getCollapsedGroups().has(group)).toBe(false);
  });

  it('should handle bulk expand/collapse', () => {
    service.collapseAll();
    expect(service.getCollapsedSections().size).toBeGreaterThan(0);
    expect(service.getCollapsedGroups().size).toBeGreaterThan(0);

    service.expandAll();
    expect(service.getCollapsedSections().size).toBe(0);
    expect(service.getCollapsedGroups().size).toBe(0);

    service.collapseGroups();
    expect(service.getCollapsedGroups().size).toBeGreaterThan(0);

    service.expandGroups();
    expect(service.getCollapsedGroups().size).toBe(0);
  });

  it('should export and import album', () => {
    service.loadUser('testuser');
    const stickerId = STICKERS_DATA[0].id;
    service.toggleSticker(stickerId);
    
    const exported = service.exportAlbum();
    expect(exported).toContain('testuser');
    expect(exported).toContain(stickerId);

    service.logout();
    expect(service.getUsername()).toBe('');
    expect(service.getStats().owned).toBe(0);

    service.importAlbum(exported);
    expect(service.getUsername()).toBe('testuser');
    expect(service.getStats().owned).toBe(1);
  });

  it('should handle errors in importAlbum', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    service.importAlbum('invalid-json');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should manage users and persistence', () => {
    service.loadUser('newuser');
    expect(service.getUsername()).toBe('newuser');
    expect(localStorage.getItem('panini_2026_last_user')).toBe('newuser');

    const stickerId = STICKERS_DATA[0].id;
    service.toggleSticker(stickerId);
    expect(localStorage.getItem('panini_2026_newuser')).toBeTruthy();

    service.logout();
    expect(localStorage.getItem('panini_2026_last_user')).toBeNull();
  });

  it('should load user data from localStorage on loadUser', () => {
    const username = 'stored-user';
    const albumData = {
      username,
      stickers: { [STICKERS_DATA[0].id]: { owned: true, duplicates: 3 } }
    };
    localStorage.setItem(`panini_2026_${username}`, JSON.stringify(albumData));

    service.loadUser(username);
    expect(service.getStats().owned).toBe(1);
    expect(service.getStats().duplicates).toBe(3);
  });

  it('should handle importAlbum without username', () => {
    const albumJson = JSON.stringify({
      stickers: { [STICKERS_DATA[0].id]: { owned: true } }
    });
    service.importAlbum(albumJson);
    expect(service.getStats().owned).toBe(1);
  });

  it('should not save to localStorage if username is empty', () => {
    service.logout();
    const spy = vi.spyOn(localStorage, 'setItem');
    service.saveToLocalStorage();
    expect(spy).not.toHaveBeenCalledWith(expect.stringMatching(/^panini_2026_/), expect.any(String));
  });

  it('should handle loadFromLocalStorage when user has no saved data', () => {
    localStorage.clear();
    service.loadUser('user-with-no-data');
    expect(service.getStats().owned).toBe(0);
  });

  describe('on server platform', () => {
    let serverService: AlbumService;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      serverService = TestBed.inject(AlbumService);
    });

    it('should initialize stickers from STICKERS_DATA', () => {
      expect(serverService.getStats().total).toBe(STICKERS_DATA.length);
    });
  });
});
