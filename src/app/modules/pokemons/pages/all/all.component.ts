import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { catchError, finalize, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { PokemonsService } from '../../services/pokemons.service';
import { SnackbarService } from '../../services/snackbar.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NamedAPIResource, NamedAPIResourceList, Pokemon } from '../../../../shared/utils/pokemon.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-all',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatButtonModule, NgStyle, MatButtonModule, ReactiveFormsModule, MatButtonModule, NgIf, MatProgressSpinnerModule, MatInputModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
})
export class AllComponent implements OnInit {
  pokemons!: Pokemon[];
  private nextPage: string ='';
  protected pokemonFilter: FormControl = new FormControl('', [Validators.required]);
  protected isFetching: boolean = false;
  protected isFiltering: boolean = false;
  protected totalItems: number = JSON.parse(localStorage.getItem('totalItems') || '0');
  
  constructor(
    private pokemonsService: PokemonsService,
    private router: Router,
    private snackbarService: SnackbarService,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.getFetchedPokemons();
  }

  protected getFetchedPokemons() {
    this.pokemonFilter.setValue(null);
    this.isFiltering = false;
    this.filterService.fetchedPokemons$
      .pipe(
        finalize(() => {
          this.filterService.setFetchedPokemons([]);
          this.nextPage = JSON.parse(localStorage.getItem('nextPage') || 'null');
          localStorage.removeItem('nextPage');
        }) 
      )
      .subscribe((pokemons: Pokemon[]) => {
        if(!pokemons.length) {
          this.getAllByPage()
          return;
        };
        this.pokemons = pokemons;
      });
  }

  private getAllByPage() {
    this.pokemonsService
      .getByPage()
      .pipe(
        switchMap(({count, next, results}: NamedAPIResourceList) => {
          this.totalItems = count;
          localStorage.setItem('totalItems', count.toString());
          this.nextPage = next;
          const pokemonUrls = results.map(
            (pokemon: NamedAPIResource) => pokemon.url
          );
          return forkJoin(
            pokemonUrls.map((url: string) => this.pokemonsService.getByUrl(url))
          );
        })
      )
      .subscribe((response) => {
        const pokemons = response as Pokemon[];
        this.pokemons = pokemons;
      });
  };

  protected loadMore(): void {
    this.pokemonsService.getByUrl(this.nextPage)
      .pipe(
        tap(() => this.isFetching = true),
        map((res) => res as NamedAPIResourceList),
        switchMap(({ count, next, results }) => {
          this.nextPage = next;
          localStorage.setItem('nextPage', next);
          const pokemonUrls = results.map(
            (pokemon: NamedAPIResource) => pokemon.url
          );
          return forkJoin(
            pokemonUrls.map((url: string) => this.pokemonsService.getByUrl(url))
          );
        })
      ).subscribe((pokemons: Pokemon[] | any) => {
        this.isFetching = false;
        this.pokemons = this.pokemons.concat(pokemons);
      });
  }

  public setFavorite(pokemon: Pokemon): void {
    const favorites: Pokemon[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const id = pokemon.id;
    const pokemonIndex = favorites.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) {
      favorites.push(pokemon);
      this.snackbarService.openSnackBar(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} favoritado`, 'Fechar');
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      favorites.splice(pokemonIndex, 1);
      this.snackbarService.openSnackBar(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} desfavoritado`, 'Fechar');
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  public getPokemonInfo(id: number): void {
    this.router.navigate(['pokemons/details', id]);
  }

  public isFavorite(id: number): boolean {
    const favorites: Pokemon[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    return !!favorites.find(pokemon => pokemon.id === id);
  };

  public filterPokemons() {
    this.pokemonsService.getPokemonFiltered(this.pokemonFilter.value.toLowerCase())
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.snackbarService.openSnackBar('Pokemon não encontrado', 'Fechar');
          return of(err);
        })
      )
      .subscribe((response: any) => {
        if(response.status === 404) return;
        this.isFiltering = true;
        this.filterService.setFetchedPokemons(this.pokemons);
        this.pokemons = [response];
      });
  };
}
