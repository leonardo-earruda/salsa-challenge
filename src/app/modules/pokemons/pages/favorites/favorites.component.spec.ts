import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';

export const mockFavorites = [
  { id: 1, name: 'Pikachu' },
  { id: 2, name: 'Bulbasaur' },
  { id: 3, name: 'Charmander' },
];

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the pokemons correctly', () => {
    localStorage.setItem('favorites', JSON.stringify(mockFavorites));

    const mockFilterValue = 'Pik';

    component.pokemonFilter.setValue(mockFilterValue);

    component.filterPokemons();

    expect(component.displayedFavorites.length).toBe(1);
    expect(component.displayedFavorites[0].name).toBe('Pikachu');
  });

  it('should return false if a pokemon is not favorite', () => {
    localStorage.setItem('favorites', JSON.stringify(mockFavorites));
    const pokemonId = 4;

    const result = component.isFavorite(pokemonId);

    expect(result).toBe(false);
  });
});
