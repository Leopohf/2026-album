import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { UserHeaderComponent } from '../../components/user-header/user-header.component';
import { StickerGridComponent } from '../../components/sticker-grid/sticker-grid.component';
import { FilterState } from '../../models/sticker.model';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    CommonModule,
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

      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl font-bold uppercase tracking-tighter">{{ sectionName() }}</h2>
        <a routerLink="/album" class="text-xs uppercase hover:underline">Back to album</a>
      </div>

      <app-sticker-grid 
        [stickers]="filteredStickers()"
        (stickerToggled)="albumService.toggleSticker($event)"
        (stickerRepeatChanged)="onRepeatChanged($event)"
      ></app-sticker-grid>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {
  albumService = inject(AlbumService);
  route = inject(ActivatedRoute);
  
  sectionName = signal<string>('');

  filteredStickers = computed(() => {
    const filters: FilterState = {
      search: '',
      status: 'all',
      section: this.sectionName()
    };
    return this.albumService.getFiltered(filters);
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sectionName.set(params['section'] || '');
    });
  }

  onRepeatChanged(event: { id: string; quantity: number }) {
    this.albumService.updateDuplicates(event.id, event.quantity);
  }
}
