import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './album.component';
import { AlbumService } from '../../services/album.service';
import { FilterState } from '../../models/sticker.model';
import { provideRouter } from '@angular/router';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let albumService: any;

  beforeEach(async () => {
    albumService = {
      getUsername: vi.fn().mockReturnValue('Leo'),
      getStats: vi.fn().mockReturnValue({ total: 100, owned: 10, missing: 90, duplicates: 0, progress: 10 }),
      getSections: vi.fn().mockReturnValue([]),
      getFiltered: vi.fn().mockReturnValue([]),
      toggleSticker: vi.fn(),
      updateDuplicates: vi.fn(),
      getCollapsedSections: vi.fn().mockReturnValue(new Set()),
      getCollapsedGroups: vi.fn().mockReturnValue(new Set())
    };

    await TestBed.configureTestingModule({
      imports: [AlbumComponent],
      providers: [
        { provide: AlbumService, useValue: albumService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filters', () => {
    const newFilters: FilterState = { search: 'Messi', status: 'all', section: '' };
    component.onFiltersChanged(newFilters);
    expect(component.filters()).toEqual(newFilters);
  });

  it('should handle repeat changed event', () => {
    component.onRepeatChanged({ id: 'ARG1', quantity: 5 });
    expect(albumService.updateDuplicates).toHaveBeenCalledWith('ARG1', 5);
  });
});
