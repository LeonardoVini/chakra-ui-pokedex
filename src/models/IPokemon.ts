export interface IPokemon {
  id: string;
  name: string;
  url: string;
  gif_url: string;
  image_url: string;
  types: ITypes[];
  abilities: IAbilities[];
  stats: IStats[];
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