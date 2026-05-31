import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      type="button"
      (click)="cycleTheme()"
      class="relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 select-none shadow-sm"
      [attr.aria-label]="ariaLabel()"
      [title]="ariaLabel()"
    >
      <!-- Light Icon (Sun) - Rotates and scales in -->
      <svg 
        class="absolute w-4 h-4 transition-all duration-500 ease-out" 
        [class.opacity-100]="currentMode() === 'light'"
        [class.scale-100]="currentMode() === 'light'"
        [class.rotate-0]="currentMode() === 'light'"
        [class.opacity-0]="currentMode() !== 'light'"
        [class.scale-50]="currentMode() !== 'light'"
        [class.rotate-90]="currentMode() !== 'light'"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>

      <!-- Dark Icon (Moon) - Tilts and scales in -->
      <svg 
        class="absolute w-4 h-4 transition-all duration-500 ease-out" 
        [class.opacity-100]="currentMode() === 'dark'"
        [class.scale-100]="currentMode() === 'dark'"
        [class.rotate-0]="currentMode() === 'dark'"
        [class.opacity-0]="currentMode() !== 'dark'"
        [class.scale-50]="currentMode() !== 'dark'"
        [class.-rotate-45]="currentMode() !== 'dark'"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>

      <!-- System Icon (Laptop) - Fades and scales in -->
      <svg 
        class="absolute w-4 h-4 transition-all duration-500 ease-out" 
        [class.opacity-100]="currentMode() === 'system'"
        [class.scale-100]="currentMode() === 'system'"
        [class.opacity-0]="currentMode() !== 'system'"
        [class.scale-50]="currentMode() !== 'system'"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly currentMode = this.themeService.themeMode;

  readonly ariaLabel = computed(() => {
    const mode = this.currentMode();
    switch (mode) {
      case 'light':
        return 'Theme: Light. Click to switch to Dark.';
      case 'dark':
        return 'Theme: Dark. Click to switch to System.';
      case 'system':
        return 'Theme: System. Click to switch to Light.';
    }
  });

  cycleTheme(): void {
    const mode = this.currentMode();
    let nextMode: ThemeMode;
    switch (mode) {
      case 'light':
        nextMode = 'dark';
        break;
      case 'dark':
        nextMode = 'system';
        break;
      case 'system':
        nextMode = 'light';
        break;
    }
    this.themeService.setThemeMode(nextMode);
  }
}
