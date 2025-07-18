import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AIFoodAnalysisScreenProps {
  imageData: string;
  onAnalysisComplete: (foods: string[]) => void;
}

const AIFoodAnalysisScreen = ({ imageData, onAnalysisComplete }: AIFoodAnalysisScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Analyzing image...");
  const [isComplete, setIsComplete] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI analysis process
    const steps = [
      { text: "Analyzing image...", duration: 1500 },
      { text: "Identifying food items...", duration: 2000 },
      { text: "Calculating nutrition...", duration: 1500 },
      { text: "Analysis complete!", duration: 500 }
    ];

    let currentProgress = 0;
    let stepIndex = 0;

    const runAnalysis = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex].text);
        
        const stepDuration = steps[stepIndex].duration;
        const progressIncrement = 100 / steps.length;
        const incrementTime = stepDuration / progressIncrement;

        const progressInterval = setInterval(() => {
          currentProgress += 1;
          setProgress(currentProgress);

          if (currentProgress >= (stepIndex + 1) * progressIncrement) {
            clearInterval(progressInterval);
            stepIndex++;
            
            if (stepIndex === steps.length) {
              // Analysis complete - set detected foods
              const mockFoods = ["broccoli", "chicken", "rice"];
              setDetectedFoods(mockFoods);
              setIsComplete(true);
            } else {
              setTimeout(runAnalysis, 200);
            }
          }
        }, incrementTime);
      }
    };

    runAnalysis();
  }, []);

  const handleSqueezeNow = () => {
    onAnalysisComplete(detectedFoods);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="border-4 border-accent bg-card p-6 w-full max-w-lg">
        {/* Title */}
        <h1 className="text-xl font-pixel text-foreground text-center mb-6 pixel-text-glow">
          A.I. FOOD RECOGN
        </h1>

        {/* Food image */}
        <div className="w-full h-48 mb-6 border-2 border-muted overflow-hidden">
          <img 
            src={imageData} 
            alt="Food analysis" 
            className="w-full h-full object-cover pixel-creature"
          />
          
          {/* Food labels overlay */}
          {isComplete && (
            <div className="relative -mt-48 h-48 flex items-center justify-center">
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-2 py-1 text-xs font-pixel">
                BROCCOLI
              </div>
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 text-xs font-pixel">
                CHICKEN
              </div>
              <div className="absolute bottom-4 right-4 bg-accent text-accent-foreground px-2 py-1 text-xs font-pixel">
                RICE
              </div>
            </div>
          )}
        </div>

        {/* Pet character with message */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow flex-shrink-0">
            {/* Eyes */}
            <div className="relative w-full h-full">
              <div className="absolute top-2 left-3 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute top-2 right-3 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-background rounded-full"></div>
            </div>
          </div>

          {isComplete ? (
            <div className="border-2 border-accent bg-accent/10 p-3 rounded flex-1">
              <p className="text-sm font-pixel text-foreground">
                I SEE GREENS, PROTEIN, AND CARBS!
              </p>
            </div>
          ) : (
            <div className="border-2 border-muted bg-muted/10 p-3 rounded flex-1">
              <p className="text-sm font-pixel text-muted-foreground">
                {currentStep}
              </p>
            </div>
          )}
        </div>

        {/* Poop Weirdness Meter */}
        <div className="mb-6">
          <p className="text-sm font-pixel text-muted-foreground mb-2">
            POOP WEIRDNESS METER
          </p>
          <Progress value={75} className="h-4 bg-muted" />
          <p className="text-xs font-pixel text-muted-foreground mt-1">75%</p>
        </div>

        {/* Progress or action button */}
        {!isComplete ? (
          <div className="space-y-4">
            <Progress value={progress} className="h-6 bg-muted" />
            <p className="text-center text-sm font-pixel text-muted-foreground">
              {currentStep}
            </p>
          </div>
        ) : (
          <Button
            onClick={handleSqueezeNow}
            className="w-full h-16 text-lg font-pixel pixel-button"
          >
            SQUEEZE YOUR BELLY
          </Button>
        )}

        {/* Bottom text */}
        {isComplete && (
          <p className="text-center text-xs font-pixel text-muted-foreground mt-4">
            TAKE ANOTHER PHOTO
          </p>
        )}
      </div>
    </div>
  );
};

export default AIFoodAnalysisScreen;