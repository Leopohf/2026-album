import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHeaderComponent } from './user-header.component';
import { AlbumStats } from '../../models/sticker.model';

describe('UserHeaderComponent', () => {
  let component: UserHeaderComponent;
  let fixture: ComponentFixture<UserHeaderComponent>;

  const mockStats: AlbumStats = {
    total: 100,
    owned: 60,
    missing: 40,
    duplicates: 10,
    progress: 60
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
    component.username = 'LeoMessi';
    component.stats = mockStats;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
