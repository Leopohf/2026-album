import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from './services/album.service';
import { I18nService } from './services/i18n.service';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, LangSwitcherComponent, ThemeToggleComponent],
  template: `
    <div class="min-h-screen bg-bg text-ink dark:bg-zinc-950 dark:text-zinc-50 font-mono selection:bg-ink selection:text-bg dark:selection:bg-zinc-100 dark:selection:text-zinc-950 transition-colors duration-300">
      <!-- Navbar -->
      <nav class="border-b border-border dark:border-zinc-800/80 bg-surface/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a routerLink="/" class="text-lg font-bold uppercase tracking-tighter text-ink dark:text-zinc-100 hover:opacity-80 transition-opacity">{{ i18n.t().nav.title }}</a>

          <div class="flex items-center gap-6">
            @if (albumService.getUsername()) {
              <a routerLink="/album" routerLinkActive="underline" class="text-[10px] uppercase font-bold tracking-widest text-ink dark:text-zinc-100 hover:underline">{{ i18n.t().nav.album }}</a>
              <a routerLink="/profile" routerLinkActive="underline" class="text-[10px] uppercase font-bold tracking-widest text-ink dark:text-zinc-100 hover:underline">{{ i18n.t().nav.profile }}</a>
              <button (click)="logout()" class="text-[10px] uppercase font-bold tracking-widest text-muted dark:text-zinc-400 hover:text-ink dark:hover:text-zinc-200">{{ i18n.t().nav.logout }}</button>
            }
            <app-theme-toggle />
            <app-lang-switcher />
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="py-4">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="py-12 border-t border-border dark:border-zinc-800/60 mt-20 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-[10px] text-muted dark:text-zinc-500 uppercase tracking-[0.2em]">{{ i18n.t().nav.footer }}</p>
        </div>
      </footer>
    </div>
  `
})
export class App {
  albumService = inject(AlbumService);
  i18n = inject(I18nService);
  themeService = inject(ThemeService);

  logout() {
    this.albumService.logout();
    window.location.href = '/';
  }
}

