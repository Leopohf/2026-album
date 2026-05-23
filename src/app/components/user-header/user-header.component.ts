import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumStats } from '../../models/sticker.model';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { UserHeaderReact } from './UserHeaderReact';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper 
      [component]="UserHeaderReact" 
      [props]="{ username: username, stats: stats }"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHeaderComponent {
  @Input({ required: true }) username!: string;
  @Input({ required: true }) stats!: AlbumStats;
  readonly UserHeaderReact = UserHeaderReact;
}
