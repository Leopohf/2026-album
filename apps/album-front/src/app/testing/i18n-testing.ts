/**
 * Testing utilities for I18nService.
 *
 * Use `provideI18nTesting()` in TestBed providers to synchronously
 * pre-load the en-US translation map so components that inject I18nService
 * don't blow up with "Cannot read properties of undefined" when they call
 * `i18n.t().someKey` during the first detectChanges().
 *
 * Usage:
 *   providers: [
 *     ...provideI18nTesting(),
 *     // other providers
 *   ]
 */
import { Provider } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import enUS from '../i18n/en-US';

/** Creates and pre-configures an I18nService with en-US translations. */
function buildMockI18nService(): I18nService {
  const svc = new I18nService();
  // Bypass async init() — synchronously inject translations via the signal.
  // We access the private signal through the public `init` equivalent.
  (svc as any)['_translations'].set(enUS);
  (svc as any)['_locale'].set('en-US');
  (svc as any)['isReady'].set(true);
  return svc;
}

/**
 * Returns an array of providers to spread into TestBed `providers`.
 * Provides a pre-loaded I18nService (en-US) without requiring async init().
 */
export function provideI18nTesting(): Provider[] {
  return [
    {
      provide: I18nService,
      useFactory: buildMockI18nService,
    },
  ];
}
