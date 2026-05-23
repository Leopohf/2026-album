import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let albumService: any;
  let router: Router;

  beforeEach(async () => {
    albumService = {
      loadUser: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule],
      providers: [
        { provide: AlbumService, useValue: albumService },
        provideRouter([])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to album when entering username', () => {
    component.username.set('Leo');
    component.enterAlbum();

    expect(albumService.loadUser).toHaveBeenCalledWith('Leo');
    expect(router.navigate).toHaveBeenCalledWith(['/album']);
  });

  it('should disable enter button when username is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    
    expect(button.disabled).toBe(true);
    
    component.username.set('Messi');
    fixture.detectChanges();
    
    expect(button.disabled).toBe(false);
  });

  it('should load last user from localStorage', () => {
    localStorage.setItem('panini_2026_last_user', 'OldUser');
    component.ngOnInit();
    expect(component.lastUser()).toBe('OldUser');
  });

  it('should continue as existing user', () => {
    component.continueAs('OldUser');
    expect(albumService.loadUser).toHaveBeenCalledWith('OldUser');
    expect(router.navigate).toHaveBeenCalledWith(['/album']);
  });
});
