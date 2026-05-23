import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumStats } from '../../models/sticker.model';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { StatsPanelReact } from './StatsPanelReact';

@Component({
  selector: 'app-stats-panel',
  standalone: true,
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper 
      [component]="StatsPanelReact" 
      [props]="{ stats: stats }"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsPanelComponent {
  @Input({ required: true }) stats!: AlbumStats;
  readonly StatsPanelReact = StatsPanelReact;
}
