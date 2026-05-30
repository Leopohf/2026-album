import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsPanelComponent } from './stats-panel.component';
import { AlbumStats } from '../../models/sticker.model';
import { provideI18nTesting } from '../../testing/i18n-testing';

describe('StatsPanelComponent', () => {
  let component: StatsPanelComponent;
  let fixture: ComponentFixture<StatsPanelComponent>;

  const mockStats: AlbumStats = {
    total: 100,
    owned: 60,
    missing: 40,
    duplicates: 10,
    progress: 60
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsPanelComponent],
      providers: [...provideI18nTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsPanelComponent);
    component = fixture.componentInstance;
    component.stats = mockStats;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
