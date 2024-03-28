import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {  NamedAPIResourceList, Pokemon, PokemonSpecies } from '../../../shared/utils/pokemon.model';

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
  };
  
  public getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}/pokemon/${id}`);
  }

  public getSpeciesById(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.API_URL}/pokemon-species/${id}`);
  }

  public getPokemonFiltered(filter: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.API_URL}/pokemon/${filter}`);
  }

  public getPokemonColor(type: string): string {
    switch (type) {
      case 'normal':
        return '#A8A77A';
      case 'fire':
        return '#EE8130';
      case 'water':
        return '#6390F0';
      case 'electric':
        return '#F7D02C';
      case 'grass':
        return '#7AC74C';
      case 'ice':
        return '#96D9D6';
      case 'fighting':
        return '#C22E28';
      case 'poison':
        return '#A33EA1';
      case 'ground':
        return '#E2BF65';
      case 'flying':
        return '#A98FF3';
      case 'psychic':
        return '#F95587';
      case 'bug':
        return '#A6B91A';
      case 'rock':
        return '#B6A136';
      case 'ghost':
        return '#735797';
      case 'dragon':
        return '#6F35FC';
      case 'dark':
        return '#705746';
      case 'steel':
        return '#B7B7CE';
      case 'fairy':
        return '#D685AD';
      default:
        return '#000000';
    }
  }
}
