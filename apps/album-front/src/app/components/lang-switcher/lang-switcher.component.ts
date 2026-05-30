import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { LangSwitcher } from './LangSwitcher';
import { I18nService } from '../../services/i18n.service';
import { Locale } from '../../i18n/types';

@Component({
  selector: 'app-lang-switcher',
  imports: [ReactWrapperComponent],
  template: `
    <app-react-wrapper
      [component]="LangSwitcher"
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitcherComponent {
  private readonly i18n = inject(I18nService);
  readonly LangSwitcher = LangSwitcher;

  get reactProps() {
    return {
      currentLocale: this.i18n.locale(),
      onSwitch: (locale: Locale) => this.i18n.setLocale(locale),
    };
  }
}
