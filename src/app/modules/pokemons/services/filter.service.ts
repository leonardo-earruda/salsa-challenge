import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../../../shared/utils/pokemon.model";

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private fetchedPokemons: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
    public fetchedPokemons$ = this.fetchedPokemons.asObservable();
    
    constructor(){}

    setFetchedPokemons(pokemons: Pokemon[]) {
        this.fetchedPokemons.next(pokemons);
    }
}