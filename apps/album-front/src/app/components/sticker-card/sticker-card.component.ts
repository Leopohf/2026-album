import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sticker } from '../../models/sticker.model';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { StickerCardReact } from './StickerCardReact';

@Component({
  selector: 'app-sticker-card',
  standalone: true,
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper 
      [component]="StickerCardReact" 
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickerCardComponent {
  @Input({ required: true }) sticker!: Sticker;
  @Output() toggled = new EventEmitter<string>();
  @Output() repeatChanged = new EventEmitter<{ id: string; quantity: number }>();

  readonly StickerCardReact = StickerCardReact;

  get reactProps() {
    return {
      sticker: this.sticker,
      onToggle: (id: string) => this.toggled.emit(id),
      onUpdateDuplicates: (id: string, delta: number) => {
        const newQuantity = Math.max(0, this.sticker.duplicates + delta);
        this.repeatChanged.emit({ id, quantity: newQuantity });
      }
    };
  }
}
