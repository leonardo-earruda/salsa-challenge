import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonsService } from '../../services/pokemons.service';
import { DetailsComponent } from './details.component';

export const mockPokemon = {
  types: [{ type: { name: 'fire' } }, { type: { name: 'water' } }],
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DetailsComponent, HttpClientModule],
      providers: [PokemonsService],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    pokemonsService = TestBed.inject(PokemonsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the color based on the type of the clicked pokemon', () => {
    const clickedColor = 'fire';

    component.pokemon = mockPokemon;

    spyOn(pokemonsService, 'getPokemonColor').and.returnValue('#EE8130');

    const result = component.getColor(clickedColor);

    expect(pokemonsService.getPokemonColor).toHaveBeenCalledWith(clickedColor);
    expect(result).toEqual('#EE8130');
  });
});
