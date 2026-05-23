import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBarComponent } from './filter-bar.component';
import { FilterState } from '../../models/sticker.model';
import { AlbumService } from '../../services/album.service';

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;
  let albumService: any;

  beforeEach(async () => {
    albumService = {
      expandAll: vi.fn(),
      collapseAll: vi.fn(),
      expandGroups: vi.fn(),
      collapseGroups: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [FilterBarComponent],
      providers: [
        { provide: AlbumService, useValue: albumService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
    component.sections = ['Argentina', 'Brazil'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when react component calls onFilterChange', () => {
    const spy = vi.spyOn(component.filtersChanged, 'emit');
    const newFilters: FilterState = { search: 'Messi', status: 'all', section: '' };
    component.reactProps.onFilterChange(newFilters);
    expect(spy).toHaveBeenCalledWith(newFilters);
  });

  it('should call albumService methods when react component calls expansion methods', () => {
    component.reactProps.onExpandAll();
    expect(albumService.expandAll).toHaveBeenCalled();

    component.reactProps.onCollapseAll();
    expect(albumService.collapseAll).toHaveBeenCalled();

    component.reactProps.onExpandGroups();
    expect(albumService.expandGroups).toHaveBeenCalled();

    component.reactProps.onCollapseGroups();
    expect(albumService.collapseGroups).toHaveBeenCalled();
  });
});
