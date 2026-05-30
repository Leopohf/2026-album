import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from './services/album.service';
import { I18nService } from './services/i18n.service';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, LangSwitcherComponent],
  template: `
    <div class="min-h-screen bg-bg text-ink font-mono selection:bg-ink selection:text-bg">
      <!-- Navbar -->
      <nav class="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a routerLink="/" class="text-lg font-bold uppercase tracking-tighter">{{ i18n.t().nav.title }}</a>

          <div class="flex items-center gap-6">
            @if (albumService.getUsername()) {
              <a routerLink="/album" routerLinkActive="underline" class="text-[10px] uppercase font-bold tracking-widest hover:underline">{{ i18n.t().nav.album }}</a>
              <a routerLink="/profile" routerLinkActive="underline" class="text-[10px] uppercase font-bold tracking-widest hover:underline">{{ i18n.t().nav.profile }}</a>
              <button (click)="logout()" class="text-[10px] uppercase font-bold tracking-widest text-muted hover:text-ink">{{ i18n.t().nav.logout }}</button>
            }
            <app-lang-switcher />
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="py-4">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="py-12 border-t border-border mt-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-[10px] text-muted uppercase tracking-[0.2em]">{{ i18n.t().nav.footer }}</p>
        </div>
      </footer>
    </div>
  `
})
export class App {
  albumService = inject(AlbumService);
  i18n = inject(I18nService);

  logout() {
    this.albumService.logout();
    window.location.href = '/';
  }
}

