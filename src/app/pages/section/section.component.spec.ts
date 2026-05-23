import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from './section.component';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;
  let albumService: any;
  let paramsSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    paramsSubject = new BehaviorSubject({ section: 'Argentina' });
    albumService = {
      getUsername: vi.fn().mockReturnValue('Leo'),
      getStats: vi.fn().mockReturnValue({ total: 100, owned: 10, missing: 90, duplicates: 0, progress: 10 }),
      getFiltered: vi.fn().mockReturnValue([]),
      toggleSticker: vi.fn(),
      updateDuplicates: vi.fn(),
      getCollapsedSections: vi.fn().mockReturnValue(new Set()),
      getCollapsedGroups: vi.fn().mockReturnValue(new Set())
    };

    await TestBed.configureTestingModule({
      imports: [SectionComponent],
      providers: [
        { provide: AlbumService, useValue: albumService },
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject.asObservable()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set section name from route', () => {
    expect(component).toBeTruthy();
    expect(component.sectionName()).toBe('Argentina');
    expect(albumService.getFiltered).toHaveBeenCalledWith(expect.objectContaining({ section: 'Argentina' }));
  });

  it('should render section name in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Argentina');
  });

  it('should handle repeat changed event', () => {
    component.onRepeatChanged({ id: '1', quantity: 3 });
    expect(albumService.updateDuplicates).toHaveBeenCalledWith('1', 3);
  });

  it('should handle empty section name', () => {
    paramsSubject.next({});
    fixture.detectChanges();
    expect(component.sectionName()).toBe('');
  });
});
