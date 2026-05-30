import { Component, inject, signal, PLATFORM_ID, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-[80vh] flex flex-col items-center justify-center font-mono max-w-md mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-2 uppercase tracking-tighter">{{ i18n.t().home.title }}</h1>
      <p class="text-sm text-muted uppercase mb-12 tracking-widest">{{ i18n.t().home.subtitle }}</p>

      <div class="w-full space-y-4">
        <input 
          type="text" 
          [(ngModel)]="username"
          [placeholder]="i18n.t().home.inputPlaceholder"
          class="w-full bg-transparent border border-ink p-4 text-sm focus:outline-none uppercase text-center font-bold"
          (keyup.enter)="enterAlbum()"
        >
        
        <button 
          (click)="enterAlbum()"
          [disabled]="!username()"
          class="w-full border border-ink text-ink text-sm px-4 py-4 uppercase font-bold tracking-widest hover:bg-ink hover:text-white transition-colors duration-150 disabled:opacity-30"
        >
          {{ i18n.t().home.enterButton }}
        </button>

        @if (lastUser()) {
          <div class="pt-8 mt-8 border-t border-border">
            <p class="text-[10px] text-muted uppercase mb-4">{{ i18n.t().home.continueAs }}</p>
            <button 
              (click)="continueAs(lastUser()!)"
              class="text-sm font-bold uppercase hover:underline"
            >
              {{ lastUser() }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private albumService = inject(AlbumService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  readonly i18n = inject(I18nService);

  username = signal('');
  lastUser = signal<string | null>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.lastUser.set(localStorage.getItem('panini_2026_last_user'));
    }
  }

  enterAlbum() {
    if (this.username()) {
      this.albumService.loadUser(this.username());
      this.router.navigate(['/album']);
    }
  }

  continueAs(user: string) {
    this.albumService.loadUser(user);
    this.router.navigate(['/album']);
  }
}

