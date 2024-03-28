import { Routes } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons/all',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'pokemons',
        loadChildren: () =>
          import('./modules/pokemons/pokemons.routes').then(
            (r) => r.POKEMONS_ROUTES
          ),
      },
    ],
  },
];
