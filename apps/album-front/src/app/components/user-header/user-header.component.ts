import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumStats } from '../../models/sticker.model';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { UserHeaderReact } from './UserHeaderReact';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-user-header',
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper
      [component]="UserHeaderReact"
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHeaderComponent {
  @Input({ required: true }) username!: string;
  @Input({ required: true }) stats!: AlbumStats;
  readonly UserHeaderReact = UserHeaderReact;
  private readonly i18n = inject(I18nService);

  get reactProps() {
    return {
      username: this.username,
      stats: this.stats,
      labels: this.i18n.t().userHeader,
    };
  }
}

