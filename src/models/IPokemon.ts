export interface IPokemon {
  id: string;
  name: string;
  url: string;
  gif_url: string;
  image_url: string;
  base_experience: number;
  height: string;
  weight: string;
  types: ITypes[];
  abilities: IAbilities[];
  stats: IStats[];
  flavor_text: string;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: IEvolutionChain[];
}

interface IEvolutionChain {
  min_level: number;
  species_name: string;
  image_url: string;
  gif_url: string;
}

interface IAbilities {
  ability: {
    name: string;
    url: string;
  }
}

interface IStats {
  base_stat: number;
  stat: {
    name: string;
    label: string;
    color: string;
    url: string;
  }
}

interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  }
  color: string;
}