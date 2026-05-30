import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import enUS from '../i18n/en-US';
import esCO from '../i18n/es-CO';

/** Build a fresh service instance that bypasses provideAppInitializer. */
function createService(): I18nService {
  TestBed.configureTestingModule({});
  return TestBed.inject(I18nService);
}

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    service = createService();
  });

  afterEach(() => {
    localStorage.removeItem('album_locale');
    TestBed.resetTestingModule();
  });

  // ─── init() ──────────────────────────────────────────────────────────────────

  describe('init()', () => {
    it('should load en-US by default when no localStorage key is set', async () => {
      localStorage.removeItem('album_locale');
      await service.init();

      expect(service.locale()).toBe('en-US');
      expect(service.isReady()).toBe(true);
      expect(service.t().home.title).toBe(enUS.home.title);
    });

    it('should load persisted locale from localStorage on init', async () => {
      localStorage.setItem('album_locale', 'es-CO');
      await service.init();

      expect(service.locale()).toBe('es-CO');
      expect(service.t().home.title).toBe(esCO.home.title);
    });

    it('should ignore invalid locale values in localStorage and fall back to en-US', async () => {
      localStorage.setItem('album_locale', 'fr-FR');
      await service.init();

      expect(service.locale()).toBe('en-US');
    });

    it('should set isReady to true after init', async () => {
      expect(service.isReady()).toBe(false);
      await service.init();
      expect(service.isReady()).toBe(true);
    });
  });

  // ─── setLocale() ─────────────────────────────────────────────────────────────

  describe('setLocale()', () => {
    it('should switch translations to es-CO', async () => {
      await service.init(); // start with en-US
      expect(service.locale()).toBe('en-US');

      await service.setLocale('es-CO');
      expect(service.locale()).toBe('es-CO');
      expect(service.t().home.title).toBe(esCO.home.title);
    });

    it('should switch translations back to en-US', async () => {
      localStorage.setItem('album_locale', 'es-CO');
      await service.init();

      await service.setLocale('en-US');
      expect(service.locale()).toBe('en-US');
      expect(service.t().home.title).toBe(enUS.home.title);
    });

    it('should persist the selected locale to localStorage', async () => {
      await service.init();
      await service.setLocale('es-CO');
      expect(localStorage.getItem('album_locale')).toBe('es-CO');
    });

    it('should update the translations signal reactively', async () => {
      await service.init();
      const before = service.t().stats.owned;

      await service.setLocale('es-CO');
      const after = service.t().stats.owned;

      expect(before).not.toBe(after);
      expect(after).toBe(esCO.stats.owned);
    });
  });

  // ─── t() computed signal ──────────────────────────────────────────────────────

  describe('t() computed signal', () => {
    it('should expose all top-level translation namespaces', async () => {
      await service.init();
      const t = service.t();

      expect(t.nav).toBeDefined();
      expect(t.home).toBeDefined();
      expect(t.stats).toBeDefined();
      expect(t.filter).toBeDefined();
      expect(t.sticker).toBeDefined();
      expect(t.profile).toBeDefined();
      expect(t.notFound).toBeDefined();
      expect(t.userHeader).toBeDefined();
    });

    it('should return en-US strings matching the locale file', async () => {
      await service.init();
      const t = service.t();

      expect(t.nav.title).toBe(enUS.nav.title);
      expect(t.nav.album).toBe(enUS.nav.album);
      expect(t.sticker.status.missing).toBe(enUS.sticker.status.missing);
      expect(t.filter.tabs.all).toBe(enUS.filter.tabs.all);
    });

    it('should return es-CO strings after switching locale', async () => {
      await service.init();
      await service.setLocale('es-CO');
      const t = service.t();

      expect(t.nav.title).toBe(esCO.nav.title);
      expect(t.sticker.status.missing).toBe(esCO.sticker.status.missing);
      expect(t.filter.tabs.all).toBe(esCO.filter.tabs.all);
    });
  });

  // ─── tr() dynamic key resolver ───────────────────────────────────────────────

  describe('tr()', () => {
    it('should resolve a top-level dot-separated key', async () => {
      await service.init();
      expect(service.tr('nav.title')).toBe(enUS.nav.title);
    });

    it('should resolve a deeply nested key', async () => {
      await service.init();
      expect(service.tr('sticker.status.missing')).toBe(enUS.sticker.status.missing);
      expect(service.tr('filter.tabs.owned')).toBe(enUS.filter.tabs.owned);
    });

    it('should return the key itself when key does not exist', async () => {
      await service.init();
      expect(service.tr('does.not.exist')).toBe('does.not.exist');
    });
  });

  // ─── locale completeness ──────────────────────────────────────────────────────

  describe('translation completeness', () => {
    /**
     * Flattens a nested object into an array of dot-separated key paths.
     * e.g. { a: { b: 'c' } } → ['a.b']
     */
    function flatKeys(obj: object, prefix = ''): string[] {
      return Object.entries(obj).flatMap(([key, value]) => {
        const full = prefix ? `${prefix}.${key}` : key;
        return typeof value === 'object' && value !== null
          ? flatKeys(value, full)
          : [full];
      });
    }

    it('es-CO has all keys that en-US has (no missing translations)', () => {
      const enKeys = flatKeys(enUS).sort();
      const esKeys = flatKeys(esCO).sort();
      expect(esKeys).toEqual(enKeys);
    });

    it('en-US has all keys that es-CO has (no extra untranslated keys)', () => {
      const enKeys = flatKeys(enUS).sort();
      const esKeys = flatKeys(esCO).sort();
      expect(enKeys).toEqual(esKeys);
    });
  });
});
