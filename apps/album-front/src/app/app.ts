import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from './services/album.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  template: `
    <div class="min-h-screen bg-bg text-ink font-mono selection:bg-ink selection:text-bg">
      <!-- Navbar -->
      <nav class="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a routerLink="/" class="text-lg font-bold uppercase tracking-tighter">World Cup 2026</a>

          @if (albumService.getUsername()) {
            <div class="flex items-center gap-6">
              <a routerLink="/album" routerLinkActive="underline" class="text-[10px] uppercase font-bold tracking-widest hover:underline">Album</a>
              <a routerLink="/profile" routerLinkActive="underline" class="text-[10px] uppercase font-bold tracking-widest hover:underline">Profile</a>
              <button (click)="logout()" class="text-[10px] uppercase font-bold tracking-widest text-muted hover:text-ink">Logout</button>
            </div>
          }
        </div>      </nav>

      <!-- Main Content -->
      <main class="py-4">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="py-12 border-t border-border mt-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-[10px] text-muted uppercase tracking-[0.2em]">Panini World Cup 2026 • Minimalist Tracker</p>
        </div>
      </footer>
    </div>
  `
})
export class App {
  albumService = inject(AlbumService);

  logout() {
    this.albumService.logout();
    window.location.href = '/';
  }
}
