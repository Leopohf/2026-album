import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { AlbumComponent } from './pages/album/album.component';
import { SectionComponent } from './pages/section/section.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Location } from '@angular/common';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to home by default', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('');
  });

  it('should navigate to album', async () => {
    await router.navigate(['/album']);
    expect(location.path()).toBe('/album');
  });

  it('should navigate to section', async () => {
    await router.navigate(['/album/argentina']);
    expect(location.path()).toBe('/album/argentina');
  });

  it('should navigate to profile', async () => {
    await router.navigate(['/profile']);
    expect(location.path()).toBe('/profile');
  });

  it('should show not-found page for unknown routes', async () => {
    await router.navigate(['/unknown-route']);
    expect(location.path()).toBe('/unknown-route');
  });
});
