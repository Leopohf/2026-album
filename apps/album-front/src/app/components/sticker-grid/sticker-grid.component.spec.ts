import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickerGridComponent } from './sticker-grid.component';
import { Sticker } from '../../models/sticker.model';
import { AlbumService } from '../../services/album.service';

describe('StickerGridComponent', () => {
  let component: StickerGridComponent;
  let fixture: ComponentFixture<StickerGridComponent>;
  let albumService: any;

  const stickers: Sticker[] = [
    { id: 'ARG1', name: 'Messi', number: 10, section: 'Argentina', group: 'A', type: 'player', owned: false, duplicates: 0 }
  ];

  beforeEach(async () => {
    albumService = {
      toggleSection: vi.fn(),
      toggleGroup: vi.fn(),
      toggleSticker: vi.fn(),
      updateDuplicates: vi.fn(),
      getCollapsedSections: vi.fn().mockReturnValue(new Set()),
      getCollapsedGroups: vi.fn().mockReturnValue(new Set())
    };

    await TestBed.configureTestingModule({
      imports: [StickerGridComponent],
      providers: [
        { provide: AlbumService, useValue: albumService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StickerGridComponent);
    component = fixture.componentInstance;
    component.stickers = stickers;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call albumService methods when react component calls expansion callbacks', () => {
    component.reactProps.onToggleSection('Argentina');
    expect(albumService.toggleSection).toHaveBeenCalledWith('Argentina');

    component.reactProps.onToggleGroup('A');
    expect(albumService.toggleGroup).toHaveBeenCalledWith('A');
  });

  it('should emit events when react component calls sticker callbacks', () => {
    const toggleSpy = vi.spyOn(component.stickerToggled, 'emit');
    const repeatSpy = vi.spyOn(component.stickerRepeatChanged, 'emit');

    component.reactProps.onToggled('ARG1');
    expect(toggleSpy).toHaveBeenCalledWith('ARG1');

    component.reactProps.onRepeatChanged('ARG1', 2);
    expect(repeatSpy).toHaveBeenCalledWith({ id: 'ARG1', quantity: 2 });
  });
});
