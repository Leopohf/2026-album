import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sticker } from '../../models/sticker.model';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { StickerCardReact } from './StickerCardReact';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-sticker-card',
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper 
      [component]="StickerCardReact" 
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerCardComponent {
  @Input({ required: true }) sticker!: Sticker;
  @Output() toggled = new EventEmitter<string>();
  @Output() repeatChanged = new EventEmitter<{ id: string; quantity: number }>();

  readonly StickerCardReact = StickerCardReact;
  private readonly i18n = inject(I18nService);

  get reactProps() {
    return {
      sticker: this.sticker,
      statusLabels: this.i18n.t().sticker.status,
      onToggle: (id: string) => this.toggled.emit(id),
      onUpdateDuplicates: (id: string, delta: number) => {
        const newQuantity = Math.max(0, this.sticker.duplicates + delta);
        this.repeatChanged.emit({ id, quantity: newQuantity });
      }
    };
  }
}

