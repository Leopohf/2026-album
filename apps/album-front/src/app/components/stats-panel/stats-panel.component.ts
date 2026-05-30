import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumStats } from '../../models/sticker.model';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { StatsPanelReact } from './StatsPanelReact';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-stats-panel',
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper
      [component]="StatsPanelReact"
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsPanelComponent {
  @Input({ required: true }) stats!: AlbumStats;
  readonly StatsPanelReact = StatsPanelReact;
  private readonly i18n = inject(I18nService);

  get reactProps() {
    return {
      stats: this.stats,
      labels: this.i18n.t().stats,
    };
  }
}

