
import { Pokemon, PokemonType } from './types';

export const POKEMONS: Pokemon[] = [
  {
    id: 'pikachu',
    name: 'Pikachu',
    type: PokemonType.Electric,
    color: 'bg-yellow-400',
    evolutionStages: ['Pichu', 'Pikachu', 'Sparky Pikachu', 'Thunder Pikachu', 'Raichu', 'Mega Raichu'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
  {
    id: 'charmander',
    name: 'Charmander',
    type: PokemonType.Fire,
    color: 'bg-orange-500',
    evolutionStages: ['Egg', 'Charmander', 'Charmeleon', 'Charizard', 'Mega Charizard X', 'Gigantamax Charizard'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    type: PokemonType.Water,
    color: 'bg-blue-400',
    evolutionStages: ['Tiny Squirtle', 'Squirtle', 'Wartortle', 'Blastoise', 'Mega Blastoise', 'Gigantamax Blastoise'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png'
  },
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    type: PokemonType.Grass,
    color: 'bg-green-400',
    evolutionStages: ['Seed', 'Bulbasaur', 'Ivysaur', 'Venusaur', 'Mega Venusaur', 'Gigantamax Venusaur'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  },
  {
    id: 'eevee',
    name: 'Eevee',
    type: PokemonType.Normal,
    color: 'bg-amber-700',
    evolutionStages: ['Eevee', 'Flareon', 'Vaporeon', 'Jolteon', 'Sylveon', 'Umbreon'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
  },
  {
    id: 'jigglypuff',
    name: 'Jigglypuff',
    type: PokemonType.Fairy,
    color: 'bg-pink-300',
    evolutionStages: ['Igglybuff', 'Jigglypuff', 'Wigglytuff', 'Mega Wigglytuff', 'Star Wigglytuff', 'Queen Wigglytuff'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png'
  },
  {
    id: 'mew',
    name: 'Mew',
    type: PokemonType.Psychic,
    color: 'bg-purple-300',
    evolutionStages: ['Bubble Mew', 'Mew', 'Mewtwo', 'Mega Mewtwo X', 'Mega Mewtwo Y', 'Cosmic Mew'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
  },
  {
    id: 'dratini',
    name: 'Dratini',
    type: PokemonType.Dragon,
    color: 'bg-indigo-400',
    evolutionStages: ['Dratini', 'Dragonair', 'Dragonite', 'Super Dragonite', 'Mega Dragonite', 'Dragon King'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png'
  }
];

export const LEVEL_REQUIREMENTS = [5, 10, 15, 20, 25];

export const FALLBACK_QUESTIONS = [
  { id: '1', text: 'What color is the apple?', options: ['Red', 'Blue', 'Yellow', 'Green'], correctIndex: 0, category: 'Colors' },
  { id: '2', text: 'Which animal says "Woof"?', options: ['Cat', 'Cow', 'Dog', 'Lion'], correctIndex: 2, category: 'Animals' },
  { id: '3', text: 'How many fingers do you have on one hand?', options: ['3', '5', '10', '2'], correctIndex: 1, category: 'Numbers' },
  { id: '4', text: 'Which fruit is yellow?', options: ['Apple', 'Banana', 'Grape', 'Strawberry'], correctIndex: 1, category: 'Fruits' },
  { id: '5', text: 'What do we wear on our feet?', options: ['Hat', 'Shirt', 'Shoes', 'Gloves'], correctIndex: 2, category: 'Clothes' },
];
