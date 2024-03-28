import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  NamedAPIResourceList,
  Pokemon,
  PokemonSpecies,
} from '../../../shared/utils/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getByPage(): Observable<NamedAPIResourceList> {
    return this.http.get<NamedAPIResourceList>(`${this.API_URL}/pokemon`);
  }

  public getByUrl(url: string): Observable<unknown> {
    return this.http.get<unknown>(url);
  }

  public getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}/pokemon/${id}`);
  }

  public getSpeciesById(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(
      `${this.API_URL}/pokemon-species/${id}`
    );
  }

  public getPokemonFiltered(filter: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.API_URL}/pokemon/${filter}`);
  }

  public getPokemonColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
      default: '#000000',
    };

    return typeColors[type] || typeColors['default'];
  }
}
