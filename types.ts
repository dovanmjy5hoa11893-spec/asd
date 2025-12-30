
export enum PokemonType {
  Electric = 'Electric',
  Fire = 'Fire',
  Water = 'Water',
  Grass = 'Grass',
  Psychic = 'Psychic',
  Fairy = 'Fairy',
  Normal = 'Normal',
  Dragon = 'Dragon'
}

export interface Pokemon {
  id: string;
  name: string;
  type: PokemonType;
  color: string;
  evolutionStages: string[]; // Names for the 5 levels
  image: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  category: string;
  imageUrl?: string;
}

export interface GameState {
  selectedPokemonId: string | null;
  currentLevel: number; // 0 to 5
  correctAnswersInLevel: number;
  totalCorrectOverall: number;
}
