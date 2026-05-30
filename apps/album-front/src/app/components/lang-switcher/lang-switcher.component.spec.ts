import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangSwitcherComponent } from './lang-switcher.component';
import { provideI18nTesting } from '../../testing/i18n-testing';
import { I18nService } from '../../services/i18n.service';
import { expect, it, describe, vi } from 'vitest';

describe('LangSwitcherComponent', () => {
  let component: LangSwitcherComponent;
  let fixture: ComponentFixture<LangSwitcherComponent>;
  let i18nService: I18nService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangSwitcherComponent],
      providers: [...provideI18nTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LangSwitcherComponent);
    component = fixture.componentInstance;
    i18nService = TestBed.inject(I18nService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct reactProps', () => {
    const props = component.reactProps;
    expect(props.currentLocale).toBe('en-US');
    expect(typeof props.onSwitch).toBe('function');
  });

  it('should set locale on switch', async () => {
    const setLocaleSpy = vi.spyOn(i18nService, 'setLocale').mockImplementation(() => Promise.resolve());
    const props = component.reactProps;
    props.onSwitch('es-CO');
    expect(setLocaleSpy).toHaveBeenCalledWith('es-CO');
  });
});
