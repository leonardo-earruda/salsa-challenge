export interface NamedAPIResource {
    name?: string;
    url?: string;
}

export interface Name {
    name?: string;
    language?: NamedAPIResource;
}

export interface EvolutionChain {
    id?: number;
    baby_trigger_item?: NamedAPIResource;
    chain?: ChainLink;
}

export interface ChainLink {
    is_baby?: boolean;
    species?: NamedAPIResource;
    evolution_details?: EvolutionDetail[];
    evolves_to?: ChainLink[];
}

export interface EvolutionDetail {
    item?: NamedAPIResource;
    trigger?: NamedAPIResource;
    gender?: number;
    held_item?: NamedAPIResource;
    known_move?: NamedAPIResource;
    known_move_type?: NamedAPIResource;
    location?: NamedAPIResource;
    min_level?: number;
    min_happiness?: number;
    min_beauty?: number;
    min_affection?: number;
    needs_overworld_rain?: boolean;
    party_species?: NamedAPIResource;
    party_type?: NamedAPIResource;
    relative_physical_stats?: number;
    time_of_day?: string;
    trade_species?: NamedAPIResource;
    turn_upside_down?: boolean;
}

export interface EvolutionTriggers {
    id?: number;
    name?: string;
    names?: Name[];
    pokemon_species?: NamedAPIResource[];
}