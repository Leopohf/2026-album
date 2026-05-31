import { inject, Injectable, PLATFORM_ID, signal, computed, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly storageKey = 'theme-preference';

  // Reactive state containing user's choice: 'light' | 'dark' | 'system'
  readonly themeMode = signal<ThemeMode>(this.getInitialMode());

  // Tracks the media query prefers-color-scheme: dark matches value
  private systemDarkQuery = (this.isBrowser && typeof window.matchMedia === 'function')
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  private isSystemDark = signal<boolean>(
    this.systemDarkQuery ? this.systemDarkQuery.matches : false
  );

  // Computes active theme 'light' | 'dark' depending on current choice and system setting
  readonly activeTheme = computed<'light' | 'dark'>(() => {
    const mode = this.themeMode();
    if (mode === 'system') {
      return this.isSystemDark() ? 'dark' : 'light';
    }
    return mode;
  });

  constructor() {
    this.setupSystemThemeListener();
    this.setupThemeEffect();
  }

  /**
   * Programmatically update the theme mode preference
   */
  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
  }

  /**
   * Retrieves the initial theme mode preference on initialization
   */
  private getInitialMode(): ThemeMode {
    if (this.isBrowser) {
      const savedMode = localStorage.getItem(this.storageKey);
      if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system') {
        return savedMode;
      }
    }
    return 'system';
  }

  /**
   * Subscribes to changes of preferences in the system to reflect them if in 'system' mode
   */
  private setupSystemThemeListener(): void {
    if (!this.isBrowser || !this.systemDarkQuery) {
      return;
    }

    const handler = (e: MediaQueryListEvent) => {
      this.isSystemDark.set(e.matches);
    };

    if (typeof this.systemDarkQuery.addEventListener === 'function') {
      this.systemDarkQuery.addEventListener('change', handler);
    } else {
      (this.systemDarkQuery as any).addListener(handler);
    }
  }

  /**
   * Manages DOM elements class updates and persistence through an effect
   */
  private setupThemeEffect(): void {
    effect(() => {
      const mode = this.themeMode();
      const active = this.activeTheme();

      if (this.isBrowser) {
        localStorage.setItem(this.storageKey, mode);

        const html = this.document.documentElement;
        if (active === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }
    });
  }
}
