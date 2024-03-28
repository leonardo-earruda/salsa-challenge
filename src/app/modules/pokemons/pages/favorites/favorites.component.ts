import { Location, NgClass, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Pokemon } from '../../../../shared/utils/pokemon.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatIconModule,
    NgFor,
    NgStyle,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    NgClass,
    MatInputModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private favorites: Pokemon[] =
    JSON.parse(localStorage.getItem('favorites')!) ?? [];
  protected displayedFavorites: Pokemon[] = this.favorites;
  protected isFiltering: boolean = false;
  protected pokemonFilter: FormControl = new FormControl(
    '',
    Validators.required
  );

  constructor(private router: Router, private location: Location) {}

  public getPokemonInfo(id: number) {
    this.router.navigate(['pokemons/details', id]);
  }

  public isFavorite(id: number): boolean {
    const favorites: Pokemon[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    return !!favorites.find((pokemon) => pokemon.id === id);
  }

  protected setFavorite(pokemon: Pokemon) {
    if (this.isFavorite(pokemon.id)) {
      const index = this.favorites.findIndex((p) => p.id === pokemon.id);
      this.favorites.splice(index, 1);
      this.displayedFavorites = this.favorites;
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  protected filterPokemons(): void {
    const favorites: Pokemon[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    if (this.pokemonFilter.value) {
      this.displayedFavorites = favorites.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(this.pokemonFilter.value.toLowerCase())
      );
    } else {
      this.displayedFavorites = favorites;
    }
    this.pokemonFilter.setValue(null);
    this.isFiltering = true;
  }

  protected restoreFavorites(): void {
    const favorites: Pokemon[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    this.isFiltering = false;
    this.pokemonFilter.setValue(null);
    this.favorites = favorites;
    this.displayedFavorites = favorites;
  }

  protected back() {
    this.location.back();
  }
}
