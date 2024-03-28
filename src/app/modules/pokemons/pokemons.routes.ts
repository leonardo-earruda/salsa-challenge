import { Routes } from '@angular/router';
import { AllComponent } from './pages/all/all.component';
import { DetailsComponent } from './pages/details/details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const POKEMONS_ROUTES: Routes = [
  {
    path: 'all',
    component: AllComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
];
