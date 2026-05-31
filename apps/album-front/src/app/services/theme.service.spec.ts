import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let matchesMock = false;
  let mediaQueryListener: ((e: any) => void) | null = null;

  beforeEach(() => {
    localStorage.removeItem('theme-preference');
    document.documentElement.classList.remove('dark');
    matchesMock = false;
    mediaQueryListener = null;

    // Standard matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: matchesMock,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn().mockImplementation((event, callback) => {
          if (event === 'change') {
            mediaQueryListener = callback;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.removeItem('theme-preference');
    document.documentElement.classList.remove('dark');
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with system preference if no saved preference exists', () => {
    expect(service.themeMode()).toBe('system');
  });

  it('should update theme mode and persist choice in localStorage', () => {
    service.setThemeMode('dark');
    TestBed.flushEffects();
    expect(service.themeMode()).toBe('dark');
    expect(localStorage.getItem('theme-preference')).toBe('dark');

    service.setThemeMode('light');
    TestBed.flushEffects();
    expect(service.themeMode()).toBe('light');
    expect(localStorage.getItem('theme-preference')).toBe('light');
  });

  it('should update HTML class depending on active theme choice', () => {
    service.setThemeMode('dark');
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    service.setThemeMode('light');
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should react to system theme changes in real-time when mode is system', () => {
    // Assert initial state when system is light
    expect(service.activeTheme()).toBe('light');

    // Simulate system change to dark
    if (mediaQueryListener) {
      matchesMock = true;
      mediaQueryListener({ matches: true } as any);
    }
    
    TestBed.flushEffects();
    expect(service.activeTheme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
