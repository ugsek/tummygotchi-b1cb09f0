import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChatScreenProps {
  petName: string;
  userGoal: string;
  onBackToGame: () => void;
}

const ChatScreen = ({ petName, userGoal, onBackToGame }: ChatScreenProps) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{question: string, answer: string}>>([]);
  const [askingQuestion, setAskingQuestion] = useState(false);
  const { toast } = useToast();

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    const currentQuestion = question.trim();
    setQuestion(''); // Clear input immediately
    
    try {
      setAskingQuestion(true);
      const { data, error } = await supabase.functions.invoke('foodQA', {
        body: {
          question: currentQuestion,
          petName,
          userGoal
        }
      });

      if (error) throw error;

      const answer = data.answer || "BURRRP! Sorry, my brain blob is having a wiggle moment! Try asking again! 🤪";
      
      // Add to chat history
      setChatHistory(prev => [...prev, { question: currentQuestion, answer }]);
      
    } catch (error) {
      console.error('Error asking question:', error);
      toast({
        title: "Oops!",
        description: "Couldn't get an answer right now. Try again!",
        variant: "destructive",
      });
      
      // Add error response to chat
      setChatHistory(prev => [...prev, { 
        question: currentQuestion, 
        answer: "BURRRP! Sorry, my brain blob is having a wiggle moment! Try asking again! 🤪" 
      }]);
    } finally {
      setAskingQuestion(false);
    }
  };

  const askSuggestedQuestion = (suggestion: string) => {
    setQuestion(suggestion);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 pb-28">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-pixel text-accent mb-2 pixel-text-glow">
          CHAT WITH {petName.toUpperCase()}!
        </h1>
        <div className="inline-block px-4 py-2 border-2 border-accent bg-accent/20 rounded-lg mb-4">
          <span className="font-pixel text-sm text-accent">
            ASK ME ANYTHING ABOUT FOOD! 🤔
          </span>
        </div>
      </div>

      {/* Pet character */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center pixel-creature pulse-glow relative">
            {/* Eyes */}
            <div className="absolute top-4 left-5 w-3 h-3 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-1 h-1 bg-background rounded-full"></div>
            </div>
            <div className="absolute top-4 right-5 w-3 h-3 bg-accent rounded-full">
              <div className="absolute top-1 left-1 w-1 h-1 bg-background rounded-full"></div>
            </div>
            
            {/* Happy mouth */}
            <div className="absolute bottom-4 w-4 h-2 bg-background rounded-full"></div>
            
            {/* Sparkles */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 text-accent font-pixel text-lg animate-pulse"
                style={{
                  left: `${-20 + Math.random() * 140}%`,
                  top: `${-20 + Math.random() * 140}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                +
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 mb-4 space-y-4 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="text-center">
            <div className="border-2 border-accent bg-accent/10 p-4 rounded-lg mb-4">
              <p className="font-pixel text-sm text-foreground">
                Hi! I'm {petName}! Ask me anything about food and I'll give you the weirdest, most helpful answers! 🤪
              </p>
            </div>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className="space-y-2">
              {/* User question */}
              <div className="flex justify-end">
                <div className="bg-primary/20 border border-primary rounded-lg p-3 max-w-[80%]">
                  <p className="font-pixel text-sm text-foreground">
                    {chat.question}
                  </p>
                </div>
              </div>
              
              {/* Pet answer */}
              <div className="flex justify-start">
                <div className="bg-accent/10 border border-accent rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-start gap-2">
                    <div className="text-lg">💬</div>
                    <p className="font-pixel text-sm text-foreground leading-relaxed">
                      {chat.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {askingQuestion && (
          <div className="flex justify-start">
            <div className="bg-accent/10 border border-accent rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="text-lg">💭</div>
                <p className="font-pixel text-sm text-foreground">
                  {petName} is thinking... *gurgle sounds*
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested questions (show only if no chat history) */}
      {chatHistory.length === 0 && (
        <div className="mb-4">
          <p className="font-pixel text-xs text-muted-foreground mb-2 text-center">TRY ASKING:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "What vegetables are yummy?",
              "Is fruit good for me?",
              "How much water should I drink?",
              "What about snacks?",
              "Should I eat breakfast?",
              "What's the best lunch?"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => askSuggestedQuestion(suggestion)}
                className="font-pixel text-xs px-3 py-1 border border-accent/50 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors"
                disabled={askingQuestion}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area - Fixed at bottom */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-accent/20">
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me about food..."
            className="font-pixel text-sm bg-background border-2 border-muted focus:border-accent"
            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
            disabled={askingQuestion}
          />
          <Button
            onClick={askQuestion}
            disabled={!question.trim() || askingQuestion}
            className="pixel-button text-sm px-4"
          >
            {askingQuestion ? "..." : "ASK!"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;