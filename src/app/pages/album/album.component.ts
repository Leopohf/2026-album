import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { UserHeaderComponent } from '../../components/user-header/user-header.component';
import { StatsPanelComponent } from '../../components/stats-panel/stats-panel.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { StickerGridComponent } from '../../components/sticker-grid/sticker-grid.component';
import { FilterState } from '../../models/sticker.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    StatsPanelComponent,
    FilterBarComponent,
    StickerGridComponent
  ],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-user-header 
        [username]="albumService.getUsername()" 
        [stats]="albumService.getStats()"
      ></app-user-header>

      <app-stats-panel 
        [stats]="albumService.getStats()"
      ></app-stats-panel>

      <app-filter-bar 
        [sections]="albumService.getSections()"
        (filtersChanged)="onFiltersChanged($event)"
      ></app-filter-bar>

      <app-sticker-grid 
        [stickers]="filteredStickers()"
        (stickerToggled)="albumService.toggleSticker($event)"
        (stickerRepeatChanged)="onRepeatChanged($event)"
      ></app-sticker-grid>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent {
  albumService = inject(AlbumService);
  
  filters = signal<FilterState>({
    search: '',
    status: 'all',
    section: ''
  });

  filteredStickers = computed(() => {
    return this.albumService.getFiltered(this.filters());
  });

  onFiltersChanged(newFilters: FilterState) {
    this.filters.set(newFilters);
  }

  onRepeatChanged(event: { id: string; quantity: number }) {
    this.albumService.updateDuplicates(event.id, event.quantity);
  }
}
