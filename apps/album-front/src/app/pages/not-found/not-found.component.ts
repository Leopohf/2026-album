import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-[80vh] flex flex-col items-center justify-center font-mono max-w-md mx-auto px-4 text-center">
      <p class="text-[10px] text-muted uppercase tracking-[0.3em] mb-6">Error 404</p>

      <h1 class="text-4xl font-bold uppercase tracking-tighter mb-2">Page Not Found</h1>

      <div class="w-16 h-px bg-border my-8"></div>

      <p class="text-sm text-muted uppercase tracking-widest mb-12">
        The route you requested does not exist.
      </p>

      <a
        routerLink="/"
        class="border border-ink text-ink text-sm px-8 py-4 uppercase font-bold tracking-widest hover:bg-ink hover:text-bg transition-colors duration-150"
      >
        Back to Home
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
