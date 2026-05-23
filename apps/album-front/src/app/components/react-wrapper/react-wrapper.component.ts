import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
  ChangeDetectionStrategy,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createRoot, Root } from 'react-dom/client';
import * as React from 'react';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactWrapperComponent implements OnChanges, OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private root: Root | null = null;

  @Input({ required: true }) component!: React.ComponentType<any>;
  @Input() props: Record<string, any> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformBrowser(this.platformId)) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }

  private render(): void {
    if (!this.root) {
      this.root = createRoot(this.elementRef.nativeElement);
    }

    this.root.render(React.createElement(this.component, this.props));
  }
}
