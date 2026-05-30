import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sticker } from '../../models/sticker.model';
import { AlbumService } from '../../services/album.service';
import { I18nService } from '../../services/i18n.service';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { StickerGridReact } from './StickerGridReact';

@Component({
  selector: 'app-sticker-grid',
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper 
      [component]="StickerGridReact" 
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerGridComponent {
  albumService = inject(AlbumService);
  private readonly i18n = inject(I18nService);
  @Input({ required: true }) stickers: Sticker[] = [];
  @Output() stickerToggled = new EventEmitter<string>();
  @Output() stickerRepeatChanged = new EventEmitter<{ id: string; quantity: number }>();

  readonly StickerGridReact = StickerGridReact;

  get reactProps() {
    const t = this.i18n.t();
    return {
      stickers: this.stickers,
      collapsedSections: this.albumService.getCollapsedSections(),
      collapsedGroups: this.albumService.getCollapsedGroups(),
      labels: {
        noResults: t.sticker.noResults,
        group: t.sticker.group,
        expand: t.sticker.expand,
        collapse: t.sticker.collapse,
        statusLabels: t.sticker.status,
      },
      onToggleSection: (section: string) => this.albumService.toggleSection(section),
      onToggleGroup: (group: string) => this.albumService.toggleGroup(group),
      onToggled: (id: string) => this.stickerToggled.emit(id),
      onRepeatChanged: (id: string, quantity: number) => 
        this.stickerRepeatChanged.emit({ id, quantity })
    };
  }
}

