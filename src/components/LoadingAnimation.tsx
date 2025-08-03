import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MapPin, Cloud, Brain, CheckCircle } from 'lucide-react';

interface LoadingAnimationProps {
  currentStep: number;
  steps: string[];
}

const stepIcons = [MapPin, Cloud, Brain, CheckCircle];

export const LoadingAnimation = ({ currentStep, steps }: LoadingAnimationProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="travel-card w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              Crafting Your Perfect Journey
            </h3>
            <p className="text-muted-foreground">
              We're analyzing your preferences and creating a personalized itinerary
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="w-full h-3" />
            <p className="text-sm font-medium">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                    isActive
                      ? 'bg-primary/10 border border-primary/20 scale-105'
                      : isCompleted
                      ? 'bg-accent/10 border border-accent/20'
                      : 'bg-muted/20'
                  }`}
                >
                  <div
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-primary-foreground animate-pulse-glow'
                        : isCompleted
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className={`font-medium transition-all duration-300 ${
                        isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-5 w-5 text-accent animate-in fade-in duration-500" />
                  )}
                  {isActive && (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center space-x-8 pt-4 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-float" />
              <div className="w-3 h-3 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};