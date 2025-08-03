import { useState } from 'react';
import { TravelForm } from '@/components/TravelForm';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, ArrowLeft } from 'lucide-react';
import heroImage from '@/assets/travel-hero.jpg';

interface TravelFormData {
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  interests: string[];
}

// Mock data for demonstration
const mockItinerary = [
  {
    date: '2024-08-10',
    weather: {
      date: '2024-08-10',
      weather_code: 1,
      temperature_max: 28,
      temperature_min: 22,
      sunrise: '2024-08-10T06:30:00Z',
      sunset: '2024-08-10T20:15:00Z',
    },
    activities: [
      {
        name: 'Morning Beach Walk',
        description: 'Start your day with a peaceful walk along the pristine coastline, watching the sunrise over the ocean.',
        time: '07:00',
        duration: '1h',
        category: 'Nature',
        isOpen: true,
      },
      {
        name: 'Local Market Visit',
        description: 'Explore the vibrant local market, taste fresh tropical fruits and interact with friendly vendors.',
        time: '09:30',
        duration: '2h',
        category: 'Culture',
        isOpen: true,
      },
      {
        name: 'Traditional Cooking Class',
        description: 'Learn to prepare authentic local dishes with a renowned chef in a beautiful kitchen setting.',
        time: '14:00',
        duration: '3h',
        category: 'Food',
        isOpen: true,
      },
      {
        name: 'Sunset Viewpoint',
        description: 'End your day at the famous sunset viewpoint with panoramic views of the landscape.',
        time: '18:30',
        duration: '1.5h',
        category: 'Nature',
        isOpen: true,
      },
    ],
  },
];

const loadingSteps = [
  'Getting destination coordinates...',
  'Fetching weather forecast...',
  'Generating AI recommendations...',
  'Verifying place availability...',
];

type AppState = 'form' | 'loading' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('form');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TravelFormData | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleFormSubmit = async (data: TravelFormData) => {
    setFormData(data);
    setAppState('loading');
    setCurrentStep(0);

    // Simulate the loading process
    for (let i = 0; i < loadingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setAppState('results');
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRegenerating(false);
  };

  const handleBackToForm = () => {
    setAppState('form');
    setFormData(null);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        {appState === 'form' && (
          <div className="text-center mb-12">
            <div className="relative overflow-hidden rounded-2xl mb-8 h-64 md:h-80">
              <img 
                src={heroImage} 
                alt="Beautiful travel destination" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-white text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Plane className="h-8 w-8 animate-float" />
                    <h1 className="text-4xl md:text-6xl font-bold">TravelAI</h1>
                  </div>
                  <p className="text-xl md:text-2xl font-light max-w-2xl">
                    Your personal AI travel companion for unforgettable journeys
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button for Results */}
        {appState === 'results' && (
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={handleBackToForm}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Plan Another Trip
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex justify-center">
          {appState === 'form' && (
            <TravelForm onSubmit={handleFormSubmit} />
          )}

          {appState === 'loading' && (
            <LoadingAnimation currentStep={currentStep} steps={loadingSteps} />
          )}

          {appState === 'results' && formData && (
            <ItineraryDisplay
              itinerary={mockItinerary}
              destination={formData.destination}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
            />
          )}
        </div>

        {/* Features Section */}
        {appState === 'form' && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="travel-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Planning</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced AI creates personalized itineraries based on your interests and weather conditions
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowLeft className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-muted-foreground text-sm">
                  Live weather data and venue availability ensure your plans are always up-to-date
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowLeft className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Seamless Experience</h3>
                <p className="text-muted-foreground text-sm">
                  Beautiful, intuitive interface makes planning your dream trip effortless and enjoyable
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
