import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Locale,
  TranslationMap,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
} from '../i18n/types';
import enUS from '../i18n/en-US';

/** Walks a nested object by a dot-separated key path.
 *  e.g. resolve(map, 'sticker.status.missing') → 'Faltante'
 */
function resolve(obj: unknown, path: string): string | undefined {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | undefined;
}

/**
 * Static import map — must use explicit string literals so Vite can
 * statically analyse and bundle each chunk for both browser and SSR targets.
 */
const LOCALE_LOADERS: Record<Locale, () => Promise<{ default: TranslationMap }>> = {
  'en-US': () => import('../i18n/en-US'),
  'es-CO': () => import('../i18n/es-CO'),
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _locale = signal<Locale>(DEFAULT_LOCALE);
  private readonly _translations = signal<TranslationMap>(enUS);
  readonly isReady = signal(false);

  /** Current locale signal (read-only to consumers). */
  readonly locale = this._locale.asReadonly();

  /** Full typed translation map for the current locale. */
  readonly translations = this._translations.asReadonly();

  /**
   * Typed accessor: use as `i18n.t().nav.album` for full type-safety,
   * or `i18n.tr('nav.album')` for dynamic key lookup.
   */
  readonly t = computed(() => this._translations());

  /** Dynamic key resolver — returns the key itself as fallback. */
  tr(key: string): string {
    return resolve(this._translations(), key) ?? key;
  }

  /**
   * Called once at bootstrap via provideAppInitializer.
   * Detects the locale and loads only that locale's file.
   */
  async init(): Promise<void> {
    const locale = this.detectLocale();
    await this.loadLocale(locale);
    this.isReady.set(true);
  }

  /**
   * Switches locale at runtime, loading the new file on demand.
   * Persists the choice to localStorage.
   */
  async setLocale(locale: Locale): Promise<void> {
    await this.loadLocale(locale);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }

  // ─── Private ────────────────────────────────────────────────────────────────

  private async loadLocale(locale: Locale): Promise<void> {
    const mod = await LOCALE_LOADERS[locale]();
    this._translations.set(mod.default);
    this._locale.set(locale);
  }

  private detectLocale(): Locale {
    if (!isPlatformBrowser(this.platformId)) {
      return DEFAULT_LOCALE;
    }

    // 1. Persisted user preference
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && this.isValidLocale(stored)) {
      return stored;
    }

    // 2. Browser language auto-detection
    const browserLang = navigator.language ?? '';
    if (browserLang.startsWith('es')) {
      return 'es-CO';
    }

    return DEFAULT_LOCALE;
  }

  private isValidLocale(value: string): value is Locale {
    return value === 'en-US' || value === 'es-CO';
  }
}
