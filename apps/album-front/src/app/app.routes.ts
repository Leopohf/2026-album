import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'album',
    loadComponent: () => import('./pages/album/album.component').then(m => m.AlbumComponent)
  },
  {
    path: 'album/:section',
    loadComponent: () => import('./pages/section/section.component').then(m => m.SectionComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
