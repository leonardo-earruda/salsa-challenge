import { Location, NgClass, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Evolutions } from '../../../../shared/utils/evolutions.model';
import {
  Pokemon,
  PokemonSpecies,
} from '../../../../shared/utils/pokemon.model';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatProgressBar,
    MatIconModule,
    MatButtonModule,
    TitleCasePipe,
    MatCardModule,
    NgClass,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private pokemonId: number;
  public pokemon: any;
  protected evolutions: string = '';
  urlsAndNames: Evolutions[] = [];
  styleElement: HTMLStyleElement;
  clickedColor: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonsService,
    private location: Location,
    private elementRef: ElementRef
  ) {
    this.pokemonId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getPokemon();
    this.getEvolutionChain();
    this.styleElement = document.createElement('style');
  }

  ngOnInit(): void {}

  private getPokemon(): void {
    this.pokemonService
      .getPokemonById(this.pokemonId)
      .subscribe((pokemon: Pokemon) => {
        this.pokemon = pokemon;
        this.changeColors();
      });
  }

  private getEvolutionChain(): void {
    this.pokemonService
      .getSpeciesById(this.pokemonId)
      .pipe(
        switchMap((evolutionChain: PokemonSpecies) => {
          this.evolutions = evolutionChain.evolution_chain.url;
          return this.pokemonService.getByUrl(this.evolutions);
        })
      )
      .subscribe((evolutionChain: any) => {
        this.extractUrlsAndNames(evolutionChain.chain);
      });
  }

  private extractUrlsAndNames(data: any): void {
    if (data.species) {
      this.urlsAndNames.push({
        url: data?.species?.url,
        name: data?.species?.name,
        minLevel: data?.evolution_details[0]?.min_level,
      });
    }
    if (data.evolves_to && data.evolves_to.length > 0) {
      data.evolves_to.forEach((evolution: any) => {
        this.extractUrlsAndNames(evolution);
      });
      return;
    }
    this.displayEvolutionChain(this.urlsAndNames);
  }

  private displayEvolutionChain(evolutions: Evolutions[]): void {
    for (let evolution of evolutions) {
      this.pokemonService
        .getByUrl(evolution.url.replace('-species', ''))
        .pipe(map((res) => res as Pokemon))
        .subscribe((pokemon: Pokemon) => {
          evolution.pokemonName = pokemon.name;
          evolution.image = pokemon.sprites.front_default;
        });
    }
  }

  protected changeColors(clickedColor?: string) {
    this.clickedColor = clickedColor ? clickedColor : '';
    const rootElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    rootElement.style.setProperty(
      '--primary-color',
      clickedColor ? this.getColor(clickedColor) : this.getColor()
    );
  }

  getColor(clickedColor?: string): string {
    let color = null;
    if (clickedColor) {
      color = this.pokemon.types.find(
        (type: any) =>
          type.type.name.toLocaleLowerCase() ===
          clickedColor.toLocaleLowerCase()
      )?.type.name;
    }
    return this.pokemonService.getPokemonColor(
      color ? color : this.pokemon.types[0].type.name
    );
  }

  protected back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    const rootElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    rootElement.style.setProperty('--primary-color', 'black');
  }
}
