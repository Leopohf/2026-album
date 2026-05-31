import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let service: ThemeService;

  beforeEach(async () => {
    localStorage.removeItem('theme-preference');
    document.documentElement.classList.remove('dark');

    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('theme-preference');
    document.documentElement.classList.remove('dark');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a single circular cycle button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Theme: System. Click to switch to Light.');
  });

  it('should cycle theme mode when the button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    expect(button).toBeTruthy();

    // Default is 'system', clicking should cycle to 'light'
    button.click();
    fixture.detectChanges();
    expect(service.themeMode()).toBe('light');
    expect(button.getAttribute('aria-label')).toBe('Theme: Light. Click to switch to Dark.');

    // Click again, should cycle to 'dark'
    button.click();
    fixture.detectChanges();
    expect(service.themeMode()).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe('Theme: Dark. Click to switch to System.');

    // Click again, should cycle back to 'system'
    button.click();
    fixture.detectChanges();
    expect(service.themeMode()).toBe('system');
    expect(button.getAttribute('aria-label')).toBe('Theme: System. Click to switch to Light.');
  });

  it('should apply active transition classes to the active SVG and inactive classes to others', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const svgs = compiled.querySelectorAll('svg');
    expect(svgs.length).toBe(3);

    // Initial state: system theme is active
    expect(svgs[0].classList.contains('opacity-100')).toBe(false); // Sun
    expect(svgs[1].classList.contains('opacity-100')).toBe(false); // Moon
    expect(svgs[2].classList.contains('opacity-100')).toBe(true);  // System (Laptop)

    // Cycle to Light theme
    component.cycleTheme();
    fixture.detectChanges();
    expect(svgs[0].classList.contains('opacity-100')).toBe(true);  // Sun
    expect(svgs[1].classList.contains('opacity-100')).toBe(false); // Moon
    expect(svgs[2].classList.contains('opacity-100')).toBe(false); // System

    // Cycle to Dark theme
    component.cycleTheme();
    fixture.detectChanges();
    expect(svgs[0].classList.contains('opacity-100')).toBe(false); // Sun
    expect(svgs[1].classList.contains('opacity-100')).toBe(true);  // Moon
    expect(svgs[2].classList.contains('opacity-100')).toBe(false); // System
  });
});
