import { Button } from "@/components/ui/button";
import { useState } from "react";
import { POOP_DATABASE, PoopType } from "@/data/poopDatabase";

interface PoopdexScreenProps {
  onBackToGame: () => void;
  unlockedPoops?: string[];
}

const PoopdexScreen = ({ onBackToGame, unlockedPoops = ['basic_blob'] }: PoopdexScreenProps) => {
  const [selectedPoop, setSelectedPoop] = useState<PoopType | null>(null);

  const unlockedCount = unlockedPoops.length;
  const totalCount = POOP_DATABASE.length;

  const getRarityColor = (rarity: PoopType['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="border-4 border-accent bg-card p-4 mb-6">
        <h1 className="text-2xl font-pixel text-foreground text-center pixel-text-glow">
          POOPDEX
        </h1>
        <p className="text-sm font-pixel text-muted-foreground text-center mt-2">
          {unlockedCount}/{totalCount} COLLECTED
        </p>
      </div>

      {/* Collection grid */}
      <div className="grid grid-cols-4 gap-3 mb-6 flex-1 overflow-y-auto">
        {POOP_DATABASE.map((poop, index) => {
          const isUnlocked = unlockedPoops.includes(poop.id);
          const isSelected = selectedPoop?.id === poop.id;
          
          return (
            <div
              key={poop.id}
              className={`
                aspect-square border-2 flex flex-col items-center justify-center p-2 cursor-pointer
                transition-all duration-200
                ${isUnlocked 
                  ? 'border-accent bg-accent/10 hover:bg-accent/20' 
                  : 'border-muted bg-muted/10'
                }
                ${isSelected ? 'border-4 border-accent shadow-lg scale-105' : ''}
              `}
              onClick={() => isUnlocked && setSelectedPoop(poop)}
            >
              {isUnlocked ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">
                    {poop.emoji}
                  </div>
                  <div className={`text-xs font-pixel ${getRarityColor(poop.rarity)}`}>
                    {poop.rarity.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-pixel text-muted">?</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected poop info */}
      {selectedPoop && (
        <div className="border-2 border-accent bg-card p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center text-3xl">
              {selectedPoop.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-pixel text-foreground">{selectedPoop.name}</h2>
                <span className={`text-xs font-pixel px-2 py-1 border border-accent rounded ${getRarityColor(selectedPoop.rarity)}`}>
                  {selectedPoop.rarity.toUpperCase()}
                </span>
              </div>
              <p className="text-xs font-pixel text-muted-foreground mb-2">
                {selectedPoop.description}
              </p>
              <p className="text-xs font-pixel text-accent">
                {selectedPoop.unlockHint}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-pixel text-muted-foreground">WEIRDNESS:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < selectedPoop.weirdness ? 'text-accent' : 'text-muted'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PoopdexScreen;