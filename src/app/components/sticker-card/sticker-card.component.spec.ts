import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickerCardComponent } from './sticker-card.component';
import { Sticker } from '../../models/sticker.model';

describe('StickerCardComponent', () => {
  let component: StickerCardComponent;
  let fixture: ComponentFixture<StickerCardComponent>;

  const mockSticker: Sticker = {
    id: 'ARG1',
    name: 'Lionel Messi',
    type: 'player',
    number: 10,
    owned: false,
    duplicates: 0,
    section: 'Argentina',
    group: 'A'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StickerCardComponent);
    component = fixture.componentInstance;
    component.sticker = mockSticker;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggled event when react component calls onToggle', () => {
    const spy = vi.spyOn(component.toggled, 'emit');
    component.reactProps.onToggle('ARG1');
    expect(spy).toHaveBeenCalledWith('ARG1');
  });

  it('should emit repeatChanged event when react component calls onUpdateDuplicates', () => {
    const spy = vi.spyOn(component.repeatChanged, 'emit');
    component.reactProps.onUpdateDuplicates('ARG1', 1);
    expect(spy).toHaveBeenCalledWith({ id: 'ARG1', quantity: 1 });
  });

  it('should calculate new quantity correctly in onUpdateDuplicates', () => {
    const spy = vi.spyOn(component.repeatChanged, 'emit');
    
    // Test increment
    component.reactProps.onUpdateDuplicates('ARG1', 1);
    expect(spy).toHaveBeenCalledWith({ id: 'ARG1', quantity: 1 });

    // Test decrement (quantity should not go below 0)
    component.reactProps.onUpdateDuplicates('ARG1', -1);
    expect(spy).toHaveBeenCalledWith({ id: 'ARG1', quantity: 0 });
  });
});
