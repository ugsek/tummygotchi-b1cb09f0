import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { analyzeMeal } from "@/lib/analyzeMeal";

interface AIFoodAnalysisScreenProps {
  imageData: string;
  onAnalysisComplete: (foods: string[]) => void;
  userGoal?: string;
}

const AIFoodAnalysisScreen = ({ imageData, onAnalysisComplete, userGoal = "stronger" }: AIFoodAnalysisScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Analyzing image...");
  const [isComplete, setIsComplete] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<string[]>([]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        setProgress(20);
        setCurrentStep("Sending image to AI...");
        
        const result = await analyzeMeal("", userGoal, imageData);
        
        setProgress(60);
        setCurrentStep("Processing AI response...");
        
        // Simulate some processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProgress(90);
        setCurrentStep("Finalizing analysis...");
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProgress(100);
        setCurrentStep("Analysis complete!");
        
        if (result && result.foods) {
          setDetectedFoods(result.foods);
          setAnalysisData(result);
        } else {
          // Fallback if no foods detected
          setDetectedFoods(["unknown food"]);
          setAnalysisData({ 
            foods: ["unknown food"], 
            healthScore: 50, 
            message: "I can see food, but need a clearer image!",
            confidence: 30
          });
        }
        
        setIsComplete(true);
      } catch (err) {
        console.error('Error analyzing image:', err);
        setError('Failed to analyze image. Please try again.');
        setDetectedFoods(["unidentified food"]);
        setAnalysisData({ 
          foods: ["unidentified food"], 
          healthScore: 50, 
          message: "Oops! My AI eyes got confused. Try another photo!",
          confidence: 0
        });
        setIsComplete(true);
      }
    };

    performAnalysis();
  }, [imageData, userGoal]);

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
          
          {/* Dynamic food labels overlay from AI analysis */}
          {isComplete && detectedFoods.length > 0 && (
            <div className="relative -mt-48 h-48 flex items-center justify-center">
              {detectedFoods.slice(0, 3).map((food, index) => {
                const positions = [
                  "top-4 left-4",
                  "top-4 right-4", 
                  "bottom-4 right-4"
                ];
                return (
                  <div 
                    key={index} 
                    className={`absolute ${positions[index]} bg-accent text-accent-foreground px-2 py-1 text-xs font-pixel uppercase`}
                  >
                    {food}
                  </div>
                );
              })}
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
                {error ? error : (analysisData?.message || "I SEE SOME TASTY FOOD!")}
              </p>
              {analysisData?.confidence !== undefined && (
                <p className="text-xs font-pixel text-muted-foreground mt-1">
                  Confidence: {analysisData.confidence}%
                </p>
              )}
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
          <Progress 
            value={analysisData?.healthScore || 50} 
            className="h-4 bg-muted" 
          />
          <p className="text-xs font-pixel text-muted-foreground mt-1">
            {analysisData?.healthScore || 50}%
          </p>
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