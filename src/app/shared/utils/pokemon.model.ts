export interface NamedAPIResourceList {
    count: number;
    next: string;
    previous: string;
    results: NamedAPIResource[];
}

export interface Language {
    id: number;
    name: string;
    official: boolean;
    ios639: string;
    iso3166: string;
    names: Name[];
}

export interface APIResource {
    url: string;
}

export interface Description {
    description: string;
    language: NamedAPIResource;
}

export interface Effect {
    effect: string;
    language: NamedAPIResource;
}

export interface Encounter {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}

export interface FlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
}

export interface GenerationGameIndex {
    game_index: number;
    generation: NamedAPIResource;
}

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}

export interface Name {
    name: string;
    language: NamedAPIResource;
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface VerboseEffect {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
}

export interface VersionEncounterDetail {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter[];
}

export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface VersionGroupFlavorText {
    text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface Ability {
    id: number;
    name: string;
    is_main_series: boolean;
    generation: NamedAPIResource;
    names: Name[];
    effect_entries: VerboseEffect[];
    effect_changes: AbilityEffectChange[];
    flavor_text_entries: AbilityFlavorText[];
    pokemon: AbilityPokemon[];
}

export interface AbilityEffectChange {
    effect_entries: Effect[];
    version_group: NamedAPIResource;
}

export interface AbilityFlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface AbilityPokemon {
    is_hidden: boolean;
    slot: number;
    pokemon: NamedAPIResource;
}

export interface Characteristic {
    id: number;
    gene_modulo: number;
    possible_values: number[];
}

export interface EggGroup {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface Gender {
    id: number;
    name: string;
    pokemon_species_details: PokemonSpeciesGender[];
    required_for_evolution: NamedAPIResource[];
}

export interface PokemonSpeciesGender {
    rate: number;
    pokemon_species: NamedAPIResource;
}

export interface GrowthRate {
    id: number;
    name: string;
    formula: string;
    descriptions: Description[];
    levels: GrowthRateExperienceLevel[];
    pokemon_species: NamedAPIResource[];
}

export interface GrowthRateExperienceLevel {
    level: number;
    experience: number;
}

export interface Nature {
    id: number;
    name: string;
    decreased_stat: NamedAPIResource;
    increased_stat: NamedAPIResource;
    hates_flavor: NamedAPIResource;
    likes_flavor: NamedAPIResource;
    pokeathlon_stat_changes: NatureStatChange[];
    move_battle_style_preferences: MoveBattleStylePreference[];
    names: Name[];
}

export interface NatureStatChange {
    max_change: number;
    pokeathlon_stat: NamedAPIResource;
}

export interface MoveBattleStylePreference {
    low_hp_preference: number;
    high_hp_preference: number;
    move_battle_style: NamedAPIResource;
}

export interface PokeathlonStat {
    id: number;
    name: string;
    names: Name[];
    affecting_natures: NaturePokeathlonStatAffectSets;
}

export interface NaturePokeathlonStatAffectSets {
    increase: NaturePokeathlonStatAffect[];
    decrease: NaturePokeathlonStatAffect[];
}

export interface NaturePokeathlonStatAffect {
    max_change: number;
    nature: NamedAPIResource;
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    sprites: PokemonSprites;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
    version: NamedAPIResource;
    rarity: number;
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    level_learned_at: number;
}

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
    other?: {
        [key in string]?: {
            [spriteName in string]?: string | null;
        };
    };
    versions?: {
        [version in string]?: {
            [gameTitle in string]?: {
                [spriteName in string]?: string;
            };
        };
    };
}

export interface LocationAreaEncounter {
    location_area: NamedAPIResource;
    version_details: VersionEncounterDetail[];
}

export interface PokemonColor {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface PokemonForm {
    id: number;
    name: string;
    order: number;
    form_order: number;
    is_default: boolean;
    is_battle_only: boolean;
    is_mega: boolean;
    form_name: string;
    pokemon: NamedAPIResource;
    sprites: PokemonFormSprites;
    version_group: NamedAPIResource;
    names: Name[];
    form_names: Name[];
}

export interface PokemonFormSprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
}

export interface PokemonHabitat {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface PokemonShape {
    id: number;
    name: string;
    awesome_names: AwesomeName[];
    names: Name[];
    pokemon_species: NamedAPIResource[];
}

export interface AwesomeName {
    awesome_name: string;
    language: NamedAPIResource;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: NamedAPIResource;
    pokedex_numbers: PokemonSpeciesDexEntry[];
    egg_groups: NamedAPIResource[];
    color: NamedAPIResource;
    shape: NamedAPIResource;
    evolves_from_species: NamedAPIResource;
    evolution_chain: APIResource;
    habitat: NamedAPIResource;
    generation: NamedAPIResource;
    names: Name[];
    pal_park_encounters: PalParkEncounterArea[];
    flavor_text_entries: FlavorText[];
    form_descriptions: Description[];
    genera: Genus[];
    varieties: PokemonSpeciesVariety[];
}

export interface Genus {
    genus: string;
    language: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
    entry_number: number;
    pokedex: NamedAPIResource;
}

export interface PalParkEncounterArea {
    base_score: number;
    rate: number;
    area: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
    is_default: boolean;
    pokemon: NamedAPIResource;
}