import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { I18nService } from '../../services/i18n.service';
import { UserHeaderComponent } from '../../components/user-header/user-header.component';
import { StickerGridComponent } from '../../components/sticker-grid/sticker-grid.component';
import { FilterState } from '../../models/sticker.model';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserHeaderComponent,
    StickerGridComponent
  ],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8 font-mono">
      <app-user-header 
        [username]="albumService.getUsername()" 
        [stats]="albumService.getStats()"
      ></app-user-header>

      <section class="mb-12">
        <h2 class="text-xl font-bold uppercase mb-6 tracking-widest border-l-4 border-ink pl-4">{{ i18n.t().profile.dataManagement }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="border border-border p-6">
            <h3 class="text-sm font-bold uppercase mb-4">{{ i18n.t().profile.exportTitle }}</h3>
            <p class="text-xs text-muted mb-6 uppercase">{{ i18n.t().profile.exportDescription }}</p>
            <textarea 
              readonly 
              class="w-full h-32 bg-bg border border-border p-3 text-[10px] font-mono mb-4 focus:outline-none"
              [value]="exportData()"
              #exportArea
            ></textarea>
            <button 
              (click)="copyToClipboard(exportArea)"
              class="w-full border border-ink text-ink text-xs px-4 py-3 uppercase font-bold hover:bg-ink hover:text-white transition-colors"
            >
              {{ i18n.t().profile.copyButton }}
            </button>
          </div>

          <div class="border border-border p-6">
            <h3 class="text-sm font-bold uppercase mb-4">{{ i18n.t().profile.importTitle }}</h3>
            <p class="text-xs text-muted mb-6 uppercase">{{ i18n.t().profile.importDescription }}</p>
            <textarea 
              class="w-full h-32 bg-bg border border-border p-3 text-[10px] font-mono mb-4 focus:outline-none"
              [(ngModel)]="importJson"
              placeholder='{"username": "...", "stickers": {...}}'
            ></textarea>
            <button 
              (click)="importAlbum()"
              [disabled]="!importJson"
              class="w-full border border-ink text-ink text-xs px-4 py-3 uppercase font-bold hover:bg-ink hover:text-white transition-colors disabled:opacity-30"
            >
              {{ i18n.t().profile.restoreButton }}
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-bold uppercase mb-6 tracking-widest border-l-4 border-ink pl-4">{{ i18n.t().profile.duplicateStickers }}</h2>
        @if (duplicates().length > 0) {
          <app-sticker-grid 
            [stickers]="duplicates()"
            (stickerToggled)="albumService.toggleSticker($event)"
            (stickerRepeatChanged)="onRepeatChanged($event)"
          ></app-sticker-grid>
        } @else {
          <div class="py-12 border border-dashed border-border text-center text-muted uppercase text-xs">
            {{ i18n.t().profile.noDuplicates }}
          </div>
        }
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  albumService = inject(AlbumService);
  readonly i18n = inject(I18nService);
  importJson = '';

  exportData = computed(() => this.albumService.exportAlbum());

  duplicates = computed(() => {
    const filters: FilterState = {
      search: '',
      status: 'duplicates',
      section: ''
    };
    return this.albumService.getFiltered(filters);
  });

  onRepeatChanged(event: { id: string; quantity: number }) {
    this.albumService.updateDuplicates(event.id, event.quantity);
  }

  copyToClipboard(area: HTMLTextAreaElement) {
    area.select();
    document.execCommand('copy');
    alert(this.i18n.t().profile.copiedAlert);
  }

  importAlbum() {
    if (confirm(this.i18n.t().profile.importConfirm)) {
      this.albumService.importAlbum(this.importJson);
      this.importJson = '';
    }
  }
}

