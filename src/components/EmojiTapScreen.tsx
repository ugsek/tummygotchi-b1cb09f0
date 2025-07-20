import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmojiTapScreenProps {
  onConfirm: (foods: string[]) => void;
  onPhotoTaken?: (imageData: string) => void;
}

const allFoods = [
  // HEALTHY (Green background)
  { emoji: "🍎", name: "apple", category: "healthy" },
  { emoji: "🍌", name: "banana", category: "healthy" },
  { emoji: "🍊", name: "orange", category: "healthy" },
  { emoji: "🍓", name: "berries", category: "healthy" },
  { emoji: "🥦", name: "broccoli", category: "healthy" },
  { emoji: "🥕", name: "carrot", category: "healthy" },
  { emoji: "🥬", name: "salad", category: "healthy" },
  { emoji: "🐟", name: "fish", category: "healthy" },
  { emoji: "🥚", name: "eggs", category: "healthy" },
  { emoji: "🥛", name: "milk", category: "healthy" },
  { emoji: "🧀", name: "cheese", category: "healthy" },
  { emoji: "💧", name: "water", category: "healthy" },

  // FILLING (Blue background)
  { emoji: "🍞", name: "bread", category: "filling" },
  { emoji: "🍝", name: "pasta", category: "filling" },
  { emoji: "🍚", name: "rice", category: "filling" },
  { emoji: "🥔", name: "potato", category: "filling" },
  { emoji: "🍗", name: "chicken", category: "filling" },
  { emoji: "🥩", name: "meat", category: "filling" },
  { emoji: "🫘", name: "beans", category: "filling" },
  { emoji: "🥜", name: "nuts", category: "filling" },

  // TREATS (Purple background)
  { emoji: "🍕", name: "pizza", category: "treats" },
  { emoji: "🍔", name: "burger", category: "treats" },
  { emoji: "🍟", name: "fries", category: "treats" },
  { emoji: "🍪", name: "cookies", category: "treats" },
  { emoji: "🍫", name: "chocolate", category: "treats" },
  { emoji: "🍰", name: "cake", category: "treats" },
  { emoji: "🍩", name: "donut", category: "treats" },
  { emoji: "🥤", name: "soda", category: "treats" },
  { emoji: "🍦", name: "ice cream", category: "treats" },
];

const EmojiTapScreen = ({ onConfirm, onPhotoTaken }: EmojiTapScreenProps) => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { toast } = useToast();

  const toggleFood = (foodName: string) => {
    setSelectedFoods(prev => {
      if (prev.includes(foodName)) {
        return prev.filter(f => f !== foodName);
      } else if (prev.length < 3) { // Limit to 3 foods max
        return [...prev, foodName];
      }
      return prev; // Don't add if already 3 selected
    });
  };

  const handleConfirm = () => {
    const allFoods = [...selectedFoods];
    if (customInput.trim()) {
      const customFoods = customInput.split(',').map(f => f.trim()).filter(f => f.length > 0);
      allFoods.push(...customFoods);
      
      // Show toast if multiple foods were parsed
      if (customFoods.length > 1) {
        toast({
          title: `${customFoods.length} foods detected! 🍽️`,
          description: `Parsed: ${customFoods.join(', ')}`,
          duration: 2000,
        });
      }
    }
    onConfirm(allFoods);
  };

  // Helper function to count total foods including parsed custom input
  const getTotalFoodCount = () => {
    let count = selectedFoods.length;
    if (customInput.trim()) {
      const customFoods = customInput.split(',').map(f => f.trim()).filter(f => f.length > 0);
      count += customFoods.length;
    }
    return count;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setShowCamera(false);
        
        if (onPhotoTaken) {
          onPhotoTaken(imageData);
        }
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 pb-28">
      {/* Simple Header - Mobile optimized */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-pixel text-foreground mb-1 pixel-text-glow">
          🍽️ WHAT DID YOU EAT? 🍽️
        </h1>
        <p className="text-sm font-pixel text-accent mb-3">
          TAP 3 FOODS! 👆
        </p>
      </div>

      {/* Camera and Input Options - NOW AT TOP */}
      {onPhotoTaken && (
        <div className="mb-3 max-w-md mx-auto w-full">
          <div className="text-center mb-2">
            <span className="font-pixel text-xs text-muted-foreground">
              📸 OR TAKE A PHOTO
            </span>
          </div>
          <Button
            onClick={startCamera}
            className="w-full h-10 font-pixel pixel-button flex items-center justify-center gap-2 text-sm"
            variant="outline"
          >
            <Camera className="w-4 h-4" />
            PHOTO 📸
          </Button>
        </div>
      )}

      {/* Simple custom input - NOW AT TOP */}
      <div className="mb-4 max-w-md mx-auto w-full">
        <div className="text-center mb-2">
          <span className="font-pixel text-xs text-muted-foreground">
            ✏️ OR TYPE SOMETHING ELSE
          </span>
        </div>
        <Input
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="pie, cheese, tacos"
          className="font-pixel text-center bg-background border-2 border-muted focus:border-accent h-10 text-sm"
        />
        {customInput.trim() && (
          <div className="text-center mt-2">
            <span className="font-pixel text-xs text-accent">
              {customInput.includes(',') 
                ? `Found ${customInput.split(',').map(f => f.trim()).filter(f => f.length > 0).length} foods!` 
                : '1 food (use commas for multiple)'
              }
            </span>
          </div>
        )}
      </div>
        
      {/* Selected foods display - compact */}
      <div className="flex justify-center gap-2 mb-4 min-h-[3rem] items-center flex-wrap">
        {selectedFoods.length > 0 ? (
          selectedFoods.map((food, index) => {
            const foodItem = allFoods.find(f => f.name === food);
            return (
              <div key={index} className="flex flex-col items-center bg-accent/20 border-2 border-accent rounded-lg p-2 animate-scale-in">
                <div className="text-2xl mb-1">{foodItem?.emoji || '🍽️'}</div>
                <div className="text-xs font-pixel text-accent">{food.toUpperCase()}</div>
              </div>
            );
          })
        ) : (
          <p className="text-xs font-pixel text-muted-foreground flex items-center gap-2">
            👆 TAP FOODS BELOW TO SELECT THEM
          </p>
        )}
      </div>

      {/* Compact Food Grid - All categories in one view */}
      <div className="flex-1 mb-4">
        <div className="max-w-lg mx-auto">
          {/* Healthy Foods Section - Compact */}
          <div className="mb-3">
            <div className="text-center mb-2">
              <span className="font-pixel text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                🌱 HEALTHY 🌱
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {allFoods.filter(food => food.category === 'healthy').map((food, index) => (
                <button
                  key={index}
                  onClick={() => toggleFood(food.name)}
                  disabled={selectedFoods.length >= 3 && !selectedFoods.includes(food.name)}
                  className={`
                    aspect-square border-2 flex items-center justify-center p-1 transition-all rounded-lg
                    ${selectedFoods.includes(food.name) 
                      ? 'border-green-400 bg-green-400/30 scale-110 shadow-lg shadow-green-400/50' 
                      : selectedFoods.length >= 3 
                        ? 'border-muted bg-muted/5 opacity-50' 
                        : 'border-green-400/50 bg-green-400/10 hover:border-green-400 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-lg">{food.emoji}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filling Foods Section - Compact */}
          <div className="mb-3">
            <div className="text-center mb-2">
              <span className="font-pixel text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                💪 FILLING 💪
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {allFoods.filter(food => food.category === 'filling').map((food, index) => (
                <button
                  key={index}
                  onClick={() => toggleFood(food.name)}
                  disabled={selectedFoods.length >= 3 && !selectedFoods.includes(food.name)}
                  className={`
                    aspect-square border-2 flex items-center justify-center p-1 transition-all rounded-lg
                    ${selectedFoods.includes(food.name) 
                      ? 'border-blue-400 bg-blue-400/30 scale-110 shadow-lg shadow-blue-400/50' 
                      : selectedFoods.length >= 3 
                        ? 'border-muted bg-muted/5 opacity-50' 
                        : 'border-blue-400/50 bg-blue-400/10 hover:border-blue-400 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-lg">{food.emoji}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Treats Section - Compact */}
          <div className="mb-3">
            <div className="text-center mb-2">
              <span className="font-pixel text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                🍭 TREATS 🍭
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {allFoods.filter(food => food.category === 'treats').map((food, index) => (
                <button
                  key={index}
                  onClick={() => toggleFood(food.name)}
                  disabled={selectedFoods.length >= 3 && !selectedFoods.includes(food.name)}
                  className={`
                    aspect-square border-2 flex items-center justify-center p-1 transition-all rounded-lg
                    ${selectedFoods.includes(food.name) 
                      ? 'border-purple-400 bg-purple-400/30 scale-110 shadow-lg shadow-purple-400/50' 
                      : selectedFoods.length >= 3 
                        ? 'border-muted bg-muted/5 opacity-50' 
                        : 'border-purple-400/50 bg-purple-400/10 hover:border-purple-400 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-lg">{food.emoji}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Sticky Confirm Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <Button
          onClick={handleConfirm}
          disabled={selectedFoods.length === 0 && !customInput.trim()}
          className={`w-full max-w-md mx-auto block h-16 text-xl font-pixel pixel-button transition-all ${
            selectedFoods.length > 0 || customInput.trim() 
              ? 'hover:scale-105 transform animate-pulse' 
              : ''
          }`}
        >
          {selectedFoods.length > 0 || customInput.trim() 
            ? `FEED! 🍽️` 
            : 'PICK FOOD! 👆'
          }
        </Button>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <div className="w-full max-w-md p-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            <div className="flex gap-4">
              <Button
                onClick={capturePhoto}
                className="flex-1 h-12 font-pixel pixel-button"
              >
                SNAP! 📸
              </Button>
              <Button
                onClick={stopCamera}
                className="flex-1 h-12 font-pixel"
                variant="outline"
              >
                ❌ CANCEL
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiTapScreen;