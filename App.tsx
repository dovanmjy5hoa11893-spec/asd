
import React, { useState, useEffect } from 'react';
import { POKEMONS, LEVEL_REQUIREMENTS } from './constants';
import { GameState, Pokemon } from './types';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('pokemon-growth-state');
    return saved ? JSON.parse(saved) : {
      selectedPokemonId: null,
      currentLevel: 0,
      correctAnswersInLevel: 0,
      totalCorrectOverall: 0,
    };
  });

  const [showQuiz, setShowQuiz] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);

  useEffect(() => {
    localStorage.setItem('pokemon-growth-state', JSON.stringify(gameState));
  }, [gameState]);

  const selectPokemon = (id: string) => {
    setGameState(prev => ({ ...prev, selectedPokemonId: id }));
  };

  const handleCorrectAnswer = () => {
    const required = LEVEL_REQUIREMENTS[gameState.currentLevel];
    
    setGameState(prev => {
      const newCorrect = prev.correctAnswersInLevel + 1;
      if (newCorrect >= required && prev.currentLevel < 5) {
        setIsEvolving(true);
        setTimeout(() => setIsEvolving(false), 3000);
        return {
          ...prev,
          currentLevel: prev.currentLevel + 1,
          correctAnswersInLevel: 0,
          totalCorrectOverall: prev.totalCorrectOverall + 1
        };
      }
      return {
        ...prev,
        correctAnswersInLevel: newCorrect,
        totalCorrectOverall: prev.totalCorrectOverall + 1
      };
    });
  };

  const selectedPokemon = POKEMONS.find(p => p.id === gameState.selectedPokemonId);
  const currentLevelRequirement = LEVEL_REQUIREMENTS[gameState.currentLevel] || 0;

  if (!gameState.selectedPokemonId) {
    return (
      <div className="min-h-screen bg-blue-50 py-12 px-4 flex flex-col items-center">
        <header className="text-center mb-12">
          <h1 className="text-5xl text-blue-600 mb-4 drop-shadow-sm">Choose Your Partner!</h1>
          <p className="text-xl text-gray-600 font-medium">Which Pokemon do you want to grow with?</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
          {POKEMONS.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => selectPokemon(pokemon.id)}
              className={`
                pokemon-card cursor-pointer bg-white rounded-3xl p-6 shadow-xl 
                border-4 border-transparent hover:border-blue-400 transition-all text-center
              `}
            >
              <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 mx-auto mb-4 float-anim" />
              <h3 className="text-2xl font-kids text-gray-800">{pokemon.name}</h3>
              <p className={`mt-2 inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${pokemon.color}`}>
                {pokemon.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4">
      {/* Evolution Animation Overlay */}
      {isEvolving && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 animate-pulse">
          <h2 className="text-6xl text-yellow-500 font-kids mb-8 text-center px-4">WOAH! EVOLVING! ✨</h2>
          <img 
            src={selectedPokemon?.image} 
            className="w-64 h-64 animate-ping" 
            alt="evolving"
          />
          <div className="mt-8 text-3xl text-blue-600 font-kids">
            Stage {gameState.currentLevel} Unlocked!
          </div>
        </div>
      )}

      {showQuiz && (
        <Quiz 
          level={gameState.currentLevel} 
          onCorrect={handleCorrectAnswer} 
          onClose={() => setShowQuiz(false)} 
        />
      )}

      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center relative overflow-hidden">
        {/* Background Decor */}
        <div className={`absolute top-0 left-0 w-full h-32 ${selectedPokemon?.color} opacity-20 -z-10`}></div>
        
        <button 
          onClick={() => setGameState({ selectedPokemonId: null, currentLevel: 0, correctAnswersInLevel: 0, totalCorrectOverall: 0 })}
          className="absolute top-6 left-6 text-gray-400 hover:text-red-500 text-sm font-bold"
        >
          ← Restart
        </button>

        <div className="mb-2">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Level {gameState.currentLevel + 1} / 6</span>
        </div>
        
        <h2 className="text-4xl font-kids text-gray-800 mb-6">
          {selectedPokemon?.evolutionStages[gameState.currentLevel]}
        </h2>

        <div className="relative mb-10 group">
          <img 
            src={selectedPokemon?.image} 
            alt="Pokemon" 
            className={`w-64 h-64 mx-auto drop-shadow-2xl transition-all duration-700 ${gameState.currentLevel > 0 ? 'scale-110 rotate-3' : 'scale-90'}`} 
          />
          {/* Progress Circle Visual */}
          <div className="mt-8 max-w-xs mx-auto">
             <div className="flex justify-between items-end mb-2">
                <span className="text-lg font-bold text-gray-500">Progress</span>
                <span className="text-2xl font-kids text-blue-500">
                  {gameState.correctAnswersInLevel} / {currentLevelRequirement}
                </span>
             </div>
             <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden border-2 border-gray-200">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${selectedPokemon?.color}`}
                  style={{ width: `${(gameState.correctAnswersInLevel / currentLevelRequirement) * 100}%` }}
                ></div>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          {gameState.currentLevel < 5 ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-6 px-12 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-kids text-3xl rounded-3xl shadow-[0_8px_0_rgb(202,138,4)] active:shadow-none active:translate-y-2 transition-all"
            >
              LEARN & GROW! 🍎
            </button>
          ) : (
            <div className="bg-green-100 p-6 rounded-3xl border-4 border-green-300">
              <h3 className="text-3xl font-kids text-green-700 mb-2">MAX LEVEL! 👑</h3>
              <p className="text-green-600 font-bold">You are an English Master!</p>
            </div>
          )}

          <div className="pt-6 flex items-center justify-center gap-4 text-gray-400">
             <span className="text-sm font-bold">Total Correct: {gameState.totalCorrectOverall} ⭐</span>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-blue-400 text-sm font-medium">
        Collect 5 Evolutions to become a Pokemon Master!
      </footer>
    </div>
  );
};

export default App;
